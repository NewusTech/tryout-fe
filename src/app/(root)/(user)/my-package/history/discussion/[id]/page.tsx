"use client";
import Navbar from "@/components/User/Home/Navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ArrowBread from "../../../../../../../../public/assets/icons/ArrowBread";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useGetDiscussionUserId } from "@/services/api";
import LoadingPage from "@/components/ui/LoadingPage";

const PembahasanPage: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetDiscussionUserId(id as string);

  const [currentNomor, setCurrentNomor] = useState(1);
  const [soalData, setSoalData] = useState<
    {
      nomor: number;
      pertanyaan: string;
      pilihanJawaban: string[];
      jawabanKamu: string;
      kunciJawaban: string;
      namaTipe : string;
      tipePertanyaan: number;
      nilai: number;
      pembahasan: string;
    }[]
  >([]);

  // Proses data dari API saat berhasil di-load
  useEffect(() => {
    if (data) {
      const formattedData = data.data.Question_forms.map(
        (question: any, index: number) => ({
          nomor: index + 1,
          pertanyaan: question.field, // Menghapus tag HTML dari soal
          pilihanJawaban: question.datajson.map((item: any) => item.key),
          jawabanKamu: question.answer,
          tipePertanyaan: question.type_question_id,
          namaTipe: question.type_question_name,
          kunciJawaban:
            question.type_question_id === 3 ? undefined : question.correct_answer.toString(), // Tidak menampilkan kunci untuk tipe ID 3
          nilai: question.isCorrect ? question.points : 0,
          pembahasan: question.discussion.replace(/<\/?[^>]+(>|$)/g, ""), // Menghapus tag HTML dari pembahasan
        })
      );
      setSoalData(formattedData);
    }
  }, [data]);

  const handleQuestionClick = (nomor: number) => {
    setCurrentNomor(nomor);
  };

  const handlePrevious = () => {
    setCurrentNomor((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentNomor((prev) => Math.min(prev + 1, soalData.length));
  };

  // Mendapatkan soal berdasarkan nomor yang dipilih
  const soal = soalData.find((item) => item.nomor === currentNomor);

  if (isLoading) return <div><LoadingPage /></div>;
  if (error) return <div>Error loading data.</div>;
  if (!soal) return null;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Navbar />
      {/* Header */}
      {/* Main Content */}
      {/* Breadcrumb */}
      <div className="bread md:text-base text-sm flex text-primary gap-3 items-center md:pt-[120px] pt-[100px] container mx-auto">
        <Link href="/my-package">Paket Saya</Link>
        <ArrowBread />
        <Link href="/my-package/history">Riwayat</Link>
        <ArrowBread />
        <div className="font-medium">Pembahasan</div>
      </div>
      {/* Breadcrumb */}
      <main className="py-4 grid md:grid-cols-12 container mx-auto">
        {/* Soal Section */}
        <div className="md:col-span-9 order-2 md:order-1 flex flex-col md:gap-4 gap-3  md:pr-10">
          <h1 className="md:text-2xl text-lg text-primary font-medium">{soal.namaTipe}</h1>
          <h1 className="md:text-2xl text-lg text-primary font-medium">Soal No {soal.nomor}</h1>
          <div className="md:text-base text-xs" dangerouslySetInnerHTML={{ __html: soal.pertanyaan ?? "-" }} />
          <div className="space-y-2 md:text-base text-xs">
            {soal.pilihanJawaban.map((jawaban, index) => {
              const label = String.fromCharCode(65 + index); // A, B, C, D
              return (
                <div key={index} className="flex items-center">
                  <span
                    className={`mr-2 ${Number(soal.jawabanKamu) === index + 1 ? "text-primary font-medium" : ""
                      } ${Number(soal.kunciJawaban) === index + 1 ? "text-succes font-medium" : ""
                      }`}
                  >
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <p
                    className={`${Number(soal.jawabanKamu) === index + 1 ? "text-primary font-medium" : ""
                      } ${Number(soal.kunciJawaban) === index + 1 ? "text-succes font-medium" : ""
                      }`}
                  >
                    {jawaban}
                  </p>
                </div>

              );
            })}
          </div>
          {/* jawaban kamu */}
          <div className="my-6 flex flex-col gap-2  md:text-base text-xs">
            <p
              className={`font-medium ${soal.jawabanKamu
                ? "text-primary font-medium" // Warna ungu jika ada jawaban kamu
                : ""
                }`}
            >
              <span className="font-medium">Jawaban Kamu:</span>{" "}
              {soal.jawabanKamu
                ? String.fromCharCode(65 + (parseInt(soal.jawabanKamu) - 1)) // Konversi angka ke huruf
                : "Belum Dijawab"}
            </p>
            {/* {soal?.} */}
            {soal.tipePertanyaan !== 3 && (
              <p
                className={`font-medium ${soal.kunciJawaban === soal.jawabanKamu ? "text-success font-medium" : ""
                  }`}
              >
                <span className="font-medium text-succes">Kunci Jawaban:</span>{" "}
                <span className="font-medium text-succes">
                  {soal.kunciJawaban
                    ? String.fromCharCode(65 + (parseInt(soal.kunciJawaban) - 1)) // Konversi angka ke huruf
                    : ""}
                </span>
              </p>
            )}


            <p className="font-medium text-secondary">
              <span className="font-medium">Nilai:</span> {soal.nilai}
            </p>
          </div>

          <div>
            <h2 className="font-medium md:text-2xl text-lg md:mb-4 mb-2">Pembahasan</h2>
            <p className="text-justify md:text-base text-xs">{soal.pembahasan}</p>
          </div>
          {/* Navigation */}
          <div className="flex md:gap-5 gap-3 justify-center mt-8">
            <Button
              className="w-full md:w-fit"
              variant="outlinePrimary"
              onClick={handlePrevious}
            >
              Sebelumnya
            </Button>
            <Button
              className="w-full md:w-fit"
              onClick={handleNext}
            >
              Selanjutnya
            </Button>
          </div>
        </div>
        {/* Sidebar */}
        <aside className="mb-4 md:mb-0 order-1 md:order-2 md:col-span-3 ">
          <div className="grid text-sm md:text-base grid-cols-3 gap-3 mb-6">
            <div className="flex flex-col gap-1 bg-succes rounded-md shadow p-1 items-center text-white">
              <div className="">{data?.data?.status?.total_correct ?? "-"}</div>
              <div className="">Benar</div>
            </div>
            <div className="flex flex-col gap-1 bg-error rounded-md shadow p-1 items-center text-white">
              <div className="">{data?.data?.status?.total_uncorrect ?? "-"}</div>
              <div className="">Salah</div>
            </div>
            <div className="flex flex-col gap-1 bg-white border border-gray-100 text-black rounded-md shadow p-1 items-center">
              <div className="">{data?.data?.status?.total_unfilled ?? "-"}</div>
              <div className="">Tidak Terisi</div>
            </div>
          </div>
          <div className="mb-4 flex justify-between text-sm md:text-base">
            <h2 className="font-medium">Nomor Soal</h2>
            <h2 className="font-medium text-secondary">
              {currentNomor}/{soalData.length}
            </h2>
          </div>
          <div className="grid grid-cols-8 gap-2 text-sm">
            {soalData.map((item) => (
              <button
                key={item.nomor}
                className={`w-8 h-8 text-xs md:text-base rounded shadow ${item.nomor === currentNomor
                  ? "bg-primary text-white"
                  : item.jawabanKamu === item.kunciJawaban
                    ? "bg-succes text-white"
                    : item.jawabanKamu
                      ? "bg-red-500 text-white"
                      : "bg-white text-[#656565] border border-gray-300"
                  }`}
                onClick={() => handleQuestionClick(item.nomor)}
              >
                {item.nomor}
              </button>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default PembahasanPage;
