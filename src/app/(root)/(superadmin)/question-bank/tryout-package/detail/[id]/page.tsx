"use client";

import React from "react";
import TitleBack from "@/components/Superadmin/TitleBack";
import { useParams, useSearchParams } from "next/navigation";
import { useGetPackageId } from "@/services/api";

const DetailTryoutPackage = () => {
    // Integrasi API
    const { id } = useParams();
    const { data } = useGetPackageId(id as string);

    const dataUser = data?.data
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
                        {dataUser?.title ?? "-"}
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <div>
                        <div className="text-lg font-medium mb-2 text-primary">
                            Deskripsi
                        </div>
                        <div className="border rounded-lg p-3 text-justify border-primary text-primary"
                            dangerouslySetInnerHTML={{ __html: dataUser?.description ?? "-" }}
                        >
                        </div>
                    </div>
                    {/*  */}
                    {/* <div className="flex items-center justify-between">
                        <div className="font-medium text-primary">Tipe Paket</div>
                        <div className="w-1/2">
                            <div className="w-full px-5 text-primary border border-primary p-2.5 bg-[#FAFAFA] rounded-full">
                                {dataUser?.typepackage_id ?? "-"}
                            </div>
                        </div>
                    </div> */}
                    {/*  */}
                    <div className="flex items-center justify-between">
                        <div className="font-medium text-primary">TIU</div>
                        <div className="w-1/2">
                            <div className="w-full px-5 text-primary border border-primary p-2.5 bg-[#FAFAFA] rounded-full">
                                {dataUser?.Bank_packages[0]?.Bank_soal?.title ?? "-"}
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="flex items-center justify-between">
                        <div className="font-medium text-primary">TWK</div>
                        <div className="w-1/2">
                            <div className="w-full px-5 text-primary border border-primary p-2.5 bg-[#FAFAFA] rounded-full">
                                {dataUser?.Bank_packages[1]?.Bank_soal?.title ?? "-"}
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="flex items-center justify-between">
                        <div className="font-medium text-primary">TKP</div>
                        <div className="w-1/2">
                            <div className="w-full px-5 text-primary border border-primary p-2.5 bg-[#FAFAFA] rounded-full">
                                {dataUser?.Bank_packages[2]?.Bank_soal?.title ?? "-"}
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="flex items-center justify-between">
                        <div className="font-medium text-primary">Waktu Pengerjaan</div>
                        <div className="w-1/2">
                            <div className="w-full px-5 text-primary border border-primary p-2.5 bg-[#FAFAFA] rounded-full">
                                {dataUser?.duration ?? "-"}
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="flex items-center justify-between">
                        <div className="font-medium text-primary">Jumlah Soal</div>
                        <div className="w-1/2">
                            <div className="w-full px-5 text-primary border border-primary p-2.5 bg-[#FAFAFA] rounded-full">
                                {dataUser?.total_question ?? "-"} Soal
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="flex items-center justify-between">
                        <div className="font-medium text-primary">Harga</div>
                        <div className="w-1/2">
                            <div className="w-full px-5 text-primary border border-primary p-2.5 bg-[#FAFAFA] rounded-full">
                                Rp. {dataUser?.price ?? "-"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailTryoutPackage;
