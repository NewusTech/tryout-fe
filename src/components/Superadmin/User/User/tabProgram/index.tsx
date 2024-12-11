import { useGetUserDetailId } from '@/services/api';
import Image from 'next/image'
import { useParams } from 'next/navigation';
import React from 'react'

const TabProgram = () => {
    // Integrasi API
    const { slug } = useParams();
    const { data } = useGetUserDetailId(slug as string);
    return (
        <div className='flex flex-col gap-4'>
            {data?.data?.program && data?.data?.program.length > 0 ? (
                data?.data?.program?.map((user) => (
                    <div key={user?.id} className="card bg-white border border-gray-100 shadow-lg rounded-xl overflow-hidden md:p-7 flex md:flex-row flex-col gap-4">
                        <div className="left flex-shrink-0">
                            <div className="img">
                                <Image
                                    src="/assets/images/book.png"
                                    alt="logo"
                                    width={1000}
                                    height={1000}
                                    unoptimized
                                    className="md:w-[300px] w-full object-contain md:rounded-xl"
                                />
                            </div>
                        </div>
                        <div className="right flex flex-col justify-center md:px-0 px-4 w-full text-primary">

                            <div  className="md:text-xl text-base font-semibold">
                                {user?.nama_package ?? "-"}
                            </div>

                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center mt-5">Tidak ada Data</div>
            )}
        </div>
    )
}

export default TabProgram