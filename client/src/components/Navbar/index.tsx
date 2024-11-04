import React from 'react';
import { Link, Menu, Search, Settings, Sun, Moon } from "lucide-react";
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsDarkMode, setIsSidebarCollapsed } from '@/state';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  React.useEffect(() => {
    // Apply dark mode class based on isDarkMode
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className='flex items-center justify-between bg-white px-4 py-3 dark:bg-black'>
      {/* Search bar */}
      <div className='flex items-center gap-8'>
        {isSidebarCollapsed && (
          <button onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}>
            <Menu className='h-8 w-8 dark:text-white' />
          </button>
        )}
        <div className='relative flex h-min w-[200px]'>
          <Search className='absolute left-[4px] top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white' />
          <input className='w-full rounded bg-gray-100 p-2 pl-8 dark:bg-gray-700 dark:text-white' type='search' placeholder='Search...' />
        </div>
      </div>
      {/* Icons */}
      <div className='flex items-center'>
        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className={`rounded p-2 ${isDarkMode ? 'dark:hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6 cursor-pointer text-white" /> // Sun icon white in dark mode
          ) : (
            <Moon className="h-6 w-6 cursor-pointer dark:text-white" />
          )}
        </button>

        <Link href='/settings' className={`h-min w-min rounded p-2 ${isDarkMode ? 'dark:hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
          <Settings className='h-6 w-6 cursor-pointer dark:text-white' />
        </Link>
        <div className='ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block'></div>
      </div>
    </div>
  );
};

export default Navbar;