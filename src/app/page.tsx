"use client"
import Navbar from '@/components/User/Home/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import LinkIcon from '../../public/assets/icons/linkIcon';
import BannerHome from '@/components/User/Home/Banner';
import Footer from '@/components/User/Home/Footer';
import { useGetAboutCompany } from '@/services/api';
import LoadingPage from '@/components/ui/LoadingPage';
import ContactUs from '@/components/User/Home/ContactUs';

const Home = () => {
  // INTEGRASI
  const { data, isLoading } = useGetAboutCompany();
  if (isLoading) {
    return <div >
        <LoadingPage />
    </div>;
}
  // INTEGRASI
  return (
    <div>
      <div className='text-srBlack overflow-x-hidden bg-primary'>
        <Navbar />
        <div className="wrap-alll container mx-auto">
          {/* beranda */}
          <div id='beranda' className="home flex justify-center items-center overflow-hidden relative w-full h-screen bg-primary">
            <div className="wrap flex md:flex-row flex-col-reverse items-center">
              <div className="left md: flex flex-col gap-5 md:gap-8">
                <div className="text-center md:text-start text-white text-2xl md:text-4xl font-bold">{data?.data?.title ?? "-"}</div>
                <div className="text-secondary font-semibold text-xl md:text-2xl">{data?.data?.sub_title ?? "-"}</div>
                <div className="text-white text-sm md:text-base text-justify">{data?.data?.description ?? "-"}</div>
                <Link href="/register"
                  className='text-white flex items-center gap-3 w-fit bg-secondary px-6 py-2 rounded-full hover:bg-secondary-hover'
                >
                  Daftar Sekarang
                  <LinkIcon />
                </Link>
              </div>
              <div className="right w-full md:w-[40%] flex-shrink-0">
                <Image
                  src={data?.data?.sub_logo ?? "-"}
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
      <ContactUs />
    </div>

  );
}

export default Home