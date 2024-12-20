import React from 'react';
import { usePathname } from 'next/navigation';

const DashboardIcon = () => {
    const pathname = usePathname();

    return (
        <div>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1H2C1.44772 1 1 1.44772 1 2V9C1 9.55229 1.44772 10 2 10H7C7.55228 10 8 9.55229 8 9V2C8 1.44772 7.55228 1 7 1Z" stroke={pathname.startsWith("/dashboard") ? "white" : "#4A055B"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 1H13C12.4477 1 12 1.44772 12 2V5C12 5.55228 12.4477 6 13 6H18C18.5523 6 19 5.55228 19 5V2C19 1.44772 18.5523 1 18 1Z" stroke={pathname.startsWith("/dashboard") ? "white" : "#4A055B"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 10H13C12.4477 10 12 10.4477 12 11V18C12 18.5523 12.4477 19 13 19H18C18.5523 19 19 18.5523 19 18V11C19 10.4477 18.5523 10 18 10Z" stroke={pathname.startsWith("/dashboard") ? "white" : "#4A055B"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 14H2C1.44772 14 1 14.4477 1 15V18C1 18.5523 1.44772 19 2 19H7C7.55228 19 8 18.5523 8 18V15C8 14.4477 7.55228 14 7 14Z" stroke={pathname.startsWith("/dashboard") ? "white" : "#4A055B"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );

}

export default DashboardIcon;
