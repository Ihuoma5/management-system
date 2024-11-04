"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Lock, Home, LucideIcon, Briefcase, Search, Settings, User, ChevronDown, AlertCircle, ShieldAlert, AlertTriangle, AlertOctagon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsSidebarCollapsed } from '@/state';
import { useGetProjectsQuery } from '@/state/api';


interface Project {
  id: number;      
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

function Sidebar() {
  
  const [showProjects, setShowProjects] = useState(false);
  const [showPriority , setShowPriority ] = useState(false); 


  const { data: projects } = useGetProjectsQuery();


console.log("Projects data:", projects);

  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);

  const sidebarClassNames = `fixed flex flex-col h-full shadow-xl z-40 overflow-y-auto transition-all duration-300 ${
    isSidebarCollapsed ? 'w-0 hidden' : 'w-64'
  } bg-white dark:bg-black`;

  return (
    <div className={sidebarClassNames}>
      <div className='flex h-full w-full flex-col'>
        {/* Top logo */}
        <div className='z-50 flex min-h-[56px] items-center justify-between bg-white px-6 pt-3 dark:bg-black'> 
          <div className='text-xl font-bold text-gray-800 dark:text-white'>
            Weierstrass Michael
          </div>
          <button
            className="py-3"
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))} // Toggle only sidebar collapse
          >
            {isSidebarCollapsed ? 'Open Menu' : 'X'} {/* Toggle text */}
          </button>
        </div>

        {/* Team */}
        <div className='flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700'>
          <Image src="/logo.png" alt="logo" width={40} height={40} />  
          <div>
            <h3 className='text-md font-bold tracking-wide dark:text-gray-200'>Weier’s Team</h3> 
            <div className='mt-1 flex items-start gap-2'>
              <Lock className='mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400' />
              <p className='text-xs text-gray-500'>Private</p>
            </div>
          </div>
        </div>

        {/* Navbar Links */}
        <nav className='z-10 w-full'>
          <SidebarLink icon={Home} label="Home" href="/" />
          <SidebarLink icon={Briefcase} label="Timeline" href="/timeline" />
          <SidebarLink icon={Search} label="Search" href="/search" />
          <SidebarLink icon={Settings} label="Settings" href="/setting" />
          <SidebarLink icon={User} label="Users" href="/users" />
          <SidebarLink icon={User} label="Teams" href="/teams" />
        </nav>

        {/* Projects Toggle */}
        <button onClick={() => setShowProjects((prev) => !prev)} className='flex w-full items-center justify-between px-8 py-3 text-gray-500'>
          <span>Projects</span>
          <ChevronDown className={`h-5 w-5 transition-transform ${showProjects ? 'rotate-180' : ''}`} />
        </button>

       {/* PROJECTS LIST */}
       {showProjects &&
  projects?.map((project) => (
    <SidebarLink
      key={project.id}
      icon={Briefcase}
      label={project.name}
      href={`/projects/${project.id}`}
    />
  ))}

        


        {/* Prorities */}
        <button onClick={() => setShowPriority((prev) => !prev)} className='flex w-full items-center justify-between px-8 py-3 text-gray-500'>
          <span>Priority</span>
          <ChevronDown className={`h-5 w-5 transition-transform ${showPriority ? 'rotate-180' : ''}`} />
        </button>
        {showPriority && (
          <div className='pl-8'>
            <SidebarLink icon={AlertCircle} label="Urgent" href="/priority/urgent" />
            <SidebarLink icon={ShieldAlert} label="High" href="/priority/high" />
            <SidebarLink icon={AlertTriangle} label="Medium" href="/priority/medium" />
            <SidebarLink icon={AlertOctagon} label="Low" href="/priority/low" />
            <SidebarLink icon={ShieldAlert} label="Backlog" href="/priority/backlog" />
          </div>
        )}
      </div>
    </div>
  );
}

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
          isActive ? 'bg-gray-100 dark:bg-gray-600' : ''
        }`}
      >
        {isActive && (
          <div className='absolute left-0 top-0 h-full w-[5px] bg-orange-200'/>
        )} 
        <Icon className='h-6 w-6 text-gray-600 dark:text-gray-100' />
        <span className='font-medium text-gray-800 dark:text-gray-100'>
          {label}
        </span>
      </div>
    </Link>
  );
}



export default Sidebar;

