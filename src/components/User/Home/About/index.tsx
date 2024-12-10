import { useGetWhyUsHome } from '@/services/api';
import Image from 'next/image'
import React from 'react'

const AboutHome = () => {
    // INTEGRASI
    const { data } = useGetWhyUsHome();
    return (
        <div className="container mx-auto py-[120px]">
            <div className="text-3xl mb-5">
                <div className="flex gap-2 items-center">Mengapa Harus <span className='font-bold text-secondary'>MASTER</span> <span className='font-bold text-primary'>EDUCATION</span> </div>
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
                {/*  */}
                {data && data?.data?.length > 0 ? (
                    data?.data?.map((item, index) => (
                        <div key={item?.id} className="card  p-5 bg-[#FAFAFA] border border-gray-50 rounded-2xl shadow overflow-hidden">
                            <div className="flex justify-center">
                                <div className="w-[120px] h-[120px]">
                                    <Image
                                        src="/assets/images/notepad.png"
                                        alt="logo"
                                        width={500}
                                        height={500}
                                        unoptimized
                                        className="w-[800px] object-contain"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 mt-3">
                                <div className="font-medium text-lg">
                                    {item?.title ?? "-"}
                                </div>
                                <div className="">
                                    {item?.description ?? "-"}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex justify-center">Tidak Ada Data</div>
                )}
            </div>
        </div>
    )
}

export default AboutHome