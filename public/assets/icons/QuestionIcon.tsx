import React from 'react'
import { usePathname } from 'next/navigation';

const QuestionIcon = () => {
    const pathname = usePathname();

    return (
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 18.5V3.5C1 2.83696 1.26339 2.20107 1.73223 1.73223C2.20107 1.26339 2.83696 1 3.5 1H16C16.2652 1 16.5196 1.10536 16.7071 1.29289C16.8946 1.48043 17 1.73478 17 2V20C17 20.2652 16.8946 20.5196 16.7071 20.7071C16.5196 20.8946 16.2652 21 16 21H3.5C2.83696 21 2.20107 20.7366 1.73223 20.2678C1.26339 19.7989 1 19.163 1 18.5ZM1 18.5C1 17.837 1.26339 17.2011 1.73223 16.7322C2.20107 16.2634 2.83696 16 3.5 16H17M5 10H13M5 6H11" stroke={pathname.startsWith("/question-bank") ? "white" : "#4A055B"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default QuestionIcon