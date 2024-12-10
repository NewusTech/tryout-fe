import Image from 'next/image'
import React from 'react'
import EmailIcon from '../../../../../public/assets/icons/EmailIcon'
import WAIcon from '../../../../../public/assets/icons/WAIcon'
import MapIcon from '../../../../../public/assets/icons/MapIcon'
import Link from 'next/link'
import IgIcon from '../../../../../public/assets/icons/IgIcon'
import FbIcon from '../../../../../public/assets/icons/FbIcon'
import TiktokIcon from '../../../../../public/assets/icons/TiktokIcon'
import Xicon from '../../../../../public/assets/icons/Xicon'
import YtIcon from '../../../../../public/assets/icons/YtIcon'
import { useGetAboutCompany, useGetMediaSocial } from '@/services/api'

const Footer = () => {
    const { data, isLoading } = useGetAboutCompany();
    // INTEGRASI
    const { data: dataUser } = useGetMediaSocial();
    return (
        <div className="wrap-footer py-10">
            <div className="wrap container mx-auto">
                <div className="head flex items-center gap-3">
                    <div className="img w-[150px] ">
                        <Image
                            src={data?.data?.sub_logo ?? "/assets/images/logo-home.png"}
                            alt="logo"
                            width={500}
                            height={500}
                            unoptimized
                            className="h-full object-contain"
                        />
                    </div>
                    <div className="">
                        <div className="text-white text-lg font-medium">
                            {data?.data?.title ?? "MASTER EDUCATION"}
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="wrap flex md:flex-row flex-col gap-5 justify-between mt-6">
                    <div className="left text-white flex flex-col gap-4">
                        <div className="flex md:flex-row flex-col md:items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="">
                                    <EmailIcon />
                                </div>
                                <div className="md:text-base text-sm">
                                    {data?.data?.email ?? "-"}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="">
                                    <WAIcon />
                                </div>
                                <div className="md:text-base text-sm">
                                    {data?.data?.telepon ?? "-"}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="">
                                <MapIcon />
                            </div>
                            <div className="md:text-base text-sm">
                                {data?.data?.address ?? "-"}
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="flex flex-col gap-6">
                            <div className="text-white text-lg font-medium">Temukan Kami</div>
                            <div className="wrap flex items-center gap-4">
                                <Link href={dataUser?.data[0]?.link ?? "-"} target='_blank'>
                                    <IgIcon />
                                </Link>
                                <Link href={dataUser?.data[2]?.link ?? "-"} target='_blank'>
                                    <TiktokIcon />
                                </Link>
                                <Link href={dataUser?.data[1]?.link ?? "-"} target='_blank'>
                                    <FbIcon />
                                </Link>
                                <Link href={dataUser?.data[3]?.link ?? "-"} target='_blank'>
                                    <Xicon />
                                </Link>
                                <Link href={dataUser?.data[4]?.link ?? "-"} target='_blank'>
                                    <YtIcon />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="">
                <div className="h-[1px] my-10 w-full bg-white"></div>
                <div id='footer' className="kontak text-white hidden md:flex justify-center ">
                    {/* <Footer /> */}
                    Copyright <span className='font-semibold mx-3'> MASTER EDUCATION </span> 2024. AllRight Reserved
                </div>
                <div id='footer' className="kontak md:hidden text-sm text-white flex flex-col justify-center ">
                    {/* <Footer /> */}
                    <div className="flex justify-center">
                        Copyright <span className='font-semibold mx-3'> MASTER EDUCATION </span> 2024.
                    </div>
                    <div className="text-center">
                        AllRight Reserved
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Footer