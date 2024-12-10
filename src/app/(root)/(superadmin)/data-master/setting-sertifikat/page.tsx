"use client"
import React from 'react'
import CertificateSetting from '@/components/Superadmin/DataMaster/Sertifikat'
import TitleAdmin from '@/components/Superadmin/Title'
import LinkCustom from '@/components/ui/LinkCustom'

const SettingSertifkikat = () => {
  return (
    <div>
      <TitleAdmin title="Pengaturan Sertifikat" />
      <div className="head flex gap-3 justify-between mb-5">
        <LinkCustom
          href="/data-master/setting-sertifikat/edit"
          className="flex gap-3 text-white items-center flex-shrink-0 w-[160px] justify-center"
        >
          Edit Sertifikat
        </LinkCustom>
      </div>
      <div className="flex justify-center">
        <CertificateSetting />
      </div>
    </div>
  )
}

export default SettingSertifkikat