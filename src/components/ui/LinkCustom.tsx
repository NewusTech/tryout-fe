import Link from 'next/link';
import React from 'react';

interface PropsLink {
    href: string;
    className?: string;
    children: React.ReactNode;
}

const LinkCustom = ({ href, className, children }: PropsLink) => {
    return (
        <div className='transition ease-in-out delay-150 hover:-translate-y-1'>
            <Link
                href={href}
                className={`bg-primary py-3 px-6 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 ${className || ""}`}
            >
                {children}
            </Link>
        </div>
    );
};

export default LinkCustom;
