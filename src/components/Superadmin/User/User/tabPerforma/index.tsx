import React, { useState } from 'react'
import PerformaChart from './Chart'
import { Button } from '@/components/ui/button'
import PrintIcon from '../../../../../../public/assets/icons/PrintIcon'
import { useParams } from 'next/navigation'
import { useGetProfileNav } from '@/services/api'
import Swal from 'sweetalert2';
import Cookies from "js-cookie";
import Loading from '@/components/ui/Loading'
import UnduhIcon from '../../../../../../public/assets/icons/UnduhIcon'

const TabPerforma = () => {
    const { slug } = useParams();
    const { data } = useGetProfileNav(slug as string);

    // 
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const accessToken = Cookies.get("accessToken");
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const handleGenerate = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/rapor/output/get/${data?.data?.User?.id}`,
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
            setFileUrl(url);
            a.download = `Report Tryout ${data?.data?.name}.pdf`;
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
        <div>
            <div className="">
                {/* dokumen */}
                <div className="wrap flex flex-col gap-4">
                    <div className="flex gap-3 justify-end">
                    <Button
                        className='flex items-center gap-3 w-[220px]'
                        onClick={handleGenerate}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loading />
                        ) : (
                            <div className="flex items-center gap-3">
                                Generate Report
                                <PrintIcon color='white'/>
                            </div>
                        )}
                    </Button>
                    <Button
                        className='flex items-center gap-3 w-[220px]'
                        onClick={handleGenerate}
                        variant="outlinePrimary"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loading />
                        ) : (
                            <div className="flex items-center gap-3">
                                Setujui
                            </div>
                        )}
                    </Button>
                    </div>
                    {/*  */}
                    <div className="konten flex flex-col gap-4">
                        <div className="wrap flex gap-1 px-1">
                            <div className={`w-full h-[500px] items-center border border-line-stroke rounded-lg overflow-hidden flex justify-center text-center text-sm md:text-base p-5`}>
                                {fileUrl ? (
                                    <iframe
                                        allowFullScreen
                                        src={fileUrl}
                                        title="File"
                                        className="rounded-xl w-full h-full"
                                    ></iframe>
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full">
                                        <span>Generate Report</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-7">
                <PerformaChart />
            </div>
        </div>
    )
}

export default TabPerforma