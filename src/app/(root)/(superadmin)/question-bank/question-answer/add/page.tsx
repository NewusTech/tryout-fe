"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import ElipseIcon from "../../../../../../../public/assets/icons/ElipseIcon";
import { CustomSelect } from "@/components/Custom/SelectCustom";
import "react-quill/dist/quill.snow.css";
import DeleteIcon from "../../../../../../../public/assets/icons/DeleteIcon";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AddQuestion = () => {
    const [title, setTitle] = useState<string>(""); // Nama Bank Soal
    const [questions, setQuestions] = useState<
        {
            id: number;
            question: string;
            discussion: string;
            answers: { id: number; key: string; point?: number }[];
            correctAnswer: number | null;
        }[]
    >([]);
    const [selectedValue, setSelectedValue] = useState<number | null>(1); // kategori soal
    const [isLoaded, setIsLoaded] = useState(false); // Tambahkan state untuk memantau apakah data sudah dimuat

    const LOCAL_STORAGE_KEY = "bankSoalData";

    // Muat data dari localStorage saat halaman pertama kali dimuat
    useEffect(() => {
        const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                if (parsedData && typeof parsedData === "object") {
                    setTitle(parsedData.title || "");
                    setQuestions(Array.isArray(parsedData.questions) ? parsedData.questions : []);
                    setSelectedValue(parsedData.selectedValue || null);
                }
            } catch (error) {
                console.error("Failed to parse localStorage data:", error);
            }
        }
        setIsLoaded(true); // Tandai data sudah dimuat
    }, []);

    // Simpan data ke localStorage setiap kali ada perubahan pada `title`, `questions`, atau `selectedValue`
    useEffect(() => {
        if (isLoaded) {
            const dataToSave = {
                title,
                questions,
                selectedValue,
            };
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
        }
    }, [title, questions, selectedValue, isLoaded]);

    const statusOptions = [
        { label: "TIU", value: 1 },
        { label: "TWK", value: 2 },
        { label: "TKP", value: 3 },
    ];

    const pointOptions = [
        { label: "Point 5", value: 5 },
        { label: "Point 4", value: 4 },
        { label: "Point 3", value: 3 },
        { label: "Point 2", value: 2 },
        { label: "Point 1", value: 1 },
    ];

    const addNewQuestion = () => {
        const newQuestion = {
            id: questions.length + 1,
            question: "",
            discussion: "",
            answers: [],
            correctAnswer: null,
        };
        setQuestions((prev) => [...prev, newQuestion]);
    };

    const deleteQuestion = (id: number) => {
        setQuestions((prev) => prev.filter((q) => q.id !== id));
    };

    const updateQuestion = (
        id: number,
        field: "question" | "discussion" | "correctAnswer",
        value: string | number | null
    ) => {
        setQuestions((prev) =>
            prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
        );
    };

    const addAnswer = (questionId: number) => {
        setQuestions((prev) =>
            prev.map((q) =>
                q.id === questionId
                    ? {
                        ...q,
                        answers: [
                            ...q.answers,
                            { id: q.answers.length + 1, key: "", point: undefined },
                        ],
                    }
                    : q
            )
        );
    };

    const updateAnswer = (
        questionId: number,
        answerId: number,
        field: "key" | "point",
        value: string | number
    ) => {
        setQuestions((prev) =>
            prev.map((q) =>
                q.id === questionId
                    ? {
                        ...q,
                        answers: q.answers.map((a) =>
                            a.id === answerId ? { ...a, [field]: value } : a
                        ),
                    }
                    : q
            )
        );
    };

    const deleteAnswer = (questionId: number, answerId: number) => {
        setQuestions((prev) =>
            prev.map((q) =>
                q.id === questionId
                    ? {
                        ...q,
                        answers: q.answers.filter((a) => a.id !== answerId),
                        correctAnswer:
                            q.correctAnswer === answerId ? null : q.correctAnswer,
                    }
                    : q
            )
        );
    };

    const saveBankSoal = () => {
        if (!title || !selectedValue || questions.some((q) => !q.question)) {
            alert("Harap isi semua field yang wajib!");
            return;
        }

        const formattedData = {
            banksoal: {
                title,
                typequestion_id: selectedValue,
            },
            questions: questions.map((q) => ({
                field: q.question,
                tipedata: "radio",
                correct_answer:
                    selectedValue === 3
                        ? q.answers.map(({ id, point, key }) => ({ id, point, key }))
                        : q.correctAnswer,
                discussion: q.discussion,
                datajson: q.answers.map(({ id, key }) => ({ id, key })),
            })),
        };

        console.log("Saved Bank Soal:", formattedData);
        // Replace this with an API call
    };

    return (
        <div className="form flex flex-col gap-5">
            {/* Pilih Kategori Soal */}
            <div className="shadow-md flex flex-col gap-5 rounded-xl bg-[#FAFAFA] border border-gray-100 p-6">
                <div className="flex flex-col gap-2">
                    <div className="font-medium">Nama Bank Soal</div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Nama Bank Soal"
                        className="bg-[#FAFAFA] pb-1 border-b border-gray-900 focus-visible:outline-none"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div className="font-medium">Pilih Kategori Soal</div>
                    <div className="w-1/2">
                        <CustomSelect
                            label="Paket Tryout"
                            options={statusOptions}
                            placeholder="Paket Tryout"
                            value={selectedValue?.toString() || ""}
                            onChange={(value) => setSelectedValue(Number(value))}
                            width="w-full border-primary"
                        />
                    </div>
                </div>
            </div>

            {/* Pertanyaan */}
            {questions.map((q, index) => (
                <div
                    key={q.id}
                    className="shadow-md flex flex-col gap-5 rounded-xl bg-[#FAFAFA] border border-gray-100 p-6"
                >
                    <div className="flex flex-col gap-2 mb-10">
                        <div className="font-medium">Pertanyaan {index + 1}</div>
                        <ReactQuill
                            value={q.question}
                            onChange={(value) => updateQuestion(q.id, "question", value)}
                            className="h-[250px]"
                        />
                    </div>

                    {/* Jawaban */}
                    {q.answers.map((answer) => (
                        <div key={answer.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3 w-full">
                                <ElipseIcon />
                                <input
                                    type="text"
                                    placeholder="Jawaban"
                                    className="bg-[#FAFAFA] pb-1 border-b border-gray-900/20 focus-visible:outline-none w-1/2"
                                    value={answer.key}
                                    onChange={(e) =>
                                        updateAnswer(q.id, answer.id, "key", e.target.value)
                                    }
                                />
                            </div>
                            {selectedValue === 3 && (
                                <div className="w-full">
                                    <CustomSelect
                                        label="Pilih Point"
                                        options={pointOptions}
                                        placeholder="Pilih Point"
                                        value={answer.point?.toString() || ""}
                                        onChange={(value) =>
                                            updateAnswer(
                                                q.id,
                                                answer.id,
                                                "point",
                                                parseInt(value as string)
                                            )
                                        }
                                        width="w-full border-primary"
                                    />
                                </div>
                            )}
                            <div className="cursor-pointer" onClick={() => deleteAnswer(q.id, answer.id)}>
                                <DeleteIcon />
                            </div>
                        </div>
                    ))}

                    {/* Tambah Jawaban */}
                    <div className="flex items-center justify-between ">
                        <div className="flex items-center gap-3 w-full">
                            <ElipseIcon />
                            <button
                                onClick={() => addAnswer(q.id)}
                                className="underline text-primary"
                            >
                                Tambah Jawaban
                            </button>
                        </div>
                    </div>

                    {/* Jawaban dari pertanyaan */}
                    {selectedValue !== 3 && (
                        <div className="flex items-center justify-between">
                            <div className="font-medium">Jawaban dari pertanyaan</div>
                            <div className="w-1/2">
                                <CustomSelect
                                    label="Pilih Jawaban"
                                    options={q.answers.map(({ id, key }) => ({
                                        label: key,
                                        value: id,
                                    }))}
                                    placeholder="Pilih Jawaban"
                                    value={q.correctAnswer?.toString() || ""}
                                    onChange={(value) =>
                                        updateQuestion(q.id, "correctAnswer", parseInt(value as string))
                                    }
                                    width="w-full border-primary"
                                />
                            </div>
                        </div>
                    )}

                    {/* Pembahasan */}
                    <div className="flex flex-col gap-2 mb-10">
                        <div className="font-medium">Pembahasan</div>
                        <ReactQuill
                            value={q.discussion}
                            onChange={(value) => updateQuestion(q.id, "discussion", value)}
                            className="h-[250px]"
                        />
                    </div>

                    {/* Hapus Pertanyaan */}
                    <div className="cursor-pointer flex justify-end" onClick={() => deleteQuestion(q.id)}>
                        <DeleteIcon />
                    </div>
                </div>
            ))}
            <div className="">
                <Button onClick={addNewQuestion}>Tambah Pertanyaan</Button>
            </div>
            <Button className="bg-secondary hover:bg-secondary-hover" onClick={saveBankSoal}>Simpan Bank Soal</Button>
        </div>
    );
};

export default AddQuestion;
