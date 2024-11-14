"use client"
import Navbar from '@/components/User/Home/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/User/Home/Footer';
import FotoProgram from '@/components/User/Program/Foto';
import TeksProgram from '@/components/User/Program/Teks';

const Program = () => {
  return (
    <div>
      <div className='text-srBlack overflow-x-hidden bg-primary'>
        <Navbar />
        <div className="wrap-alll container mx-auto">
          {/* foto */}
          <FotoProgram />
          {/* foto */}
          {/* teks */}
          <TeksProgram />
          {/* teks */}
          {/* footer */}
          <Footer />
          {/* footer */}
        </div>

      </div>
    </div>

  );
}

export default Program