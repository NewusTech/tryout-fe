"use client";

import React from "react";
import TitleBack from "@/components/Superadmin/TitleBack";
import LinkCustom from "@/components/ui/LinkCustom";
import { useParams } from "next/navigation";
import { useGetBankSoalDetailId } from "@/services/api";
import LoadingPage from "@/components/ui/LoadingPage";

const DetailQuestion = () => {
    const { id } = useParams();

    // Fetch data using the API hook
    const { data, isLoading, error } = useGetBankSoalDetailId(id as string);

    if (isLoading) {
        return <div><LoadingPage /></div>; // Display loading indicator
    }
    return (
        <div className="">
            <TitleBack href="/question-bank/question-answer" title="Detail Bank Soal" />

            {/* Edit Link */}
            {/* <div className="flex justify-end">
                <LinkCustom className="text-white" href="/question-bank/question-answer/edit">
                    Edit Bank Soal
                </LinkCustom>
            </div> */}

            {/* Informasi Bank Soal */}
            <div className="shadow-md mt-6 text-primary flex flex-col gap-5 rounded-xl bg-[#FAFAFA] border border-gray-100 p-6">
                <div>
                    <div className="text-lg font-medium mb-2 text-primary">Nama Bank Soal</div>
                    <div className="border-b border-primary text-primary pb-2">
                        {data?.data?.title ?? "-"}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="font-medium text-primary">Kategori Soal</div>
                    <div className="w-1/2">
                        <div className="w-full px-5 text-primary border border-primary p-2.5 bg-[#FAFAFA] rounded-full">
                            {data?.data?.Type_question?.name ?? "-"}
                        </div>
                    </div>
                </div>
            </div>

            {/* Daftar Soal */}
            <div className="wrap flex mt-6 flex-col gap-4">
                {data?.data?.Question_forms?.map((item, index) => (
                    <div
                        key={item.id}
                        className="shadow-md text-primary flex flex-col gap-3 rounded-xl bg-[#FAFAFA] border border-gray-100 p-6"
                    >
                        <div className="text-primary font-medium text-lg">Soal {index + 1}</div>
                        <div className="text-primary" dangerouslySetInnerHTML={{ __html: item?.field ?? "-" }} />

                        {/* Opsi Jawaban */}
                        <div className="flex flex-col gap-2">
                            {item?.datajson.map((jawaban, i) => (
                                <div key={i} className="text-primary">
                                    {String.fromCharCode(65 + i)}. {jawaban?.key}
                                </div>
                            ))}
                        </div>

                        {/* Jawaban Benar */}
                        <div className="flex flex-col gap-2">
                            <div className="font-medium text-primary">Jawaban Dari Pertanyaan</div>
                            <div className="text-primary">
                                {item.correct_answer > 0 && item.correct_answer <= item.datajson.length
                                    ? `${String.fromCharCode(65 + (item.correct_answer - 1))}. ${item.datajson[item.correct_answer - 1]?.key}`
                                    : "Data jawaban tidak valid"}
                            </div>
                        </div>

                        {/* Pembahasan */}
                        <div className="flex flex-col gap-2">
                            <div className="font-medium text-primary mb-2">Pembahasan</div>
                            <div className="text-primary" dangerouslySetInnerHTML={{ __html: item.discussion }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DetailQuestion;
