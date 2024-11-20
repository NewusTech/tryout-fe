"use client";

import { DatePicker } from "@/components/Custom/DatePicker";
import { CustomSelect } from "@/components/Custom/SelectCustom";
import SelectSearch from "@/components/Custom/SelectSearch";
import TitleBack from "@/components/Superadmin/TitleBack";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import BankIcon from "../../../../../../public/assets/icons/BankIcon";
import CashIcon from "../../../../../../public/assets/icons/CashIcon";
import SuccessIcon from "../../../../../../public/assets/icons/SuccessIcon";
import UnduhIcon from "../../../../../../public/assets/icons/UnduhIcon";

const DetailPayment = () => {

    return (
        <div className="">
            <TitleBack href="/payment" title="Detail Pembayaran" />
            {/* form */}
            <div className="form mx-auto w-[60%] shadow-md flex flex-col gap-5 rounded-xl bg-white border border-gray-100 p-10">
                <div className="head flex flex-col gap-2 items-center">
                    <div className="">
                        <SuccessIcon />
                    </div>
                    <div className="font-medium text-lg">Pembayaran Sukses!</div>
                </div>
                {/*  */}
                <div className="flex flex-col gap-4 mt-10">
                    {/*  */}
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <div className="text-black/60">
                                Nomor Pembayaran
                            </div>
                            <div className="font-semibold">INV567489240UI</div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-black/60 text-end">
                                Metode Pembayaran
                            </div>
                            <div className="font-semibold text-end">Bank Transfer</div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <div className="text-black/60">
                                Tanggal
                            </div>
                            <div className="font-semibold">24 February 2023</div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-black/60 text-end">
                                Waktu
                            </div>
                            <div className="font-semibold text-end">10:00 WIB</div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <div className="text-black/60">
                                Jumlah Dibayarkan
                            </div>
                            <div className="font-semibold">Rp. 1.050.000</div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-black/60 text-end">
                                Status
                            </div>
                            <div className="font-semibold text-end">Sukses</div>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="flex justify-center mt-10">
                    <Button
                    className="flex gap-3 w-[60%]"
                    >
                        <UnduhIcon />
                        Invoice
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DetailPayment;
