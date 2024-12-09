import React from 'react'
import WaIcons from '../../../../../public/assets/icons/WaIcons'
import Link from 'next/link'
import { useGetAboutCompany } from '@/services/api';

const ContactUs = () => {
    const { data, isLoading } = useGetAboutCompany();

    return (
        <Link target='_blank' href={`https://wa.me/${data?.data?.telepon}`} className='fixed bottom-10 right-10 flex justify-center items-center bg-[#5FD568] hover:bg-green-700 transition-all duration-150 shadow-md rounded-full md:p-3 p-2 md:px-6 px-3 gap-4 ease-in-out delay-150 hover:-translate-y-1'>
            <div className="text-white text-sm md:text-xl font-medium">
                Hubungi Admin
            </div>
            <WaIcons />
        </Link>
    )
}

export default ContactUs