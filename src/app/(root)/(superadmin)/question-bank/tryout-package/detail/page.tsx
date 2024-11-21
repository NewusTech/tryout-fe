"use client";

import React from "react";
import TitleBack from "@/components/Superadmin/TitleBack";

const DetailTryoutPackage = () => {
    return (
        <div className="">
            <TitleBack href="/question-bank/tryout-package" title="Detail Paket Tryout" />
            {/* Detail Header */}

            {/* Informasi Bank Soal */}
            <div className="shadow-md mt-6 text-pirmary flex flex-col gap-5 rounded-xl bg-[#FAFAFA] border border-gray-100 p-6">
                <div>
                    <div className="text-lg font-medium mb-2 text-primary">
                        Nama Paket Tryout
                    </div>
                    <div className="border-b border-primary text-primary pb-2">
                        Tryout 1
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <div>
                        <div className="text-lg font-medium mb-2 text-primary">
                            Deskripsi
                        </div>
                        <div className="border rounded-lg p-5 text-justify border-primary text-primary pb-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit maiores officia laborum, repellat recusandae sed, eveniet, ea voluptates necessitatibus ad rem? Nemo asperiores accusamus nisi perferendis excepturi esse? Tempore, necessitatibus. Quis, animi! Veniam corrupti odio beatae. Cum doloribus non quibusdam iste, quo possimus. Harum, id est corporis aut laudantium aliquid deserunt repellendus nostrum in explicabo perspiciatis animi dolorem earum ipsa vero, voluptate dolor? Suscipit, velit atque. Voluptatem culpa perferendis nisi?
                        </div>
                    </div>
                    {/*  */}
                    <div className="flex items-center justify-between">
                        <div className="font-medium text-primary">Tipe Paket</div>
                        <div className="w-1/2">
                            <div className="w-full px-5 text-primary border border-primary p-2.5 bg-[#FAFAFA] rounded-full">
                                Premium
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="flex items-center justify-between">
                        <div className="font-medium text-primary">TIU</div>
                        <div className="w-1/2">
                            <div className="w-full px-5 text-primary border border-primary p-2.5 bg-[#FAFAFA] rounded-full">
                                TIU 1
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="flex items-center justify-between">
                        <div className="font-medium text-primary">TWK</div>
                        <div className="w-1/2">
                            <div className="w-full px-5 text-primary border border-primary p-2.5 bg-[#FAFAFA] rounded-full">
                                TWK 1
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="flex items-center justify-between">
                        <div className="font-medium text-primary">Waktu Pengerjaan</div>
                        <div className="w-1/2">
                            <div className="w-full px-5 text-primary border border-primary p-2.5 bg-[#FAFAFA] rounded-full">
                                1 Jam 30 Menit
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="flex items-center justify-between">
                        <div className="font-medium text-primary">Jumlah Soal</div>
                        <div className="w-1/2">
                            <div className="w-full px-5 text-primary border border-primary p-2.5 bg-[#FAFAFA] rounded-full">
                                90 Soal
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="flex items-center justify-between">
                        <div className="font-medium text-primary">Harga</div>
                        <div className="w-1/2">
                            <div className="w-full px-5 text-primary border border-primary p-2.5 bg-[#FAFAFA] rounded-full">
                                Rp. 400.000
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailTryoutPackage;
