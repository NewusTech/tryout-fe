import React from 'react'
import { usePathname } from 'next/navigation';

const UserAdminIcon = () => {
    const pathname = usePathname();

    return (
        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 19C17 16.8783 16.1571 14.8434 14.6569 13.3431C13.1566 11.8429 11.1217 11 9 11M9 11C6.87827 11 4.84344 11.8429 3.34315 13.3431C1.84285 14.8434 1 16.8783 1 19M9 11C11.7614 11 14 8.76142 14 6C14 3.23858 11.7614 1 9 1C6.23858 1 4 3.23858 4 6C4 8.76142 6.23858 11 9 11ZM21 18C21 14.63 19 11.5 17 10C17.6574 9.50677 18.1831 8.85909 18.5306 8.11427C18.878 7.36945 19.0365 6.55047 18.992 5.7298C18.9475 4.90913 18.7014 4.11209 18.2755 3.4092C17.8495 2.70631 17.2569 2.11926 16.55 1.7" stroke={pathname.startsWith("/user") ? "white" : "#4A055B"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default UserAdminIcon