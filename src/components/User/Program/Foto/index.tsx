import Image from 'next/image'
import React from 'react'

const FotoProgram = () => {
  return (
    <div className="wrap-foto md:mt-[150px] mt-[120px] flex md:flex-row flex-col gap-4">
            <div className="card w-full md:w-[50%]  md:h-[420px] h-[260px] bg-[url('/assets/images/frame1.png')] bg-cover md:rounded-[40px] rounded-[20px] relative overflow-hidden">
              <div className="">
                <Image
                  src="/assets/images/program1.png"
                  alt="logo"
                  width={1000}
                  height={1000}
                  unoptimized
                  className="w-[140px] md:w-[250px] absolute bottom-0 right-6 object-contain"
                />
              </div>
              <div className="text-primary hidden md:block font-semibold text-base md:text-3xl mt-10 ml-10">
                Persiapan Perguruan <span className='text-white mx-2'>Tinggi</span> Kedinasan <span className='text-white mx-2'>untuk Siswa</span> <br />  SMA
              </div>
              <div className="text-primary md:hidden font-semibold text-xl md:text-3xl mt-5 px-5">
                Persiapan Perguruan <span className='text-white mr-2'>Tinggi</span>  Kedinasan <span className='text-white '>untuk Siswa</span>  SMA
              </div>
            </div>
            {/*  */}
            <div className="card w-full md:w-[25%] md:h-[420px] h-[260px] bg-[url('/assets/images/frame2.png')] bg-cover rounded-[20px] md:rounded-[40px] relative overflow-hidden">
              <div className="">
                <Image
                  src="/assets/images/program2.png"
                  alt="logo"
                  width={1000}
                  height={1000}
                  unoptimized
                  className="w-[150px] md:w-[220px] absolute bottom-0 right-[80px] md:right-12 object-contain"
                />
              </div>
              <div className="text-primary hidden md:block font-semibold text-base md:text-3xl md:mt-10 md:mr-10 md:p-0 p-5 text-start  md:text-end">
                Beasiswa <span className='text-secondary mx-2'>untuk</span> <br /> Pegawai
              </div>
              <div className="md:hidden text-primary font-semibold text-xl md:text-3xl md:mt-10 md:mr-10 md:p-0 p-5 text-start  md:text-end">
                Beasiswa <span className='text-secondary'>untuk</span> Pegawai
              </div>
            </div>
            {/*  */}
            <div className="card w-full md:w-[25%] md:h-[420px] h-[260px] bg-[url('/assets/images/frame3.png')] bg-cover rounded-[20px] md:rounded-[40px] relative overflow-hidden bg-right">
              <div className="">
                <Image
                  src="/assets/images/program3.png"
                  alt="logo"
                  width={1000}
                  height={1000}
                  unoptimized
                  className="md:w-[220px] w-[150px] absolute bottom-0 right-12 object-contain"
                />
              </div>
              <div className="hidden md:block text-primary font-semibold text-3xl mt-10 ml-10 ">
                Pelatihan Bahasa <br /> <span className='text-secondary mr-2'>untuk</span> Standar <br /> Internasional
              </div>
              <div className="md:hidden text-primary font-semibold text-xl p-5">
                Pelatihan Bahasa <br /> <span className='text-secondary mr-2'>untuk</span> Standar Internasional
              </div>
            </div>
          </div>
  )
}

export default FotoProgram