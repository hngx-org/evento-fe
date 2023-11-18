import React, { useState } from 'react';
import logo from '../../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

function ExploreNav() {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
    console.log('toggle', toggle);
  };
  const router = useRouter();
  const activeLink = (path: string) =>
    router.pathname === path
      ? 'text-green-950 group-hover:text-white text-base font-semibold  leading-normal tracking-tight'
      : 'text-gray-600 text-base font-semibold  leading-normal tracking-tight';
  return (
    <nav className="w-full py-4 justify-between items-center px-4  z-[10000] relative ">
      <div className="max-w-[1240px] mx-auto flex items-center justify-between  ">
        <div className=" flex gap-14">
          <Image className="object-contain" width={126} height={24} src={logo} alt="Zuri Portfolio Logo" />
          <div className=" hidden lg:flex gap-10 items-start">
            <div className="group h flex flex-col ali justify-center items-center gap-1">
              <Link className={activeLink('/')} href={'/'}>
                Events
              </Link>
              {router.pathname === '/' ? <div className="w-6 h-0.5 bg-emerald-600 rounded-lg" /> : null}
            </div>
            <div className=" group flex flex-col ali justify-center items-center gap-1 ">
              <Link className={activeLink('/')} href={'/marketplace'}>
                Calendar
              </Link>
              {router.pathname === '/' ? <div className="w-6 h-0.5 bg-emerald-600 rounded-lg" /> : null}
            </div>
            <div className=" group flex flex-col ali justify-center items-center gap-1 ">
              <Link className={activeLink('/')} href={'/marketplace'}>
                Explore other Events
              </Link>
              {router.pathname === '/' ? <div className="w-6 h-0.5 bg-emerald-600 rounded-lg" /> : null}
            </div>
          </div>
        </div>

        {/* Right Items */}

        <div
          className={`flex items-center gap-4 lg:static absolute lg:flex-row flex-col ${
            toggle ? 'left-0' : 'left-[-100dvw]'
          }  bg-white-100 w-[100%] py-8 lg:py-0 lg:w-auto lg:opacity-100 transition-all ease-in-out duration-500 top-[9vh]  z-[1]`}
        >
          <div className="w-[267px] h-16 p-2 justify-center items-center gap-4 lg:flex-row flex flex-col mt-20  lg:mt-0">
            <div className=" flex flex-col lg:hidden gap-5 ">
              <div className="group h flex flex-col ali justify-center items-center gap-1">
                <Link className={activeLink('/')} href={'/'}>
                  Events
                </Link>
                {router.pathname === '/' ? <div className="w-6 h-0.5 bg-emerald-600 rounded-lg" /> : null}
              </div>
              <div className=" group flex flex-col ali justify-center items-center gap-1 ">
                <Link className={activeLink('/')} href={'/'}>
                  Calendar
                </Link>
                {router.pathname === '/' ? <div className="w-6 h-0.5 bg-emerald-600 rounded-lg" /> : null}
              </div>
              <div className=" group flex flex-col ali justify-center items-center gap-1 ">
                <Link className={activeLink('/')} href={'/'}>
                  Explore other Events
                </Link>
                {router.pathname === '/' ? <div className="w-6 h-0.5 bg-emerald-600 rounded-lg" /> : null}
              </div>
            </div>
            <div className="w-6 h-6 justify-center items-center flex  gap-6 pr-9">
              <div className="w-6 h-6">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.02 3.41C8.71003 3.41 6.02003 6.1 6.02003 9.41V12.3C6.02003 12.91 5.76003 13.84 5.45003 14.36L4.30003 16.27C3.59003 17.45 4.08003 18.76 5.38003 19.2C9.69003 20.64 14.34 20.64 18.65 19.2C19.86 18.8 20.39 17.37 19.73 16.27L18.58 14.36C18.28 13.84 18.02 12.91 18.02 12.3V9.41C18.02 6.11 15.32 3.41 12.02 3.41Z"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                  />
                  <path
                    d="M13.87 3.7C13.56 3.61 13.24 3.54 12.91 3.5C11.95 3.38 11.03 3.45 10.17 3.7C10.46 2.96 11.18 2.44 12.02 2.44C12.86 2.44 13.58 2.96 13.87 3.7Z"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.02 19.56C15.02 21.21 13.67 22.56 12.02 22.56C11.2 22.56 10.44 22.22 9.90002 21.68C9.36002 21.14 9.02002 20.38 9.02002 19.56"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                  />
                </svg>
              </div>
              <span className=" lg:hidden">Notification</span>
              <div className="w-6 h-6">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.5 21.5C16.7467 21.5 21 17.2467 21 12C21 6.75329 16.7467 2.5 11.5 2.5C6.25329 2.5 2 6.75329 2 12C2 17.2467 6.25329 21.5 11.5 21.5Z"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M22 22.5L20 20.5"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <span className=" lg:hidden">Search</span>
              <div className="w-6 h-6">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.12 13.28C12.05 13.27 11.96 13.27 11.88 13.28C10.12 13.22 8.72 11.78 8.72 10.01C8.72 8.2 10.18 6.73 12 6.73C13.81 6.73 15.28 8.2 15.28 10.01C15.27 11.78 13.88 13.22 12.12 13.28Z"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.74 19.88C16.96 21.51 14.6 22.5 12 22.5C9.40001 22.5 7.04001 21.51 5.26001 19.88C5.36001 18.94 5.96001 18.02 7.03001 17.3C9.77001 15.48 14.25 15.48 16.97 17.3C18.04 18.02 18.64 18.94 18.74 19.88Z"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5Z"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <span className=" lg:hidden">Profile</span>
            </div>
            <div className="justify-center items-center lg:w-auto w-[100%] gap-2 lg:flex-row flex flex-col">
              <Link
                href={'/'}
                className="text-center  text-base font-bold leading-normal tracking-tight px-6 py-3 bg-opacity-50 rounded-lg justify-center items-center gap-4 flex lg:w-auto w-[100%]"
              >
                Create event
              </Link>
            </div>
          </div>
        </div>
        <MenuIcon toggle={toggle} style="lg:hidden" toggler={handleToggle} />
      </div>
    </nav>
  );
}

export default ExploreNav;

function MenuIcon({ style, toggle, toggler }: { style?: string; toggle?: boolean; toggler: () => void }) {
  if (toggle) {
    // Close Icon
    return (
      <div className={`${style}`} onClick={toggler}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
          <g>
            <mask
              id="mask0_1327_22604"
              style={{ maskType: 'alpha' }}
              width="32"
              height="32"
              x="0"
              y="0"
              maskUnits="userSpaceOnUse"
            >
              <path fill="#D9D9D9" d="M0 0H32V32H0z"></path>
            </mask>
            <g mask="url(#mask0_1327_22604)">
              <path
                fill="#E0580C"
                d="M8.534 25.333l-1.867-1.866L14.134 16 6.667 8.533l1.867-1.866L16 14.133l7.467-7.466 1.867 1.866L17.867 16l7.467 7.467-1.867 1.866L16 17.867l-7.466 7.466z"
              ></path>
            </g>
          </g>
        </svg>
      </div>
    );
  }

  return (
    // Open Icon
    <div className={`${style}`} onClick={toggler}>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
        <g>
          <g fill="#E0580C">
            <path d="M28 10.333H4c-.547 0-1-.453-1-1 0-.546.453-1 1-1h24c.547 0 1 .454 1 1 0 .547-.453 1-1 1z"></path>
            <path d="M28 17H4c-.547 0-1-.453-1-1 0-.547.453-1 1-1h24c.547 0 1 .453 1 1 0 .547-.453 1-1 1z"></path>
            <path d="M28 23.667H4c-.547 0-1-.454-1-1 0-.547.453-1 1-1h24c.547 0 1 .453 1 1 0 .546-.453 1-1 1z"></path>
          </g>
        </g>
      </svg>
    </div>
  );
}