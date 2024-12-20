import React from 'react'
import { usePathname } from 'next/navigation';

const PaymentIcon = () => {
    const pathname = usePathname();

    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 7C1 6.46957 1.21071 5.96086 1.58579 5.58579C1.96086 5.21071 2.46957 5 3 5H17C17.5304 5 18.0391 5.21071 18.4142 5.58579C18.7893 5.96086 19 6.46957 19 7M1 9H4C4.8 9 5.6 9.3 6.1 9.9L7.2 10.8C8.8 12.4 11.3 12.4 12.9 10.8L14 9.9C14.5 9.4 15.3 9 16.1 9H19M3 1H17C18.1046 1 19 1.89543 19 3V17C19 18.1046 18.1046 19 17 19H3C1.89543 19 1 18.1046 1 17V3C1 1.89543 1.89543 1 3 1Z" stroke={pathname.startsWith("/payment") ? "white" : "#4A055B"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default PaymentIcon