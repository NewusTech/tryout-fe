import React from 'react';
import { usePathname } from 'next/navigation';

const TryoutIcon = () => {
    const pathname = usePathname();

    return (
        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 1V5M14 1V5M1 9H19M7 15L9 17L13 13M3 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21H3C1.89543 21 1 20.1046 1 19V5C1 3.89543 1.89543 3 3 3Z" stroke={pathname.startsWith("/tryout") ? "white" : "#4A055B"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}

export default TryoutIcon