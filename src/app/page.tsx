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
import AboutHome from '@/components/User/Home/About';
import MapsHome from '@/components/User/Home/MapsHome';

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
        <div className="wrap-alll">
          {/* beranda */}
          <div id='beranda' className="home flex justify-center items-center overflow-hidden relative w-full h-screen bg-[url('/assets/images/bg-home.png')] bg-no-repeat bg-cover">
            <div className="container mx-auto">
              <div className="wrap flex md:flex-row flex-col-reverse items-center">
                <div className="left md: flex flex-col gap-5 md:gap-8">
                  <div className="text-center md:text-start text-white text-2xl md:text-4xl font-bold">{data?.data?.title ?? "-"}</div>
                  <div className="text-secondary font-semibold text-xl md:text-2xl">{data?.data?.sub_title ?? "-"}</div>
                  <div className="text-white text-sm md:text-base text-justify">{data?.data?.description ?? "-"}</div>
                  <Link href="/register"
                    className='text-white flex items-center gap-3 w-fit bg-secondary px-6 py-3 rounded-full hover:bg-secondary-hover'
                  >
                    Konsultasi Sekarang
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
          </div>
          {/* beranda */}

          {/* card */}
          <div className="bg-white">
              <AboutHome />
          </div>
          {/* card */}

          {/* banner */}
          <div className="banner bg-gradient-to-r from-[#4A055B] to-[#9D0BC1]">
            <div className="container mx-auto py-16">
            <BannerHome />
            </div>
          </div>
          {/* banner */}
          
          {/* maps */}
          <div className="bg-white">
            <MapsHome />
          </div>
          {/* maps */}
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