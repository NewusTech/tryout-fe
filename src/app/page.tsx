"use client"
import Navbar from '@/components/User/Home/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import LinkIcon from '../../public/assets/icons/linkIcon';
import BannerHome from '@/components/User/Home/Banner';
import Footer from '@/components/User/Home/Footer';

const Home = () => {
  return (
    <div>
      <div className='text-srBlack overflow-x-hidden bg-primary'>
        <Navbar />
        <div className="wrap-alll container mx-auto">
          {/* beranda */}
          <div id='beranda' className="home flex justify-center items-center overflow-hidden relative w-full h-screen bg-primary">
            <div className="wrap flex items-center">
              <div className="left flex flex-col gap-8">
                <div className="text-secondary text-4xl font-bold">MASTER <span className='text-white'>EDUCATION</span></div>
                <div className="text-secondary font-semibold text-2xl">Transformasi Masa Depan Tanpa Batas ! ✨</div>
                <div className="text-white text-justify">Kami hadir untuk mewujudkan mimpi semua orang bisa kuliah gratis, baik di dalam maupun luar negeri. Dapatkan bimbingan khusus Perguruan Tinggi Kedinasan dan beasiswa eksklusif hingga jenjang Master Degree. Siapkan dirimu dengan kurikulum terbaik, termasuk IELTS & TOEFL.</div>
                <Link href="/register"
                  className='text-white flex items-center gap-3 w-fit bg-secondary px-6 py-2 rounded-full hover:bg-secondary-hover'
                >
                  Daftar Sekarang
                  <LinkIcon />
                </Link>
              </div>
              <div className="right w-[40%] flex-shrink-0">
                <Image
                  src="/assets/images/logo-home.png"
                  alt="logo"
                  width={1000}
                  height={1000}
                  unoptimized
                  className="w-[800px] object-contain"
                />
              </div>
            </div>
          </div>
          {/* beranda */}

          {/* banner */}
          <div className="banner">
            <BannerHome />
          </div>
          {/* banner */}
          {/* footer */}
          <Footer />
          {/* footer */}
        </div>

      </div>
    </div>

  );
}

export default Home