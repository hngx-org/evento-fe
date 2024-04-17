'use client';

import React from 'react';
import { cn } from '@/utils';
import { useStateCtx } from '@/context/StateCtx';
import useWindowHeight from '@/hooks/useDimension';
import { chelsea } from '@/fonts';
import { FaBars } from 'react-icons/fa';
import Link from 'next/link';
import useUserSession from '@/hooks/useSession';
import MobileNav from './MobileNav';

const NavBar = () => {
  const { setopenMenu } = useStateCtx();
  const scrollHeight = useWindowHeight();
  const { signIn, signUp } = useUserSession();

  return (
    <nav
      className={cn(
        ' max-[500px]:py-1 w-full justify-between items-center bg-white-100 dark:bg-dark-one transition-colors duration-500',
        scrollHeight > 100
          ? ' fixed backdrop-blur-xl top-0 left-0  z-50 -translate-y-28 opacity-0 animate-slideDown bg-white-100/90 py-1 border-b border-gray-200 shadow-md'
          : 'sm:py-6 py-4',
        {
          'bg-white-100/60 dark:bg-dark-six ': scrollHeight > 800 && scrollHeight < 4300,
        },
      )}
    >
      <header className="md:flex  justify-between items-center py-3 md:px-16 px-5">
        <div className="flex items-center justify-between">
          <div
            className={`${chelsea.className} flex gap-14 text-primary-100  text-[30px] font-medium`}
          >
            <Link href="/">EVENTO</Link>
          </div>
          <div
            tabIndex={0}
            role="button"
            className="lg:hidden text-2xl cursor-pointer text-primary-100 dark:text-dark-two "
            onClick={() => setopenMenu(true)}
          >
            <FaBars />
          </div>
        </div>

        <div className="md:text-base text-xs font-semibold items-center justify-between md:gap-4 hidden md:flex">
          <div className="flex gap-7">
            <button className="py-3 px-10 border-primary-100 border dark:border-dark-two dark:text-dark-two text-primary-100 z-10 hover:bg-white hover:text-secondary-300 rounded-lg font-bold  transition-all duration-300 ease-in-out">
              <Link href="/auth/sign-in" onClick={signIn}>
                Sign in
              </Link>
            </button>

            <button
              type="button"
              className="py-3 px-7 border border-primary-100 hover:border-primary-100 z-10 dark:bg-dark-two dark:text-dark-one dark:border-none rounded-lg font-bold  text-white-100 transition-all duration-300 ease-in-out bg-primary-100"
            >
              <Link href="/auth/sign-up" onClick={signUp}>
                Create Event
              </Link>
            </button>
          </div>
        </div>
      </header>
      <MobileNav />
    </nav>
  );
};

export default NavBar;
