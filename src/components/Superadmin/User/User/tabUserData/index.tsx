import React from 'react'

const TabUserData = () => {
    return (
        <div className='flex flex-col gap-10 w-[60%]'>
            {/*  */}
            <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                    <div className="font-medium">Nama</div>
                    <div className="">Qurrota</div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="font-medium text-end">Jenis Kelamin</div>
                    <div className="text-end">Perempuan</div>
                </div>
            </div>
            {/*  */}
            <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                    <div className="font-medium">Email</div>
                    <div className="">qurotta@gmail.com</div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="font-medium text-end">Nomor Telepon</div>
                    <div className="text-end">0856093472344</div>
                </div>
            </div>
            {/*  */}
            <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                    <div className="font-medium">Asal Sekolah</div>
                    <div className="">SMAN 1 Bandar Lampung</div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="font-medium text-end">Provinsi</div>
                    <div className="text-end">Lampung</div>
                </div>
            </div>
            {/*  */}
            <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                    <div className="font-medium">Kabupaten / Kota</div>
                    <div className="">Bandar Lampung</div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="font-medium text-end">Kecamatan</div>
                    <div className="text-end">Surame</div>
                </div>
            </div>
            {/*  */}
            <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                    <div className="font-medium">Alamat</div>
                    <div className="text-justify">Bandar Lampung, Jl.Panageran Diponegoro 2</div>
                </div>
            </div>
        </div>
    )
}

export default TabUserData