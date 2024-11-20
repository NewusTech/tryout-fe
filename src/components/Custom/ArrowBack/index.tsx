import React from 'react'
import ArrowBack from '../../../../public/assets/icons/ArrowBack'
import Link from 'next/link'

const BackButton = () => {
    return (
        <div className=''>
            <Link
                href="/"
            >
                <ArrowBack />
            </Link>
        </div>
    )
}

export default BackButton