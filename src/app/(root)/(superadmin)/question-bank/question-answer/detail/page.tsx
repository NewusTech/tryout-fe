"use client";

import React from "react";
import TitleBack from "@/components/Superadmin/TitleBack";
import LinkCustom from "@/components/ui/LinkCustom";

// Dummy data soal
const dummyQuestion = {
    namaBankSoal: "Tryout 1 TIU",
    kategoriSoal: "TIU",
    soal: [
        {
            id: 1,
            pertanyaan:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dolor beatae enim quis corrupti modi explicabo?",
            jawaban: ["Jawaban 1", "Jawaban 2", "Jawaban 3"], // Jawaban array biasa
            jawabanBenar: 1, // Index jawaban benar (0 = A, 1 = B, 2 = C)
            pembahasan:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores at obcaecati optio nobis eius in ducimus accusamus.",
        },
        {
            id: 2,
            pertanyaan:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dolor beatae enim quis corrupti modi explicabo?",
            jawaban: ["Jawaban 1", "Jawaban 2", "Jawaban 3"], // Jawaban array biasa
            jawabanBenar: 1, // Index jawaban benar (0 = A, 1 = B, 2 = C)
            pembahasan:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores at obcaecati optio nobis eius in ducimus accusamus.",
        },
    ],
};

const DetailQuestion = () => {
    return (
        <div className="">
            <TitleBack href="/question-bank/question-answer" title="Detail Bank Soal" />
            {/* Detail Header */}
            <div className="flex justify-end">
                <LinkCustom
                    className="text-white"
                    href="/question-bank/question-answer/edit">
                    Edit Bank Soal
                </LinkCustom>
            </div>

            {/* Informasi Bank Soal */}
            <div className="shadow-md mt-6 text-pirmary flex flex-col gap-5 rounded-xl bg-[#FAFAFA] border border-gray-100 p-6">
                <div>
                    <div className="text-lg font-medium mb-2 text-primary">
                        Nama Bank Soal
                    </div>
                    <div className="border-b border-primary text-primary pb-2">
                        {dummyQuestion.namaBankSoal}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="font-medium text-primary">Kategori Soal</div>
                    <div className="w-1/2">
                        <div className="w-full px-5 text-primary border border-primary p-2.5 bg-[#FAFAFA] rounded-full">
                            {dummyQuestion.kategoriSoal}
                        </div>
                    </div>
                </div>
            </div>

            {/* Daftar Soal */}
            <div className="wrap flex mt-6 flex-col gap-4">
                {dummyQuestion.soal.map((item, index) => (
                    <div
                        key={item.id}
                        className="shadow-md text-pirmary flex flex-col gap-3 rounded-xl bg-[#FAFAFA] border border-gray-100 p-6">
                        <div className="text-primary font-medium text-lg">
                            Soal {index + 1}
                        </div>
                        <div className="text-primary">{item.pertanyaan}</div>
                        {/* Opsi Jawaban */}
                        <div className="flex flex-col gap-2">
                            {item.jawaban.map((jawaban, i) => (
                                <div key={i} className="text-primary">
                                    {String.fromCharCode(65 + i)}. {jawaban}
                                </div>
                            ))}
                        </div>
                        {/* Jawaban Benar */}
                        <div className="flex flex-col gap-2">
                            <div className="font-medium text-primary">
                                Jawaban Dari Pertanyaan
                            </div>
                            <div className="text-primary">
                                {String.fromCharCode(65 + item.jawabanBenar)}.{" "}
                                {item.jawaban[item.jawabanBenar]}
                            </div>
                        </div>
                        {/* Pembahasan */}
                        <div className="flex flex-col gap-2">
                            <div className="font-medium text-primary mb-2">
                                Pembahasan
                            </div>
                            <div className="text-primary">{item.pembahasan}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DetailQuestion;
