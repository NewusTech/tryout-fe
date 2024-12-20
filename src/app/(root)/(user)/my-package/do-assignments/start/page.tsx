/* eslint-disable react/no-unescaped-entities */
"use client";

import { Button } from '@/components/ui/button';
import Navbar from '@/components/User/MyPackage/Start/Navbar';
import React, { useState, useEffect } from 'react';
import { showAlert } from '@/lib/swalAlert';
import { mutate } from 'swr';
import LoadingPage from '@/components/ui/LoadingPage';
import Countdown from '@/components/User/MyPackage/Start/Countdown';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import Cookies from "js-cookie";
import { useAxiosPrivate } from '@/hooks/useAxiosPrivate';
import Loading from '@/components/ui/Loading';
import WarningIcon from '../../../../../../../public/assets/icons/WarningIcon';
import MessageIcon from '../../../../../../../public/assets/icons/MessageIcon';
import { useGetQuestionQuizId } from '@/services/api';

const QuizPage: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<Record<number, string | undefined>>({});
    const [loading, setLoading] = useState(false);
    const [loadingKirim, setLoadingKirim] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useRouter();
    const [rating, setRating] = useState<string>(""); // Menyimpan nilai rating
    const [feedbackText, setFeedbackText] = useState<string>(""); // Menyimpan nilai feedback

    // INTEGRASI API
    const id = Cookies.get("package");
    const { data, isLoading, error } = useGetQuestionQuizId(id as string);

    // Modal
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    // Open pop-up
    const handleOpenPopup = () => setIsPopupOpen(true);
    // Close pop-up
    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    // Lewatkan
    const [isPopupOpenLewatkan, setIsPopupOpenLewatkan] = useState(false);
    // Open pop-up
    const handleOpenPopupLewatkan = () => setIsPopupOpenLewatkan(true);
    // Close pop-up
    const handleClosePopupLewatkan = () => {
        setIsPopupOpenLewatkan(false);
    };

    // Simpan
    const [isPopupOpenSimpan, setIsPopupOpenSimpan] = useState(false);
    // Open pop-up
    const handleOpenPopupSimpan = () => setIsPopupOpenSimpan(true);
    // Close pop-up
    const handleClosePopupSimpan = () => {
        setIsPopupOpenSimpan(false);
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
                "Gagal menyelesaikan tryout!";
            showAlert("error", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleEndTime = async () => {
        try {
            setLoadingKirim(true);
            showAlert("success", "Jawaban berhasil dikirim!");
            if (data?.data?.attempt === 1) {
                handleOpenPopupFeedback();
            } else {
                navigate.push("/my-package/history");
            }
            await axiosPrivate.post(`/user/end/time/tryout/${id}`,);
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.data?.[0]?.message ||
                error?.response?.data?.message ||
                "Gagal mengakhiri tryout!";
            showAlert("error", errorMessage);

        } finally {
            setLoadingKirim(false);
        }

    };

    useEffect(() => {
        const initialSelectedOptions = data?.data.Question_forms?.reduce((acc, question) => {
            acc[question.id] = question.answer || "";
            return acc;
        }, {} as Record<number, string | undefined>) || {}; // Ensure default empty object

        setSelectedOptions(initialSelectedOptions);
    }, [data]);

    if (isLoading) return <LoadingPage />;
    if (!data?.data) return <p>Data tidak tersedia</p>;

    const currentQuestion = data?.data?.Question_forms[currentQuestionIndex];

    const handleOptionSelect = (optionId: string) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [currentQuestion.id]: optionId,
        }));
    };

    const handlePreviousQuestion = () => {
        const currentAnswer = selectedOptions[currentQuestion?.id ?? 0];
        const savedAnswer = currentQuestion?.answer;

        if (currentAnswer && currentAnswer !== savedAnswer) {
            handleOpenPopupLewatkan();
            return;
        }
        setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleNextQuestion = () => {
        const currentAnswer = selectedOptions[currentQuestion?.id ?? 0];
        const savedAnswer = currentQuestion?.answer;

        if (currentAnswer && currentAnswer !== savedAnswer) {
            handleOpenPopupLewatkan();
            return;
        }

        setCurrentQuestionIndex((prev) => Math.min(prev + 1, data.data.Question_forms.length - 1));
    };

    const handleSaveAndContinue = async () => {
        const selectedAnswer = selectedOptions[currentQuestion.id];

        if (selectedAnswer) {
            const requestData = {
                datainput: [
                    {
                        questionform_id: currentQuestion.id,
                        data: Number(selectedAnswer),
                    },
                ],
            };

            try {
                setLoading(true);
                await axiosPrivate.post(`/user/input/answer/create/${data.data.id}`, requestData);
                setCurrentQuestionIndex((prev) => Math.min(prev + 1, data.data.Question_forms.length - 1));
            } catch (error: any) {
                const errorMessage =
                    error?.response?.data?.data?.[0]?.message ||
                    error?.response?.data?.message ||
                    "Gagal menyimpan jawaban!";
                showAlert("error", errorMessage);
            } finally {
                setLoading(false);
            }

            mutate(`/user/question/form/${data.data.id}`);
        } else {
            handleOpenPopupSimpan();
        }
    };

    if (!currentQuestion) return null;

    return (
        <div className="min-h-screen">
            <Navbar />
            <header className="text-white container mx-auto pt-[100px] flex md:flex-row flex-col justify-between md:items-center">
                <div className="text-primary">
                    <h1 className="md:text-xl text-base font-semibold">{data.data.title}</h1>
                </div>
                <div className="flex justify-end md:justify-start">
                    <Countdown end_time={data.data.end_time ?? "-"} />
                </div>
            </header>

            <div className="flex md:flex-row flex-col mt-4 container mx-auto">
                <div className="w-full order-2 md:order-1 md:w-3/4 md:px-4 md:ml-4 rounded mt-5 md:mt-0">
                    <h2 className="text-primary md:text-xl text-base font-medium mb-5 md:mb-7">
                        {currentQuestion?.type_question_name}
                    </h2>
                    <h2 className="text-primary md:text-lg text-base font-semibold mb-2">
                        Soal No {currentQuestionIndex + 1}
                    </h2>
                    <p
                        className="mb-4 md:text-base text-sm"
                        dangerouslySetInnerHTML={{ __html: currentQuestion.field }}
                    ></p>
                    <div className="space-y-1 md:space-y-2 md:text-base text-sm">
                        {currentQuestion.datajson.map((option, index) => {
                            const optionLabel = String.fromCharCode(65 + index); // 'A', 'B', 'C', dll
                            return (
                                <label key={option.id} className="flex items-center space-x-2 p-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name={`question-${currentQuestion.id}`}
                                        checked={selectedOptions[currentQuestion.id] === String(option.id)} // Memastikan jawaban yang benar tercentang
                                        onChange={() => handleOptionSelect(String(option.id))} // Pilih ID opsi
                                        className="h-5 w-5 text-purple-600 focus:ring-purple-500 cursor-pointer"
                                    />
                                    <span>{optionLabel}. {option.key}</span>
                                </label>
                            );
                        })}
                    </div>
                    <div className="mt-8 hidden md:flex justify-center gap-3 md:gap-7">
                        <Button
                            onClick={handlePreviousQuestion}
                            variant="outlinePrimary"
                            className="md:w-[180px]"
                            disabled={currentQuestionIndex === 0}
                        >
                            Sebelumnya
                        </Button>
                        <Button className="md:w-[250px] w-full" onClick={handleSaveAndContinue}>
                            {loading ? <Loading /> : "Simpan dan Lanjutkan"}
                        </Button>
                        <Button
                            onClick={handleNextQuestion}
                            variant="outlinePrimary"
                            className="px-10 md:w-[180px] w-full"
                            disabled={currentQuestionIndex === data.data.Question_forms.length - 1}
                        >
                            Lewatkan
                        </Button>
                    </div>
                    {/* mobile */}
                    <div className="mt-8 md:hidden flex flex-col justify-center gap-3 md:gap-7">
                        <Button className="md:w-[250px] w-full" onClick={handleSaveAndContinue}>
                            {loading ? <Loading /> : "Simpan dan Lanjutkan"}
                        </Button>
                        <div className="flex gap-3">
                            <Button onClick={handlePreviousQuestion} variant="outlinePrimary" className="w-full">
                                Sebelumnya
                            </Button>
                            <Button onClick={handleNextQuestion} variant="outlinePrimary" className="px-10 w-full">
                                Lewatkan
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="w-full order-1 md:order-2 md:w-1/4 rounded">
                    <div className="flex justify-between">
                        <h2 className="text-base md:text-lg font-semibold mb-4">Nomor Soal</h2>
                        <h2 className="text-base md:text-lg mb-4">
                            {currentQuestionIndex + 1}/{data.data.Question_forms.length}
                        </h2>
                    </div>
                    <div className="grid grid-cols-8 gap-2 md:text-base text-xs">
                        {data.data.Question_forms.map((_, index) => {
                            const isAnswered = selectedOptions[data.data.Question_forms[index].id] ? true : false;

                            return (
                                <button
                                    key={index}
                                    className={`p-1.5 rounded ${isAnswered ? 'bg-succes text-white' : 'bg-error text-white'} ${currentQuestionIndex === index ? 'border-2 border-primary' : ''}`}
                                    onClick={() => setCurrentQuestionIndex(index)}
                                >
                                    {index + 1}
                                </button>
                            );
                        })}
                    </div>
                    <div className="flex justify-between md:mt-10 mt-5 md:text-base text-xs">
                        <div className="bg-succes rounded-full flex flex-col items-center p-2 px-6 text-white">
                            <div className="">{data.data.status.total_filled}</div>
                            <div className="">Sudah Terisi</div>
                        </div>
                        <div className="bg-error rounded-full flex flex-col items-center p-2 px-6 text-white">
                            <div className="">{data.data.status.total_unfilled}</div>
                            <div className="">Belum Terisi</div>
                        </div>
                    </div>
                    <Button
                        className="bg-succes w-full mt-5 hover:bg-succes/80"
                        onClick={handleOpenPopup}
                    >Selesai</Button>
                </div>
            </div>
            {/*  */}
            {/* pop up modal */}
            {isPopupOpen && (
                <div onClick={handleClosePopup} className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div
                        onClick={(e) => e.stopPropagation()} // Prevents click from closing pop-up when interacting inside
                        className="bg-white rounded-lg relative w-[600px] md:mx-0 mx-4"
                    >
                        <div className="px-7 flex justify-between border-b border-slate-300 p-4">
                            <div className="text-primary font-medium">PERHATIAN</div>
                            <button onClick={handleClosePopup} className="flex justify-center items-center text-white w-6 h-6 rounded-full bg-primary">x</button>
                        </div>
                        <div className="flex px-7 gap-4 items-center border-b border-slate-300 p-4">
                            <div className="left">
                                <WarningIcon />
                            </div>
                            <div className="right">
                                <div className="text-primary font-semibold mb-2">
                                    Apakah Anda ingin mengakhiri simulasi ujian ini?
                                </div>
                                <div className="text-justify text-sm">
                                    Jika "Ya" maka Anda sudah dinyatakan selesai mengikuti simulasi ujian, dan Anda tidak bisa memperbaiki lembar kerja Anda. Jika "Tidak" maka anda akan kembali ke lembar kerja dan silahkan untuk melanjutkan menjawab atau memperbaiki jawaban anda.
                                </div>
                            </div>
                        </div>
                        {/* button */}
                        <div className="p-4 px-7 flex gap-3 justify-end">
                            <Button
                                onClick={handleClosePopup}
                                variant="outlinePrimary"
                                className='w-[130px]'
                            >
                                Tidak
                            </Button>
                            <Button
                                onClick={handleEndTime}
                                className='w-[130px]'
                            >
                                {loadingKirim ? <Loading /> : "Iya"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {/* pop up modal */}
            {/* Lewatkan Modal */}
            {isPopupOpenLewatkan && (
                <div onClick={handleClosePopupLewatkan} className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div
                        onClick={(e) => e.stopPropagation()} // Prevents click from closing pop-up when interacting inside
                        className="bg-white rounded-lg relative w-[600px] md:mx-0 mx-4"
                    >
                        <div className="px-7 flex justify-between border-b border-slate-300 p-4">
                            <div className="text-primary font-medium">PERHATIAN</div>
                            <button onClick={handleClosePopupLewatkan} className="flex justify-center items-center text-white w-6 h-6 rounded-full bg-primary">x</button>
                        </div>
                        <div className="flex px-7 gap-4 items-center border-b border-slate-300 p-4">
                            <div className="left">
                                <WarningIcon />
                            </div>
                            <div className="right">
                                <div className="text-primary font-semibold md:text-xl mb-2">
                                    Simpan Jawaban Terlebih Dahulu!
                                </div>
                            </div>
                        </div>
                        {/* button */}
                        <div className="p-4 px-7 flex gap-3 justify-end">
                            <Button
                                onClick={handleClosePopupLewatkan}
                                // variant="outlinePrimary"
                                className='w-[130px]'
                            >
                                Tutup
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {/* Simpan Modal */}
            {isPopupOpenSimpan && (
                <div onClick={handleClosePopupSimpan} className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div
                        onClick={(e) => e.stopPropagation()} // Prevents click from closing pop-up when interacting inside
                        className="bg-white rounded-lg relative w-[600px] md:mx-0 mx-4"
                    >
                        <div className="px-7 flex justify-between border-b border-slate-300 p-4">
                            <div className="text-primary font-medium">PERHATIAN</div>
                            <button onClick={handleClosePopupSimpan} className="flex justify-center items-center text-white w-6 h-6 rounded-full bg-primary">x</button>
                        </div>
                        <div className="flex px-7 gap-4 items-center border-b border-slate-300 p-4">
                            <div className="left">
                                <WarningIcon />
                            </div>
                            <div className="right">
                                <div className="text-primary font-semibold md:text-xl mb-2">
                                    Harap pilih jawaban terlebih dahulu!
                                </div>
                            </div>
                        </div>
                        {/* button */}
                        <div className="p-4 px-7 flex gap-3 justify-end">
                            <Button
                                onClick={handleClosePopupSimpan}
                                // variant="outlinePrimary"
                                className='w-[130px]'
                            >
                                Tutup
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

export default QuizPage;
