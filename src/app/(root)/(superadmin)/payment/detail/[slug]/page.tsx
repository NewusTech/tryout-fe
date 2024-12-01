"use client";

import TitleBack from "@/components/Superadmin/TitleBack";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import SuccessIcon from "../../../../../../../public/assets/icons/SuccessIcon";
import UnduhIcon from "../../../../../../../public/assets/icons/UnduhIcon";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Loading from "@/components/ui/Loading";
import { useParams, useRouter } from "next/navigation";
import LinkCustom from "@/components/ui/LinkCustom";
import { useGetUserTryoutPaymentSlug } from "@/services/api";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";

const DetailPayment = () => {

    // Integrasi API
    const { slug } = useParams();
    const { data } = useGetUserTryoutPaymentSlug(slug as string);

    // 
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const accessToken = Cookies.get("accessToken"); // Ambil token langsung
    const navigate = useRouter();

    const handleDownload = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/receipt/${data?.data?.id}`,
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
            <TitleBack href="/payment" title="Detail Pembayaran" />
            {/* form */}
            <div className="form mx-auto w-[60%] shadow-md flex flex-col gap-5 rounded-xl bg-white border border-gray-100 p-10">
                <div className="head flex flex-col gap-2 items-center">
                    <div className="">
                        <SuccessIcon />
                    </div>
                    <div className="font-medium text-lg">Detail Pembayaran!</div>
                </div>
                {/*  */}
                <div className="flex flex-col gap-4 mt-10">
                    {/*  */}
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <div className="text-black/60">
                                Nama
                            </div>
                            <div className="font-semibold">{data?.data?.name ?? "-"}</div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-black/60 text-end">
                                Metode Pembayaran
                            </div>
                            <div className="font-semibold text-end">{data?.data?.metode_payment ?? "-"}</div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <div className="text-black/60">
                                Paket Tryout
                            </div>
                            <div className="font-semibold">{data?.data?.package_user ?? "-"}</div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-black/60 text-end">
                                Tanggal dan Waktu
                            </div>
                            <div className="font-semibold text-end">
                                {data?.data?.createdAt
                                    ? format(new Date(data.data.createdAt), "dd-MM-yyyy, HH:mm", { locale: id })
                                    : "-"}
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <div className="text-black/60">
                                Jumlah Dibayarkan
                            </div>
                            <div className="font-semibold">
                                {data?.data?.price
                                    ? `Rp. ${Number(data?.data?.price).toLocaleString(
                                        "id-ID"
                                    )}`
                                    : "-"}
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <div className="text-black/60">
                                Bukti Pembayaran
                            </div>
                            <div className="h-[350px] p-4 border border-gray-100 rounded-xl">
                                <Image
                                    src={data?.data?.receipt ?? "/assets/images/no-image.png"}
                                    alt="receipt"
                                    width={500}
                                    height={500}
                                    unoptimized
                                    className="h-full object-contain"
                                />
                            </div>
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
