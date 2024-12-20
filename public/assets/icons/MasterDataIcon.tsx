import React from 'react'
import { usePathname } from 'next/navigation';

const MasterDataIcon = () => {
    const pathname = usePathname();

    return (
        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 4C19 5.65685 14.9706 7 10 7C5.02944 7 1 5.65685 1 4M19 4C19 2.34315 14.9706 1 10 1C5.02944 1 1 2.34315 1 4M19 4V18C19 18.7956 18.0518 19.5587 16.364 20.1213C14.6761 20.6839 12.3869 21 10 21C7.61305 21 5.32387 20.6839 3.63604 20.1213C1.94821 19.5587 1 18.7956 1 18V4M1 11C1 11.7956 1.94821 12.5587 3.63604 13.1213C5.32387 13.6839 7.61305 14 10 14C12.3869 14 14.6761 13.6839 16.364 13.1213C18.0518 12.5587 19 11.7956 19 11" stroke={pathname.startsWith("/data-master") ? "white" : "#4A055B"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}

export default MasterDataIcon