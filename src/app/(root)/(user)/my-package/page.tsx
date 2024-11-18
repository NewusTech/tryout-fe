"use client"
import Navbar from '@/components/User/Home/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import SearchIcon from '../../../../../public/assets/icons/SearchIcon';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import LinkCustom from '@/components/ui/LinkCustom';

const MyPackage = () => {
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => {
        setCurrentPage(page)
    };

    // serach
    const [search, setSearch] = useState("");
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setCurrentPage(1); // Reset to page 1
    };
    // serach
    return (
        <div>
            <div className='text-srBlack overflow-x-hidden'>
                <Navbar />
                <div className="wrap-alll container mx-auto min-h-screen">
                    <div className="text-secondary font-semibold text-2xl pt-[120px]">Paket Saya</div>
                    <div className="mt-4 flex items-center gap-3 ">
                        <div className="md:w-[40%] w-full">
                            <Input
                                placeholder='Cari Paket'
                                leftIcon={<SearchIcon />}
                                className='border-primary'
                                value={search}
                                onChange={handleSearchChange}
                            />
                        </div>
                        {/* tab */}
                        <Button
                            className='py-3.5 md:py-2.5'
                        >Try Out</Button>
                    </div>
                    {/* content tab try out */}
                    <div className="pb-10">
                        <div className="mt-7">
                            <div className="card bg-white border border-gray-100 shadow-lg rounded-xl overflow-hidden md:p-7 flex md:flex-row flex-col gap-4">
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
                                <div className="right flex flex-col md:px-0 px-4 justify-between w-full">
                                    <div className="head text-primary flex flex-col gap-1">
                                        <div className="md:text-xl text-base font-semibold">Try Out CPNS 2024 (Part 1)</div>
                                        <div className="md:text-base text-sm">02 Oktober 2024, 18.00 WIB</div>
                                    </div>
                                    <div className="button flex gap-3 md:justify-end w-full mt-5 mb-5">
                                        <LinkCustom
                                            href='/my-package/do-assignments'
                                            className='px-10 text-white md:w-[160px] w-full'
                                        >
                                            Kerjakan
                                        </LinkCustom>
                                        <LinkCustom
                                            href='/my-package/history'
                                            className='px-10 bg-white text-primary border border-primary md:w-[160px] w-full'
                                        >
                                            Riwayat
                                        </LinkCustom>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* content tab  */}
                        <div className="mt-7">
                            <div className="card bg-white border border-gray-100 shadow-lg rounded-xl overflow-hidden md:p-7 flex md:flex-row flex-col gap-4">
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
                                <div className="right flex flex-col md:px-0 px-4 justify-between w-full">
                                    <div className="head text-primary flex flex-col gap-1">
                                        <div className="md:text-xl text-base font-semibold">Try Out CPNS 2024 (Part 1)</div>
                                        <div className="md:text-base text-sm">02 Oktober 2024, 18.00 WIB</div>
                                    </div>
                                    <div className="button flex gap-3 md:justify-end w-full mt-5 mb-5">
                                        <LinkCustom
                                            href='/my-package/do-assignments'
                                            className='px-10 text-white md:w-[160px] w-full'
                                        >
                                            Kerjakan
                                        </LinkCustom>
                                        <LinkCustom
                                            href='/my-package/history'
                                            className='px-10 bg-white text-primary border border-primary md:w-[160px] w-full'
                                        >
                                            Riwayat
                                        </LinkCustom>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default MyPackage