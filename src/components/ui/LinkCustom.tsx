import Link from 'next/link';
import React from 'react';

interface PropsLink {
    href: string;
    className?: string;
    children: React.ReactNode;
}

const LinkCustom = ({ href, className, children }: PropsLink) => {
    return (
            <Link
                href={href}
                className={`bg-primary block py-2 md:text-base text-sm md:py-2.5 px-6 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 text-center ${className || ""}`}
            >
                {children}
            </Link>
    );
};

export default LinkCustom;
