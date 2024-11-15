"use client";
import Navbar from '@/components/User/Home/Navbar';
import Link from 'next/link';
import ArrowBread from '../../../../../../../public/assets/icons/ArrowBread';
import { useState } from 'react';
import PaginationTable from '@/components/Custom/PaginationTable';
import DataTable from '@/components/User/MyPackage/History/DataTable';

const Statistik = () => {

  return (
    <div>
      <div className="text-srBlack overflow-x-hidden min-h-screen">
        <Navbar />
        <div className="wrap-alll container mx-auto">
          <div className="pt-[120px]">
            {/* Breadcrumb */}
            <div className="bread flex text-primary gap-3 items-center">
              <Link href="/my-package">Paket Saya</Link>
              <ArrowBread />
              <Link href="/my-package/history">History</Link>
              <ArrowBread />
              <div className="font-medium">Statistik</div>
            </div>
            {/* Breadcrumb */}
            {/* Content */}
            <div className="text-2xl font-semibold my-4">Passing Grade</div>
            {/* Content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistik;
