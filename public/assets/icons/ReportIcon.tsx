import React from 'react'
import { usePathname } from 'next/navigation';

const ReportIcon = () => {
    const pathname = usePathname();

    return (
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 1V5M9 1V5M13 1V5M5 9H11M5 13H13M5 17H10M3 3H15C16.1046 3 17 3.89543 17 5V19C17 20.1046 16.1046 21 15 21H3C1.89543 21 1 20.1046 1 19V5C1 3.89543 1.89543 3 3 3Z" stroke={pathname.startsWith("/report") ? "white" : "#4A055B"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default ReportIcon