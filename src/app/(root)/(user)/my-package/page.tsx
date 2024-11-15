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
                        <div className="w-[40%]">
                            <Input
                                placeholder='Cari Paket'
                                leftIcon={<SearchIcon />}
                                className='border-primary'
                                value={search}
                                onChange={handleSearchChange}
                            />
                        </div>
                        {/* tab */}
                        <Button>Try Out</Button>
                    </div>
                    {/* content tab try out */}
                    <div className="mt-7">
                        <div className="card bg-white shadow-lg rounded-xl p-7 flex gap-4">
                            <div className="left flex-shrink-0">
                                <div className="img">
                                    <Image
                                        src="/assets/images/book.png"
                                        alt="logo"
                                        width={1000}
                                        height={1000}
                                        unoptimized
                                        className="w-[300px] object-contain"
                                    />
                                </div>
                            </div>
                            <div className="right flex flex-col justify-between w-full">
                                <div className="head text-primary flex flex-col gap-1">
                                    <div className="text-xl font-semibold">Try Out CPNS 2024 (Part 1)</div>
                                    <div className="">02 Oktober 2024, 18.00 WIB</div>
                                </div>
                                <div className="button flex gap-3 justify-end w-full">
                                    <LinkCustom
                                        href='/my-package/do-assignments'
                                        className='px-10 text-white'
                                    >
                                        Kerjakan
                                    </LinkCustom>
                                    <LinkCustom
                                        href='/my-package/history'
                                        className='px-10 bg-white text-primary border border-primary'
                                    >
                                        Riwayat
                                    </LinkCustom>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* content tab  */}
                    <div className="mt-7">
                        <div className="card bg-white shadow-lg rounded-xl p-7 flex gap-4">
                            <div className="left flex-shrink-0">
                                <div className="img">
                                    <Image
                                        src="/assets/images/book.png"
                                        alt="logo"
                                        width={1000}
                                        height={1000}
                                        unoptimized
                                        className="w-[300px] object-contain"
                                    />
                                </div>
                            </div>
                            <div className="right flex flex-col justify-between w-full">
                                <div className="head text-primary flex flex-col gap-1">
                                    <div className="text-xl font-semibold">Try Out CPNS 2024 (Part 1)</div>
                                    <div className="">02 Oktober 2024, 18.00 WIB</div>
                                </div>
                                <div className="button flex gap-3 justify-end w-full">
                                    <LinkCustom
                                        href='/my-package/detail'
                                        className='px-10 text-white'
                                    >
                                        Kerjakan
                                    </LinkCustom>
                                    <LinkCustom
                                        href='/my-package/detail'
                                        className='px-10 bg-white text-primary border border-primary'
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

    );
}

export default MyPackage