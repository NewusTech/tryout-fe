import Link from 'next/link'
import React from 'react'
import ArrowBack from '../../../../public/assets/icons/ArrowBack'

interface TitleProps {
    title: string
    href: string
}

const TitleBack = (props : TitleProps) => {
  return (
    <div className="text-primary font-semibold flex items-center gap-3 text-xl md:text-3xl mb-4 md:mb-10">
        <div className='bg-secondary/10 hover:bg-secondary/30 transition-all duration-100 h-8 w-8 flex items-center justify-center rounded-full'>
            <Link
            className='w-full h-full flex items-center justify-center'
                href={props.href}
            >
                <ArrowBack />
            </Link>
        </div>
        {props.title}
      </div>
  )
}

export default TitleBack