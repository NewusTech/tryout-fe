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
import { showAlert } from '@/lib/swalAlert'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { Textarea } from '@/components/ui/textarea'

const TabPerforma = () => {
    const { slug } = useParams();
    const { data } = useGetProfileNav(slug as string);

    // 
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const accessToken = Cookies.get("accessToken");
    const [loading, setLoading] = useState(false);
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
    // handlesetuju
    const id = data?.data?.User?.id
    const axiosPrivate = useAxiosPrivate();
    const handleSetuju = async () => {

        setLoading(true);
        // 
        const bodyFeedback = {
            status: 2
        }
        try {
            setLoading(true);
            await axiosPrivate.put(`/user/rapor/update/status/${slug}`, bodyFeedback);
            showAlert("success", "Data berhasil disetujui!");
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.data?.[0]?.message ||
                error?.response?.data?.message ||
                "Gagal menyutujui rapor!";
            showAlert("error", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // handle generate rapor
    const [rapor, setRapor] = useState("");
    const handleGenerateRapor = async () => {
        setIsLoading(true);
        try {
            setIsLoading(true);
            const response = await axiosPrivate.post(`/user/get/rapor/user/${slug}`);
            setRapor(response?.data?.raporPath);
            showAlert("success", "Data berhasil digenerate");

        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.data?.[0]?.message ||
                error?.response?.data?.message ||
                "Gagal generate rapor!";
            showAlert("error", errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // Note
    // catatan
    const [catatanText, setCatatanText] = useState<string>(""); // Menyimpan nilai catatan
    const [loadingNote, setLoadingNote] = useState(false);
    const [isPopupOpenCatatan, setIsPopupOpenCatatan] = useState(false);
    // Open pop-up
    const handleOpenPopupCatatan = () => setIsPopupOpenCatatan(true);
    // Close pop-up
    const handleClosePopupCatatan = () => {
        setIsPopupOpenCatatan(false);
    };
    const handleCatatan = async () => {
        setLoadingNote(true);
        // 
        const bodyFeedback = {
            note: catatanText,
            status: 1
        }
        try {
            setLoadingNote(true);
            await axiosPrivate.put(`/user/rapor/update/status/${slug}`, bodyFeedback);
            showAlert("success", "Berhasil menambahkan catatan!");
            handleClosePopupCatatan();
            setCatatanText("");
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.data?.[0]?.message ||
                error?.response?.data?.message ||
                "Gagal menambah catatan!";
            showAlert("error", errorMessage);
        } finally {
            setLoadingNote(false);
        }
    };

    return (
        <div>
            <div className="">
                {/* dokumen */}
                <div className="wrap flex flex-col gap-4">
                    <div className="flex gap-3 justify-end">
                        <Button
                            className='flex items-center gap-3 w-[220px]'
                            onClick={handleGenerateRapor}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loading />
                            ) : (
                                <div className="flex items-center gap-3">
                                    Generate Report
                                    <PrintIcon color='white' />
                                </div>
                            )}
                        </Button>
                        <Button
                            className='flex items-center gap-3 w-[220px]'
                            onClick={handleOpenPopupCatatan}
                            variant="outlinePrimary"
                        >
                            Beri Catatan
                        </Button>
                        <Button
                            className='flex items-center gap-3 w-[220px]'
                            onClick={handleSetuju}
                            variant="outlinePrimary"
                            disabled={loading}
                        >
                            {loading ? (
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
                                {rapor ? (
                                    <iframe
                                        allowFullScreen
                                        src={rapor}
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
            {/* modal catatan */}
            {isPopupOpenCatatan && (
                <div onClick={handleClosePopupCatatan} className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl overflow-hidden relative w-[600px] md:mx-0 mx-4"
                    >
                        {/* Header */}
                        <div className="px-7 flex bg-white border-b justify-between p-4">
                            <div className="text-primary font-medium flex items-center gap-2">
                                Catatan Mentor
                            </div>
                            <button onClick={handleClosePopupCatatan} className="flex justify-center items-center text-white w-6 h-6 rounded-full bg-primary">x</button>
                        </div>
                        {/* Content */}
                        <div className="flex px-7 gap-4 items-center border-b border-slate-300 pt-2">
                            <div>
                                <div className="text-primary font-semibold mb-2">
                                    Berikan Catatan Untuk User!
                                </div>
                            </div>
                        </div>
                        {/* Catatan Textarea */}
                        <div className="px-7 mt-3">
                            <Textarea
                                placeholder="Masukkan catatan"
                                value={catatanText}
                                onChange={(e) => setCatatanText(e.target.value)}
                            />
                        </div>
                        {/* Submit Button */}
                        <div className="p-4 px-7 flex gap-3 justify-end">
                            <Button
                                className={`w-full rounded-full py-2 ${loadingNote ? "bg-gray-500" : "bg-primary hover:bg-primary-hover"
                                    }`}
                                onClick={handleCatatan}
                                disabled={loadingNote || catatanText === ""}
                            >
                                {loadingNote ? <Loading /> : "Kirim"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TabPerforma