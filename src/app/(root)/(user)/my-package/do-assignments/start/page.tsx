/* eslint-disable react/no-unescaped-entities */
"use client"
import { Button } from '@/components/ui/button';
import Navbar from '@/components/User/MyPackage/Start/Navbar';
import React, { useState, useEffect } from 'react';
import WarningIcon from '../../../../../../../public/assets/icons/WarningIcon';

type Question = {
    id: number;
    questionText: string;
    options: { text: string }[]; // Pilihan jawaban
    selectedOption: string | undefined;
};

const QuizPage: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Data quiz dummy
    const quizData = {
        title: "Tryout 1",
        subject: "Pengetahuan Umum",
        totalQuestions: 5,
        timer: {
            hours: 0,
            minutes: 30,
            seconds: 0,
        },
        questions: [
            {
                id: 1,
                questionText: "Siapa penemu lampu pijar?",
                options: [
                    { text: "Thomas Edison" },
                    { text: "Nikola Tesla" },
                    { text: "Alexander Graham Bell" },
                    { text: "Albert Einstein" },
                ],
                selectedOption: 'A', // opsi yang dipilih
            },
            {
                id: 2,
                questionText: "Apa ibu kota Indonesia?",
                options: [
                    { text: "Jakarta" },
                    { text: "Bali" },
                    { text: "Bandung" },
                    { text: "Surabaya" },
                ],
                selectedOption: 'A', // opsi yang dipilih
            },
            {
                id: 3,
                questionText: "Berapa jumlah planet di sistem tata surya?",
                options: [
                    { text: "7" },
                    { text: "8" },
                    { text: "9" },
                    { text: "10" },
                ],
                selectedOption: 'B', // opsi yang dipilih
            },
            {
                id: 4,
                questionText: "Siapa yang menulis buku 'Harry Potter'?",
                options: [
                    { text: "J.R.R. Tolkien" },
                    { text: "J.K. Rowling" },
                    { text: "George R.R. Martin" },
                    { text: "Suzanne Collins" },
                ],
                selectedOption: undefined, // belum ada pilihan
            },
            {
                id: 5,
                questionText: "Apa nama planet terbesar di tata surya?",
                options: [
                    { text: "Jupiter" },
                    { text: "Saturnus" },
                    { text: "Mars" },
                    { text: "Venus" },
                ],
                selectedOption: undefined, // belum ada pilihan
            },
        ],
    };

    // 
    const [isPopupOpen, setIsPopupOpen] = useState(false);


    // Inisialisasi state untuk menyimpan pilihan jawaban
    const [selectedOptions, setSelectedOptions] = useState<Record<number, string | undefined>>({});

    // Inisialisasi selectedOptions saat pertama kali render
    useEffect(() => {
        const initialSelectedOptions = quizData.questions.reduce((acc, question) => {
            acc[question.id] = question.selectedOption;
            return acc;
        }, {} as Record<number, string | undefined>);

        setSelectedOptions(initialSelectedOptions);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const currentQuestion = quizData.questions[currentQuestionIndex];

    // Fungsi untuk menangani pemilihan opsi
    const handleOptionSelect = (optionLabel: string) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [currentQuestion.id]: optionLabel,
        }));
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prev) => Math.min(prev + 1, quizData.totalQuestions - 1));
    };

    // Fungsi untuk menyimpan dan melanjutkan ke soal berikutnya
    const handleSaveAndContinue = async () => {
        // Simulasikan pengiriman data ke API
        const selectedAnswer = selectedOptions[currentQuestion.id];

        if (selectedAnswer) {
            // Kirim data ke API
            try {
                // const response = await fetch('/api/update-question', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({
                //         questionId: currentQuestion.id,
                //         selectedOption: selectedAnswer,
                //     }),
                // });

                // if (!response.ok) {
                //     throw new Error('Failed to save answer');
                // }

                console.log('Jawaban = ', selectedAnswer, "id soal = ", currentQuestion.id);

                // Pindah ke soal berikutnya setelah menyimpan jawaban
                setCurrentQuestionIndex((prev) => Math.min(prev + 1, quizData.totalQuestions - 1));
            } catch (error) {
                console.error('Error saving answer:', error);
            }
        } else {
            alert('Harap pilih jawaban terlebih dahulu!');
        }
    };

    // pop up
    // Open pop-up
    const handleOpenPopup = () => setIsPopupOpen(true);

    // Close pop-up
    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };
    // pop up

    // Pastikan currentQuestion terdefinisi sebelum rendering
    if (!currentQuestion) return null;

    return (
        <div className="min-h-screen">
            <Navbar />
            {/* Header */}
            <header className="text-white container mx-auto pt-[100px] p-4 flex justify-between items-center">
                <div className='text-primary'>
                    <h1 className="text-xl font-semibold">{quizData.title}</h1>
                    <p>{quizData.subject}</p>
                </div>
                <div className="flex gap-10 bg-primary rounded-xl p-3 text-sm">
                    <div className="flex flex-col items-center">
                        <div className="">
                            {quizData.timer.hours}
                        </div>
                        <div className="">
                            Jam
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="">
                            {quizData.timer.minutes}
                        </div>
                        <div className="">
                            Menit
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="">
                            {quizData.timer.seconds}
                        </div>
                        <div className="">
                            Detik
                        </div>
                    </div>
                </div>
            </header>

            {/* Konten */}
            <div className="flex mt-4 container mx-auto">
                {/* Sidebar dengan nomor soal */}
                <div className="w-1/4 rounded">
                    <div className="flex justify-between">
                        <h2 className="text-lg font-semibold mb-4">Nomor Soal</h2>
                        <h2 className="text-lg mb-4">1/70</h2>
                    </div>
                    <div className="grid grid-cols-8 gap-2">
                        {quizData.questions.map((question) => (
                            <button
                                key={question.id}
                                className={`p-1.5 rounded ${selectedOptions[question.id] ? 'bg-succes text-white' : 'bg-error text-white'} 
                                ${currentQuestion.id === question.id ? 'border-2 border-primary' : ''}`}
                                onClick={() => setCurrentQuestionIndex(question.id - 1)}
                            >
                                {question.id}
                            </button>
                        ))}
                    </div>
                    {/*  */}
                    <div className="flex justify-between mt-10">
                        <div className="bg-succes rounded-full flex flex-col items-center p-2 px-6 text-white">
                            <div className="">20</div>
                            <div className="">Sudah Terisi</div>
                        </div>
                        <div className="bg-error rounded-full flex flex-col items-center p-2 px-6 text-white">
                            <div className="">30</div>
                            <div className="">Belum Terisi</div>
                        </div>
                    </div>
                    <Button
                        onClick={handleOpenPopup}
                        className='bg-succes w-full mt-5 hover:bg-succes/80'
                    >
                        Selesai
                    </Button>
                </div>

                {/* Soal dan Pilihan */}
                <div className="w-3/4 p-4 ml-4 rounded">
                    <h2 className="text-primary text-xl font-medium mb-7">Tes Wawasan Kebangsaan - TWK</h2>
                    <h2 className="text-primary text-lg font-semibold mb-2">Soal No {currentQuestion.id}</h2>
                    <p className="mb-4">{currentQuestion.questionText}</p>
                    <div className="space-y-2">
                        {currentQuestion.options.map((option, index) => {
                            const optionLabel = String.fromCharCode(65 + index); // Menghasilkan 'A', 'B', 'C', dll
                            return (
                                <label key={optionLabel} className="flex items-center space-x-2 p-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name={`question-${currentQuestion.id}`}
                                        checked={selectedOptions[currentQuestion.id] === optionLabel}
                                        onChange={() => handleOptionSelect(optionLabel)}
                                        className="h-5 w-5 text-purple-600 focus:ring-purple-500"
                                    />
                                    <span>{optionLabel}. {option.text}</span>
                                </label>
                            );
                        })}
                    </div>

                    {/* Tombol Navigasi */}
                    <div className="mt-4 flex justify-center gap-7">
                        {/* <button
                            onClick={handlePreviousQuestion}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        >
                            Previous
                        </button> */}
                        <Button
                            onClick={handleSaveAndContinue}
                        >
                            Simpan dan Lanjutkan
                        </Button>
                        <Button
                            onClick={handleNextQuestion}
                            variant="outlinePrimary"
                            className='px-10'
                        >
                            Lewatkan
                        </Button>
                    </div>
                </div>
            </div>

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
                                className='w-[130px]'
                            >
                                Iya
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {/* pop up modal */}
        </div>
    );
};

export default QuizPage;
