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

const AddPayment = () => {
    // select
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
    const statusOptions = [
        { label: "Free", value: "Free" },
        { label: "Medium", value: "Medium" },
        { label: "Premium", value: "Premium" },
    ];

    // State to track selected payment method (either 'bank' or 'cash')
    const [paymentMethod, setPaymentMethod] = useState<string>("bank");

    // Handle method toggle (Bank or Cash)
    const handlePaymentMethodChange = (method: string) => {
        setPaymentMethod(method);
    };

    return (
        <div className="">
            <TitleBack href="/payment" title="Tambah Pembayaran" />
            {/* form */}
            <div className="form shadow-lg flex flex-col gap-5 rounded-xl bg-[#FAFAFA] border border-gray-100 p-6">
                {/*  */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-7">
                    <div className="flex flex-col md:gap-3 gap-2">
                        <Label className="text-primary">Nama</Label>
                        <Input placeholder="Nama" />
                    </div>
                    <div className="flex flex-col md:gap-3 gap-2">
                        <Label className="text-primary">Nomor Telepon</Label>
                        <Input placeholder="Nomor Telepon" />
                    </div>
                </div>
                {/*  */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-7">
                    <div className="flex flex-col md:gap-3 gap-2">
                        <Label className="text-primary">Email</Label>
                        <Input placeholder="Email" />
                    </div>
                    <div className="flex flex-col md:gap-3 gap-2">
                        <Label className="text-primary">Kata Sandi</Label>
                        <Input placeholder="Kata Sandi" />
                    </div>
                </div>
                {/*  */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-7">
                    <div className="flex flex-col md:gap-3 gap-2">
                        <Label className="text-primary">Paket Tryout</Label>
                        <CustomSelect
                            label="Paket Tryout"
                            options={statusOptions}
                            placeholder="Paket Tryout"
                            value={selectedValue}
                            onChange={setSelectedValue}
                            width="w-full"
                        />
                    </div>
                    <div className="flex flex-col md:gap-3 gap-2">
                        <Label className="text-primary">Harga</Label>
                        <Input placeholder="Harga" />
                    </div>
                </div>
                {/* metode */}
                <div className="bg-[#FAFAFA] flex flex-col gap-3 rounded-md border border-gray-200 p-5">
                    <div className="font-medium text-2xl">Metode Pembayaran</div>
                    <div className="flex flex-col gap-3">
                        {/* Bank Transfer Option */}
                        <div
                            className={`flex gap-3 p-3 items-center rounded cursor-pointer ${
                                paymentMethod === "bank" ? "bg-primary/5" : ""
                            }`}
                            onClick={() => handlePaymentMethodChange("bank")}
                        >
                            <div>
                                <BankIcon />
                            </div>
                            <div>Bank Transfer</div>
                        </div>
                        {/* Cash Option */}
                        <div
                            className={`flex gap-3 p-3 items-center rounded cursor-pointer ${
                                paymentMethod === "cash" ? "bg-primary/5" : ""
                            }`}
                            onClick={() => handlePaymentMethodChange("cash")}
                        >
                            <div>
                                <CashIcon />
                            </div>
                            <div>Cash</div>
                        </div>
                    </div>
                </div>
                {/* metode */}
                {/* button */}
                <div className="flex justify-end mt-5">
                    <Button className="px-12">Bayar</Button>
                </div>
            </div>
        </div>
    );
};

export default AddPayment;
