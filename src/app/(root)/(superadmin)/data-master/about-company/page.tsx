"use client";

import React from "react";
import TitleAdmin from "@/components/Superadmin/Title";
import Image from "next/image";
import LinkCustom from "@/components/ui/LinkCustom";
import LoadingPage from "@/components/ui/LoadingPage";
import { useGetAboutCompany } from "@/services/api";

const DetailAbout = () => {
  // INTEGRASI
  const { data, isLoading } = useGetAboutCompany();
  if (isLoading) {
    return <div >
      <LoadingPage />
    </div>;
  }
  // INTEGRASI

  return (
    <div className="">
      <TitleAdmin title="Tentang Perusahaan" />
      {/* button */}
      <div className="flex gap-4 items-center justify-end mb-4 text-white">
        <LinkCustom href="/data-master/about-company/edit" className="">
          Edit Tentang
        </LinkCustom>
      </div>
      {/* form */}
      <div className="form shadow-lg flex flex-col gap-5 rounded-xl bg-[#FAFAFA] border border-gray-100 p-6">
        {/*  */}
        <div className="flex flex-col gap-1">
          <div className="font-medium">
            Judul
          </div>
          <div className="">
            {data?.data?.title ?? "-"}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-medium">
            Sub Judul
          </div>
          <div className="">
            {data?.data?.sub_title ?? "-"}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-medium">
            Deskripsi
          </div>
          <div className="">
            {data?.data?.description ?? "-"}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-medium">
            Nomor Telepon
          </div>
          <div className="">
            {data?.data?.telepon ?? "-"}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-medium">
            Email
          </div>
          <div className="">
            {data?.data?.email ?? "-"}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-medium">
            Alamat
          </div>
          <div className="">
            {data?.data?.address ?? "-"}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-medium">
            Latitude
          </div>
          <div className="">
            {data?.data?.lat ?? "-"}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-medium">
            Longitude
          </div>
          <div className="">
            {data?.data?.long ?? "-"}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-medium">
            Logo Utama
          </div>
          <div className="">
            <Image
              src={data?.data?.main_logo ?? "-"}
              alt="logo"
              width={500}
              height={500}
              unoptimized
              className="h-[200px] object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-medium">
            Sub Logo
          </div>
          <div className="">
            <Image
              src={data?.data?.sub_logo ?? "-"}
              alt="logo"
              width={500}
              height={500}
              unoptimized
              className="h-[200px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailAbout;
