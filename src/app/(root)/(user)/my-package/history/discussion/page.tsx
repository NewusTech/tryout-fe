"use client";
import Navbar from "@/components/User/Home/Navbar";
import Link from "next/link";
import React, { useState } from "react";
import ArrowBread from "../../../../../../../public/assets/icons/ArrowBread";
import { Button } from "@/components/ui/button";

const PembahasanPage: React.FC = () => {
  // Dummy data soal dan nomor soal digabung dalam satu data
  const soalData = [
    {
      nomor: 1,
      pertanyaan: "Apa ibu kota Indonesia?",
      pilihanJawaban: ["Jakarta", "Bandung", "Surabaya", "Yogyakarta"],
      jawabanKamu: "A",  // Correct answer
      kunciJawaban: "A",
      nilai: 1,
      pembahasan: "Ibu kota Indonesia adalah Jakarta, yang juga merupakan pusat pemerintahan dan ekonomi negara.",
    },
    {
      nomor: 2,
      pertanyaan: "Siapa Presiden pertama Indonesia?",
      pilihanJawaban: ["Sukarno", "Soeharto", "B.J. Habibie", "Megawati Soekarnoputri"],
      jawabanKamu: "B",  // Incorrect answer
      kunciJawaban: "A",
      nilai: 0,
      pembahasan: "Presiden pertama Indonesia adalah Soekarno, yang juga merupakan proklamator kemerdekaan Indonesia.",
    },
    {
      nomor: 3,
      pertanyaan: "Apa nama gunung tertinggi di Indonesia?",
      pilihanJawaban: ["Gunung Rinjani", "Gunung Merapi", "Gunung Puncak Jaya", "Gunung Semeru"],
      jawabanKamu: "",  // No answer provided
      kunciJawaban: "C",
      nilai: 0,
      pembahasan: "Gunung Puncak Jaya, yang terletak di Papua, adalah gunung tertinggi di Indonesia dengan ketinggian 4.884 meter di atas permukaan laut.",
    },
    {
      nomor: 4,
      pertanyaan: "Siapa penemu telepon?",
      pilihanJawaban: ["Nikola Tesla", "Alexander Graham Bell", "Thomas Edison", "James Watt"],
      jawabanKamu: "B",  // Correct answer
      kunciJawaban: "B",
      nilai: 1,
      pembahasan: "Alexander Graham Bell adalah penemu telepon pertama, yang dipatenkan pada tahun 1876.",
    },
    {
      nomor: 5,
      pertanyaan: "Berapa jumlah provinsi di Indonesia?",
      pilihanJawaban: ["27", "34", "36", "37"],
      jawabanKamu: "C",  // Incorrect answer
      kunciJawaban: "B",
      nilai: 0,
      pembahasan: "Indonesia memiliki 34 provinsi. Provinsi terbaru adalah Provinsi Papua Barat Daya, yang dibentuk pada tahun 2022.",
    },
    {
      nomor: 6,
      pertanyaan: "Siapa pencipta lagu Indonesia Raya?",
      pilihanJawaban: ["W.R. Supratman", "Iwan Fals", "Anang Hermansyah", "Gombloh"],
      jawabanKamu: "A",  // Correct answer
      kunciJawaban: "A",
      nilai: 1,
      pembahasan: "Lagu Indonesia Raya diciptakan oleh W.R. Supratman pada tahun 1928.",
    },
    {
      nomor: 7,
      pertanyaan: "Berapa luas Indonesia?",
      pilihanJawaban: ["1.904.000 km²", "2.304.000 km²", "3.040.000 km²", "5.000.000 km²"],
      jawabanKamu: "A",  // Correct answer
      kunciJawaban: "A",
      nilai: 1,
      pembahasan: "Luas Indonesia adalah sekitar 1.904.000 km², menjadikannya negara terbesar ke-14 di dunia.",
    },
    {
      nomor: 8,
      pertanyaan: "Di mana letak Candi Borobudur?",
      pilihanJawaban: ["Jawa Barat", "Jawa Timur", "Jawa Tengah", "Bali"],
      jawabanKamu: "C",  // Correct answer
      kunciJawaban: "C",
      nilai: 1,
      pembahasan: "Candi Borobudur terletak di Magelang, Jawa Tengah. Candi ini merupakan situs Warisan Dunia UNESCO.",
    },
    {
      nomor: 9,
      pertanyaan: "Apa nama laut yang ada di antara Pulau Sumatra dan Jawa?",
      pilihanJawaban: ["Laut Flores", "Laut Jawa", "Laut Banda", "Laut Timor"],
      jawabanKamu: "B",  // Correct answer
      kunciJawaban: "B",
      nilai: 1,
      pembahasan: "Laut Jawa terletak di antara Pulau Sumatra dan Jawa, dan merupakan bagian dari Samudra Pasifik.",
    },
    {
      nomor: 10,
      pertanyaan: "Apa nama hewan nasional Indonesia?",
      pilihanJawaban: ["Harimau", "Elang", "Komodo", "Banteng"],
      jawabanKamu: "C",  // Correct answer
      kunciJawaban: "C",
      nilai: 1,
      pembahasan: "Hewan nasional Indonesia adalah Komodo, yang merupakan jenis kadal terbesar di dunia.",
    },
    {
      nomor: 11,
      pertanyaan: "Siapa penemu pesawat terbang?",
      pilihanJawaban: ["Nikola Tesla", "Orville Wright", "Thomas Edison", "Charles Darwin"],
      jawabanKamu: "A",  // Incorrect answer
      kunciJawaban: "B",
      nilai: 0,
      pembahasan: "Orville Wright bersama saudara Wilbur Wright adalah penemu pesawat terbang pertama pada tahun 1903.",
    },
    {
      nomor: 12,
      pertanyaan: "Apa nama sungai terpanjang di Indonesia?",
      pilihanJawaban: ["Sungai Mahakam", "Sungai Musi", "Sungai Kapuas", "Sungai Batang Hari"],
      jawabanKamu: "C",  // Correct answer
      kunciJawaban: "C",
      nilai: 1,
      pembahasan: "Sungai Kapuas di Kalimantan adalah sungai terpanjang di Indonesia dengan panjang lebih dari 1.100 km.",
    },
    {
      nomor: 13,
      pertanyaan: "Siapa pencipta wayang kulit?",
      pilihanJawaban: ["W.R. Supratman", "Raden Ngabehi", "Sutan Sjahrir", "Ki Hajar Dewantara"],
      jawabanKamu: "",  // No answer provided
      kunciJawaban: "B",
      nilai: 0,
      pembahasan: "Wayang kulit merupakan seni pertunjukan yang berasal dari Jawa, diciptakan oleh Raden Ngabehi.",
    },
    {
      nomor: 14,
      pertanyaan: "Apa ibukota Jawa Timur?",
      pilihanJawaban: ["Surabaya", "Malang", "Madiun", "Jember"],
      jawabanKamu: "A",  // Correct answer
      kunciJawaban: "A",
      nilai: 1,
      pembahasan: "Surabaya adalah ibukota provinsi Jawa Timur dan merupakan kota terbesar kedua di Indonesia.",
    },
    {
      nomor: 15,
      pertanyaan: "Siapa penulis novel Laskar Pelangi?",
      pilihanJawaban: ["Andrea Hirata", "Pramoedya Ananta Toer", "Tere Liye", "Habiburrahman El Shirazy"],
      jawabanKamu: "B",  // Incorrect answer
      kunciJawaban: "A",
      nilai: 0,
      pembahasan: "Laskar Pelangi adalah novel karya Andrea Hirata yang menceritakan kehidupan anak-anak di Belitung.",
    },
    {
      nomor: 16,
      pertanyaan: "Apa nama planet terdekat dengan matahari?",
      pilihanJawaban: ["Venus", "Mars", "Merkurius", "Jupiter"],
      jawabanKamu: "C",  // Correct answer
      kunciJawaban: "C",
      nilai: 1,
      pembahasan: "Merkurius adalah planet yang terdekat dengan matahari.",
    },
    {
      nomor: 17,
      pertanyaan: "Siapa yang menulis lagu 'Bendera'?",
      pilihanJawaban: ["Cokelat", "Iwan Fals", "Slank", "Dewa 19"],
      jawabanKamu: "A",  // Correct answer
      kunciJawaban: "A",
      nilai: 1,
      pembahasan: "Lagu 'Bendera' diciptakan oleh grup musik Cokelat, yang dikenal dengan lirik yang semangat nasionalisme.",
    },
    {
      nomor: 18,
      pertanyaan: "Apa nama monumen yang ada di Jakarta?",
      pilihanJawaban: ["Monas", "Tugu Tani", "Tugu Pahlawan", "Tugu Selamat Datang"],
      jawabanKamu: "A",  // Correct answer
      kunciJawaban: "A",
      nilai: 1,
      pembahasan: "Monumen Nasional (Monas) di Jakarta adalah simbol kemerdekaan Indonesia dan dibangun pada masa pemerintahan Presiden Soekarno.",
    },
    {
      nomor: 19,
      pertanyaan: "Apa nama pulau terbesar di Indonesia?",
      pilihanJawaban: ["Sumatra", "Kalimantan", "Sulawesi", "Papua"],
      jawabanKamu: "B",  // Correct answer
      kunciJawaban: "B",
      nilai: 1,
      pembahasan: "Kalimantan adalah pulau terbesar kedua di Indonesia setelah Papua.",
    },
    {
      nomor: 20,
      pertanyaan: "Apa mata uang Indonesia?",
      pilihanJawaban: ["Ringgit", "Baht", "Rupiah", "Dollar"],
      jawabanKamu: "C",  // Correct answer
      kunciJawaban: "C",
      nilai: 1,
      pembahasan: "Mata uang Indonesia adalah Rupiah, yang disingkat IDR.",
    }
  ];

  const [currentNomor, setCurrentNomor] = useState(1);

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
          <h1 className="md:text-2xl text-lg text-primary font-medium">Soal No {soal.nomor}</h1>
          <p className="md:text-base text-xs">{soal.pertanyaan}</p>

          <div className="space-y-2 md:text-base text-xs">
            {soal.pilihanJawaban.map((jawaban, index) => {
              const label = String.fromCharCode(65 + index); // A, B, C, D
              return (
                <div key={index} className="flex items-center">
                  <span
                    className={`mr-2 ${soal.jawabanKamu === label
                      ? "text-primary font-medium" // Jawaban kamu berwarna ungu
                      : soal.kunciJawaban === label
                        ? "text-succes font-medium" // Kunci jawaban berwarna hijau
                        : ""
                      }`}
                  >{label}.</span>
                  <p
                    className={`${soal.jawabanKamu === label
                      ? "text-primary font-medium" // Jawaban kamu berwarna ungu
                      : soal.kunciJawaban === label
                        ? "text-succes font-medium" // Kunci jawaban berwarna hijau
                        : ""
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
                ? "text-primary"
                : ""
                }`}
            >
              <span className="font-medium">Jawaban Kamu:</span> {soal.jawabanKamu || "Belum Dijawab"}
            </p>
            <p
              className={`font-medium ${soal.kunciJawaban === soal.jawabanKamu
                ? "text-succes"
                : "text-succes"
                }`}
            >
              <span className="font-medium">Kunci Jawaban:</span> {soal.kunciJawaban}
            </p>
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
              onClick={handlePrevious}
            >
              Sebelumnya
            </Button>
            <Button
              className="w-full md:w-fit"
              variant="outlinePrimary"
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
              <div className="">1</div>
              <div className="">Benar</div>
            </div>
            <div className="flex flex-col gap-1 bg-error rounded-md shadow p-1 items-center text-white">
              <div className="">1</div>
              <div className="">Benar</div>
            </div>
            <div className="flex flex-col gap-1 bg-white border border-gray-100 text-black rounded-md shadow p-1 items-center">
              <div className="">1</div>
              <div className="">Benar</div>
            </div>
          </div>
          <div className="mb-4 flex justify-between text-sm md:text-base">
            <h2 className="font-medium">Nomor Soal</h2>
            <h2 className="font-medium text-secondary">1/72</h2>
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
