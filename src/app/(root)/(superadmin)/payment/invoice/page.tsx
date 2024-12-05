"use client";

import TitleBack from "@/components/Superadmin/TitleBack";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import SuccessIcon from "../../../../../../public/assets/icons/SuccessIcon";
import UnduhIcon from "../../../../../../public/assets/icons/UnduhIcon";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Loading from "@/components/ui/Loading";
import { useRouter } from "next/navigation";
import LinkCustom from "@/components/ui/LinkCustom";

const DetailPayment = () => {
    const [NoPayment, setNoPayment] = useState<string | undefined>(undefined);
    const [MethodePayment, setMethodePayment] = useState<string | undefined>(undefined);
    const [DatePayment, setDatePayment] = useState<string | undefined>(undefined);
    const [TimePayment, setTimePayment] = useState<string | undefined>(undefined);
    const [PricePayment, setPricePayment] = useState<string | undefined>(undefined);
    const [StatusPayment, setStatusPayment] = useState<string | undefined>(undefined);
    const [IdPayment, setIdPayment] = useState<string | undefined>(undefined);
    const [formattedTime, setFormattedTime] = useState<string | null>(null);

    useEffect(() => {
        setNoPayment(Cookies.get("noPayment"));
        setMethodePayment(Cookies.get("methodePayment"));
        setDatePayment(Cookies.get("datePayment"));
        setTimePayment(Cookies.get("timePayment"));
        setPricePayment(Cookies.get("pricePayment"));
        setStatusPayment(Cookies.get("statusPayment"));
        setIdPayment(Cookies.get("idPayment"));
        if (TimePayment) {
            const [hours, minutes] = TimePayment.split('.').map(Number);

            // Membuat objek Date dengan waktu dasar 00:00:00 dan menambahkan jam
            const time = new Date();
            time.setHours(hours + 7, minutes, 0, 0); // Menambahkan 7 jam

            // Format waktu menjadi string "HH:mm"
            const formatted = time.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
            });

            setFormattedTime(formatted);
        }
    }, [TimePayment]);

    // 
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const accessToken = Cookies.get("accessToken"); // Ambil token langsung
    const navigate = useRouter();

    const handleDownload = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/receipt/${IdPayment}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `Invoice Pembayaran.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil download",
                    timer: 2000,
                    showConfirmButton: false,
                    position: "center",
                });
                Cookies.remove("noPayment");
                Cookies.remove("methodePayment");
                Cookies.remove("datePayment");
                Cookies.remove("timePayment");
                Cookies.remove("pricePayment");
                Cookies.remove("statusPayment");
                Cookies.remove("idPayment");
                navigate.push('/payment');
            }
        } catch (e: any) {
            Swal.fire({
                icon: "error",
                title: "Gagal download!",
                timer: 2000,
                showConfirmButton: false,
                position: "center",
            });
        } finally {
            setIsLoading(false);
        }
    };
    // 

    return (
        <div className="">
            <TitleBack href="/payment" title="Invoice Pembayaran" />
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
                            <div className="font-semibold">{NoPayment ?? "-"}</div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-black/60 text-end">
                                Metode Pembayaran
                            </div>
                            <div className="font-semibold text-end">{MethodePayment ?? "-"}</div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <div className="text-black/60">
                                Tanggal
                            </div>
                            <div className="font-semibold">{DatePayment ?? "-"}</div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-black/60 text-end">
                                Waktu
                            </div>
                            <div className="font-semibold text-end">{formattedTime ?? "-"} WIB</div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <div className="text-black/60">
                                Jumlah Dibayarkan
                            </div>
                            <div className="font-semibold">Rp. {PricePayment ?? "-"}</div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-black/60 text-end">
                                Status
                            </div>
                            <div className="font-semibold text-end">{StatusPayment === "true" ? "Sukses" : "Gagal"}</div>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="flex gap-3 justify-center mt-10">
                    <LinkCustom 
                    href="/payment"
                    className="w-[250px] flex-shrink-0 border border-primary text-primary bg-white hover:bg-gray-50"
                    >
                        Riwayat Pembayaran
                    </LinkCustom>
                    <Button
                        onClick={handleDownload}
                        disabled={isLoading}
                        className="flex gap-3 w-[250px] flex-shrink-0"
                    >
                        {isLoading ? (
                            <Loading />
                        ) : (
                            <div className="flex items-center gap-3">
                                <UnduhIcon />
                                Invoice
                            </div>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DetailPayment;
