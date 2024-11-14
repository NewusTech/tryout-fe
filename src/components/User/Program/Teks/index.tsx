import React from 'react'

const TeksProgram = () => {
    return (
        <div className='flex flex-col gap-[100px] mt-20'>
            {/*  */}
            <div className="wrap flex flex-col gap-3 items-end">
                <div className="head font-semibold text-secondary text-2xl">Persiapan Perguruan Tinggi Kedinasan untuk Siswa SMA</div>
                <div className="teks text-end text-white">Program khusus yang dirancang untuk membantu siswa sekolah menengah mendapatkan bimbingan intensif demi meraih peluang di Perguruan Tinggi Kedinasan.</div>
            </div>
            {/*  */}
            <div className="wrap flex flex-col gap-3 items-start">
                <div className="head font-semibold text-[#DCC080] text-2xl">Bimbingan Beasiswa untuk Pegawai</div>
                <div className="teks text-white">Program ini membantu para pegawai yang ingin melanjutkan pendidikan melalui beasiswa bergengsi baik di dalam negeri maupun internasional. Dukungan meliputi persiapan akademis dan pelatihan IELTS & TOEFL yang intensif untuk memenuhi standar internasional.</div>
            </div>
            {/*  */}
            <div className="wrap flex flex-col gap-3 items-end">
                <div className="head font-semibold text-[#EDDDB8] text-2xl">Program Pelatihan Bahasa untuk Standar Internasional</div>
                <div className="teks text-end text-white">Pelatihan intensif untuk IELTS & TOEFL yang mendukung peserta dalam memenuhi persyaratan bahasa Inggris pada berbagai institusi pendidikan di seluruh dunia.</div>
            </div>
        </div>
    )
}

export default TeksProgram