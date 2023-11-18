import Image from 'next/image';
import HomeLayout from '@/layout/Homelayout';
import { Work_Sans } from 'next/font/google';

const workSans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans',
});

export default function Home() {
  return (
    <HomeLayout>
      <div className={workSans.className}>
        <h1 className={workSans.className}>Hello Next.js!</h1>
        <p className={workSans.className}>
          Get started by editing <code className={workSans.className}>pages/index.js</code>
        </p>
        <p className={workSans.className}>
          <a className={workSans.className} href="https://nextjs.org/docs">
            Learn Next.js
          </a>
        </p>
        <p className={workSans.className}>
          <a
            className={workSans.className}
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          >
            Check out Vercel
          </a>
        </p>
      </div>
    </HomeLayout>
  );
}
