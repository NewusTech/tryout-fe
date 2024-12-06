"use client";
import Navbar from '@/components/User/Home/Navbar';
import Link from 'next/link';
import { useState } from 'react';
import BarChart from '@/components/User/MyPackage/History/Statistik/chart';
import TiuChart from '@/components/User/MyPackage/History/Statistik/TiuChart';
import TwkChart from '@/components/User/MyPackage/History/Statistik/TwkChart';
import TkpChart from '@/components/User/MyPackage/History/Statistik/TkpChart';
import { useParams } from 'next/navigation';
import { useGetHistoryUserId } from '@/services/api';
import ArrowBread from '../../../../../../../../public/assets/icons/ArrowBread';

const Statistik = () => {
  // Integrasi API
  const { id } = useParams();
  const { data } = useGetHistoryUserId(id as string);

  return (
    <div>
      <div className="text-srBlack overflow-x-hidden min-h-screen">
        <Navbar />
        <div className="wrap-alll container mx-auto pb-12">
          <div className="pt-[120px]">
            {/* Breadcrumb */}
            <div className="bread md:text-base text-sm flex text-primary gap-3 items-center">
              <Link href="/my-package">Paket Saya</Link>
              <ArrowBread />
              <Link href="/my-package/history">Riwayat</Link>
              <ArrowBread />
              <div className="font-medium">Statistik</div>
            </div>
            {/* Breadcrumb */}
            {/* Content */}
            <div className="text-2xl font-semibold my-4">Statistik</div>
            <div className="text-xl font-semibold my-2 text-primary">{data?.data?.title ?? "-"}</div>
            {/* card */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4 order-1 flex md:flex-col flex-row md:gap-4 gap-2">
                <div className="flex md:h-[50%] md:w-full w-[50%] flex-col items-center shadow-md justify-center gap-3 bg-primary rounded-2xl p-4 text-white">
                  <div className="font-medium text-lg md:text-2xl">SKOR</div>
                  <div className="text-xl md:text-2xl">{data?.data?.score ?? "-"}</div>
                  <div className="">Dari 550</div>
                </div>
                <div className="flex md:h-[50%] md:w-full w-[50%] flex-col items-center shadow-md justify-center gap-3 bg-primary rounded-2xl p-4 text-white">
                  <div className="text-center text-sm md:text-xl">DURASI PENGERJAAN</div>
                  <div className="text-base md:text-2xl font-medium">{data?.data?.duration ?? "-"}</div>
                </div>
              </div>
              {/*  */}
              <div className="md:col-span-2 order-3 md:order-2 flex md:flex-col flex-row md:gap-4 gap-2">
                <div className="flex flex-col md:h-[130px] h-[100px] w-full items-center shadow-md justify-center gap-1 bg-[#F4D9D04D]/30 rounded-2xl p-4 text-primary">
                  <div className="text-xl md:text-2xl font-medium">TWK</div>
                  <div className="md:text-base text-xs">{data?.data?.typeQuestionSummary[0].totalScore ?? "-"} dari 65</div>
                </div>
                <div className="flex flex-col md:h-[130px] h-[100px] w-full items-center shadow-md justify-center gap-1 bg-[#F4D9D04D]/30 rounded-2xl p-4 text-primary">
                  <div className="text-xl md:text-2xl font-medium">TIU</div>
                  <div className="md:text-base text-xs">{data?.data?.typeQuestionSummary[1].totalScore ?? "-"} dari 80</div>
                </div>
                <div className="flex flex-col md:h-[130px] h-[100px] w-full items-center shadow-md justify-center gap-1 bg-[#F4D9D04D]/30 rounded-2xl p-4 text-primary">
                  <div className="text-xl md:text-2xl font-medium">TKP</div>
                  <div className="md:text-base text-xs">{data?.data?.typeQuestionSummary[2].totalScore ?? "-"} dari 166</div>
                </div>
              </div>
              {/*  */}
              <div className="md:col-span-6 order-2 md:order-3 grid gap-4">
                <div className="bg-[#F4D9D04D]/30 shadow-md rounded-2xl p-4 text-primary">
                  <BarChart />
                </div>
              </div>
            </div>
            {/* CARD TIU TWK TKP */}
            <div className="mt-7 grid md:grid-cols-3 grid-cols-1 gap-4">
              <div>
                <TwkChart />
              </div>
              <div>
                <TiuChart />
              </div>
              <div>
                <TkpChart />
              </div>
            </div>
            {/* card */}
            {/* Content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistik;
