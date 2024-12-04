import React, { useState, useEffect, useMemo } from 'react';
import WarningIcon from '../../../../../public/assets/icons/WarningIcon';
import { Button } from '@/components/ui/button';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useRouter } from 'next/navigation';
import { showAlert } from '@/lib/swalAlert';
import Cookies from "js-cookie";
import { Textarea } from '@/components/ui/textarea';
import Loading from '@/components/ui/Loading';
import MessageIcon from '../../../../../public/assets/icons/MessageIcon';


interface CountdownProps {
    end_time: string; // End time passed as a string (e.g., "2024-12-31T23:59:59")
}

const Countdown = ({ end_time }: CountdownProps) => {
    const [rating, setRating] = useState<string>(""); // Menyimpan nilai rating
    const [feedbackText, setFeedbackText] = useState<string>(""); // Menyimpan nilai feedback
    const [loading, setLoading] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useRouter();
    // Memoize the endDate to prevent unnecessary recalculations
    const endDate = useMemo(() => new Date(end_time), [end_time]);
    // Habis
    const [isPopupOpenHabis, setIsPopupOpenHabis] = useState(false);
    // Open pop-up
    const handleOpenPopupHabis = () => setIsPopupOpenHabis(true);
    // Close pop-up
    const handleClosePopupHabis = () => {
        setIsPopupOpenHabis(false);
    };

    // feedback
    const [isPopupOpenFeedback, setIsPopupOpenFeedback] = useState(false);
    // Open pop-up
    const handleOpenPopupFeedback = () => setIsPopupOpenFeedback(true);
    // Close pop-up
    const handleClosePopupFeedback = () => {
        setIsPopupOpenFeedback(false);
    };
    const handleRatingClick = (value: string) => {
        setRating(value); // Mengatur nilai rating saat lingkaran diklik
    };

    const id = Cookies.get("package");
    const handleFeedBack = async () => {
        if (!rating || !feedbackText) {
            console.log("Harap isi semua bidang sebelum mengirim.");
            return;
        }

        setLoading(true);
        // 
        const bodyFeedback = {
            question_1: rating,
            feedback: feedbackText,
        }
        try {
            setLoading(true);
            await axiosPrivate.post(`/user/feedback/create/${id}`, bodyFeedback);
            showAlert("success", "Data berhasil disimpan!");
            navigate.push("/my-package/history");
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.data?.[0]?.message ||
                error?.response?.data?.message ||
                "Gagal menyelesainkan tryout!";
            showAlert("error", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleEndTime = async () => {
        try {
            setLoading(true);
            await axiosPrivate.post(`/user/end/time/tryout/${id}`,);
            // console.log("endtime sukses")
            showAlert("success", "Data berhasil dikirim!");
            handleOpenPopupFeedback();
            handleClosePopupHabis();

        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.data?.[0]?.message ||
                error?.response?.data?.message ||
                "Gagal memulai tryout!";
                showAlert("error", errorMessage);
        } finally {
            setLoading(false);
        }

    };

    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            const timeDifference = endDate.getTime() - now.getTime();

            if (timeDifference <= 0) {
                clearInterval(intervalId); // Stop the countdown
                handleOpenPopupHabis();
                // alert('Waktu habis!'); // Trigger alert when the time is up
                // 
            } else {
                const hours = Math.floor(timeDifference / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                setTimeLeft({
                    hours,
                    minutes,
                    seconds,
                });
            }
        }, 1000); // Update the countdown every second

        // Cleanup the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, [endDate]);
    // Dependency on endDate only

    return (
        <div className="flex w-fit md:gap-10 gap-5 bg-primary rounded-lg md:rounded-xl md:p-3 p-2 md:text-sm text-xs">
            <div className="flex flex-col items-center">
                <div>{timeLeft.hours}</div>
                <div>Jam</div>
            </div>
            <div className="flex flex-col items-center">
                <div>{timeLeft.minutes}</div>
                <div>Menit</div>
            </div>
            <div className="flex flex-col items-center">
                <div>{timeLeft.seconds}</div>
                <div>Detik</div>
            </div>
            {/* Habis Modal */}
            {isPopupOpenHabis && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div
                        className="bg-white rounded-lg relative w-[600px] md:mx-0 mx-4"
                    >
                        <div className="px-7 flex justify-between border-b border-slate-300 p-4">
                            <div className="text-primary font-medium">PERHATIAN</div>
                        </div>
                        <div className="flex px-7 gap-4 items-center border-b border-slate-300 p-4">
                            <div className="left">
                                <WarningIcon />
                            </div>
                            <div className="right">
                                <div className="text-primary font-semibold md:text-xl mb-2">
                                    Waktu Habis!
                                </div>
                            </div>
                        </div>
                        {/* button */}
                        <div className="p-4 px-7 flex gap-3 justify-end">
                            <Button
                                // variant="outlinePrimary"
                                onClick={handleEndTime}
                                className='w-[170px]'
                            >
                                {loading ? <Loading /> : "Kirim Jawaban"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {/* Feedback Modal */}
            {isPopupOpenFeedback && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div
                        className="bg-white rounded-lg overflow-hidden relative w-[600px] md:mx-0 mx-4"
                    >
                        {/* Header */}
                        <div className="px-7 flex bg-white border-b justify-between p-4">
                            <div className="text-primary font-medium flex items-center gap-2">
                                <MessageIcon />
                                Feedback
                            </div>
                        </div>
                        {/* Content */}
                        <div className="flex px-7 gap-4 items-center border-b border-slate-300 p-4">
                            <div>
                                <div className="text-primary font-semibold mb-2">
                                    Berikan Masukan untuk Kami!
                                </div>
                                <div className="text-sm text-primary">
                                    Seberapa puas Anda dengan pengalaman menggunakan website ini?
                                </div>
                            </div>
                        </div>
                        {/* Rating */}
                        <div className="wrap flex gap-4 px-7 p-3 justify-evenly items-end">
                            {["1", "2", "3", "4", "5"].map((value) => (
                                <button
                                    key={value}
                                    className="flex flex-col items-center gap-2"
                                    onClick={() => handleRatingClick(value)}
                                >
                                    <div className="text-center text-sm flex justify-center w-[40px] h-[40px] items-center font-medium">
                                        {value === "1" && "Tidak Sesuai"}
                                        {value === "2" && "Kurang Sesuai"}
                                        {value === "3" && "Cukup"}
                                        {value === "4" && "Sesuai"}
                                        {value === "5" && "Sangat Sesuai"}
                                    </div>
                                    <div
                                        className={`w-[50px] h-[50px] flex justify-center items-center rounded-full text-sm ${rating === value
                                            ? "bg-primary text-white"
                                            : "bg-white border border-primary text-primary"
                                            }`}
                                    >
                                        {value}
                                    </div>
                                </button>
                            ))}
                        </div>
                        {/* Feedback Textarea */}
                        <div className="px-7 mt-3">
                            <Textarea
                                className='text-black'
                                placeholder="Masukkan kritik dan saran"
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                            />
                        </div>
                        {/* Submit Button */}
                        <div className="p-4 px-7 flex gap-3 justify-end">
                            <Button
                                className={`w-full rounded-full py-2 ${loading ? "bg-gray-500" : "bg-primary hover:bg-primary-hover"
                                    }`}
                                onClick={handleFeedBack}
                                disabled={loading || rating === null || feedbackText === ""}
                            >
                                {loading ? <Loading /> : "Kirim"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Countdown;
