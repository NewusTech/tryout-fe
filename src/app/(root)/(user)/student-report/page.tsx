"use client"
import Navbar from '@/components/User/Home/Navbar';
import { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { showAlert } from '@/lib/swalAlert';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/Loading';
import PrintIcon from '../../../../../public/assets/icons/PrintIcon';
import { useGetRaporId, useGetUserProfileId } from '@/services/api';

const Report = () => {
    const [slug, setSlug] = useState<string | undefined>(undefined);
    const [reportUrlUser, setReportUrl] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setSlug(Cookies.get("slug"));
        // setReportUrl(Cookies.get("reportUrl"));
    }, []);

    const { data: dataUserId } = useGetUserProfileId(slug as string);

    // const setReport = (reportUrl: string) => {
    //     Cookies.set("reportUrl", reportUrl,);
    // };

    const axiosPrivate = useAxiosPrivate();
    const handleGenerate = async () => {
        try {
            setLoading(true);
            showAlert("success", "Report berhasil digenerate!");
            const response = await axiosPrivate.post(`/user/get/rapor/user`,);
            setReportUrl(response?.data?.raporPath);
            // window.location.reload();
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.data?.[0]?.message ||
                error?.response?.data?.message ||
                "Gagal generate report!";
            showAlert("error", errorMessage);

        } finally {
            setLoading(false);
        }
    };

    const id = dataUserId?.data?.id.toString()
    const { data } = useGetRaporId(id as string);

    const dataUser = data?.data

    return (
        <div >
            <div className="text-srBlack overflow-x-hidden min-h-screen">
                <Navbar />
                <div className="wrap-alll container mx-auto pt-[120px]">
                    <div className="md:text-2xl text-xl font-semibold my-4 text-primary">
                        Student Report
                    </div>
                </div>
                <div className="wrap flex container mx-auto flex-col gap-4">
                    {/*  */}
                    <div className="konten flex flex-col gap-4">
                        <div className="wrap flex gap-1 px-1">
                            <div className={`w-full h-[600px] items-center border border-line-stroke rounded-lg overflow-hidden flex justify-center text-center text-sm md:text-base p-5`}>
                                {dataUser?.rapor ? (
                                    <iframe
                                        allowFullScreen
                                        src={dataUser?.rapor}
                                        title="File"
                                        className="rounded-xl w-full h-full"
                                    ></iframe>
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full">
                                        <span>Rapor Belum Tersedia</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Report;