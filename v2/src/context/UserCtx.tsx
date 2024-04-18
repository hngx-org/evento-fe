'use client';

import React, { SetStateAction, createContext, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { User } from '@/types';
import { useSession } from 'next-auth/react';
import { getUser } from '@/actions/user';
import { useRouter } from 'next/navigation';
import { DEFAULT_REVALIDATE_REDIRECT } from '@/routes';

// Add Your Props here
interface UserContextProps {
  user: User;
  setUser: React.Dispatch<SetStateAction<User>>;
}

export const UserContext = createContext({} as UserContextProps);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const initialUserDataState: User = {
    userID: '',
    email: '',
    bio: '',
    socialLinks: [],
    profileImage: '/facemoji.png',
    displayName: '',
    firstName: '',
    lastName: '',
    slug: '',
    role: '',
    location: '',
    coverImage: '',
    isVerified: false,
  };
  // Add Your State(s) Here
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User>(initialUserDataState);

  useLayoutEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUser();

        if (user?.status === 'success') {
          console.log('User came from Backend');
          //   console.log(user.user);
          setUser(user.user);
        } else if (user?.status === 401) {
          router.push(DEFAULT_REVALIDATE_REDIRECT);
        } else {
        }
      } catch (err) {}
    };

    fetchUserData();
  }, [user]);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Call this function whenever you want to use the context
export const useUserCtx = () => {
  const ctx = useContext(UserContext);

  if (!ctx) {
    throw new Error('useUserCtx must be used within a UserContextProvider');
  }
  return ctx;
};

export default UserContextProvider;
