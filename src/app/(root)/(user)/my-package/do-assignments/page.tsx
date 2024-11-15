"use client";
import Navbar from '@/components/User/Home/Navbar';
import VerifIcon from '../../../../../../public/assets/icons/VerifIcon';
import { Button } from '@/components/ui/button';

const DoAssignments = () => {

    return (
        <div>
            <div className='text-srBlack overflow-x-hidden'>
                <Navbar />
                <div className="wrap-alll container mx-auto min-h-screen">
                    <div className="text-primary font-semibold text-2xl pt-[120px]">
                        Try Out SKD CASN 2024
                    </div>
                    <div className="text-primary px-5 py-2 rounded-full bg-[#DCC080] w-fit mt-3">
                        07 September 2024
                    </div>
                    {/*  */}
                    <div className="wrap flex gap-5 mt-7">
                        <div className="left w-[80%] bg-white p-5 shadow-md rounded-2xl">
                            <div className="font-semibold text-xl mb-2">Persiapan Tryout</div>
                            <div className="">
                                1. Pilih Waktu dan Tempat yang Kondusif
                                Mengerjakan tryout di waktu senggang dengan suasana yang tenang dan nyaman akan membantumu lebih fokus dan maksimal.
                                <br />
                                2. Pastikan Koneksi Internet Stabil
                                Koneksi yang stabil sangat penting untuk memastikan tryout berjalan tanpa kendala teknis.
                                <br />
                                3. Siapkan Alat Tulis dan Kertas
                                Persiapkan alat tulis dan kertas untuk membantu mencatat dan menghitung selama tryout berlangsung.
                                <br />
                                4. Cek Baterai dan Siapkan Charger
                                Jika menggunakan perangkat elektronik, pastikan baterai penuh. Jangan lupa menyediakan charger jika diperlukan.
                            </div>
                        </div>
                        <div className="right w-[20%] bg-white p-5 shadow-md rounded-2xl">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1">
                                    <div className="font-medium">Jumlah Soal</div>
                                    <div className="text-primary">110</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="font-medium">Durasi Pengerjaan</div>
                                    <div className="text-primary">110</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="font-medium">Passing Grade</div>
                                    <div className="flex gap-4">
                                        <div className="flex flex-col gap-2">
                                            <div className="">TWK</div>
                                            <div className="">TIU</div>
                                            <div className="">TKP</div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="">:</div>
                                            <div className="">:</div>
                                            <div className="">:</div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex gap-2">
                                                110
                                                <VerifIcon />
                                            </div>
                                            <div className="flex gap-2">
                                                110
                                                <VerifIcon />
                                            </div>
                                            <div className="flex gap-2">
                                                110
                                                <VerifIcon />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* button */}
                            <div className="mt-7 flex justify-center">
                                <Button className='px-10'>Mulai</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoAssignments;
