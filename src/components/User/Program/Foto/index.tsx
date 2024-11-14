import Image from 'next/image'
import React from 'react'

const FotoProgram = () => {
  return (
    <div className="wrap-foto mt-[150px] flex gap-4">
            <div className="card w-[50%]  h-[420px] bg-[url('/assets/images/frame1.png')] bg-cover rounded-[40px] relative overflow-hidden">
              <div className="">
                <Image
                  src="/assets/images/program1.png"
                  alt="logo"
                  width={1000}
                  height={1000}
                  unoptimized
                  className="w-[250px] absolute bottom-0 right-6 object-contain"
                />
              </div>
              <div className="text-primary font-semibold text-3xl mt-10 ml-10">
                Persiapan Perguruan <span className='text-white mx-2'>Tinggi</span> <br /> Kedinasan <span className='text-white mx-2'>untuk Siswa</span> <br />  SMA
              </div>
            </div>
            {/*  */}
            <div className="card w-[25%] h-[420px] bg-[url('/assets/images/frame2.png')] bg-cover rounded-[40px] relative overflow-hidden">
              <div className="">
                <Image
                  src="/assets/images/program2.png"
                  alt="logo"
                  width={1000}
                  height={1000}
                  unoptimized
                  className="w-[220px] absolute bottom-0 right-12 object-contain"
                />
              </div>
              <div className="text-primary font-semibold text-3xl mt-10 mr-10  text-end">
                Beasiswa <span className='text-secondary mx-2'>untuk</span> <br /> Pegawai
              </div>
            </div>
            {/*  */}
            <div className="card w-[25%] h-[420px] bg-[url('/assets/images/frame3.png')] bg-cover rounded-[40px] relative overflow-hidden">
              <div className="">
                <Image
                  src="/assets/images/program3.png"
                  alt="logo"
                  width={1000}
                  height={1000}
                  unoptimized
                  className="w-[220px] absolute bottom-0 right-12 object-contain"
                />
              </div>
              <div className="text-primary font-semibold text-3xl mt-10 ml-10 ">
                Pelatihan Bahasa <br /> <span className='text-secondary mr-2'>untuk</span> Standar <br /> Internasional
              </div>
            </div>
          </div>
  )
}

export default FotoProgram