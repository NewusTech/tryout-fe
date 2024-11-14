import Image from 'next/image'
import React from 'react'

const BannerHome = () => {
  return (
    <div>
      <div className="banner">
        <Image
          src="/assets/images/banner.png"
          alt="logo"
          width={1000}
          height={1000}
          unoptimized
          className="w-full object-contain"
        />
      </div>
    </div>
  )
}

export default BannerHome