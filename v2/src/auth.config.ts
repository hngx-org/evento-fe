import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { LoginSchema } from './schemas';
import { signinUser } from './data';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

export default {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await signinUser({ email, password });
          if (!user) return null;

          return user.res;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: { user: any; account: any; profile?: any }) {
      if (account.provider === 'google') {
        const request = await axios.post('https://evento-qo6d.onrender.com/api/v1/login/google', {
          email: profile.email,
          picture: profile.picture,
          name: profile.name,
        });
        const response = await request.data;
        if (request.data) {
          const token: string = response.data.token;
          const userId: string = response.data.user.userID;
          return `/loading?token=${token}&id=${userId}`;
        }
      }
      return true;
    },
    async jwt({ token, user, account }: { token: any; user: any; account: any }) {
      if (account) {
      }
      return { user, token };
    },

    async session({ session, token }: { session: any; token: any }) {
      session.id_token = token.id_token;
      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_SECRET as string,
} satisfies NextAuthConfig;
