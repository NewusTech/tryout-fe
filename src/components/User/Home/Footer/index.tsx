import React from 'react'

const Footer = () => {
    return (
        <div className="">
            <div id='footer' className="kontak text-white hidden md:flex justify-center mt-[200px] mb-[50px]">
                {/* <Footer /> */}
                Copyright <span className='font-semibold mx-3'> MASTER EDUCATION </span> 2024. AllRight Reserved
            </div>
            <div id='footer' className="kontak md:hidden text-sm text-white flex flex-col justify-center mt-[200px] mb-[50px]">
                {/* <Footer /> */}
                <div className="flex justify-center">
                    Copyright <span className='font-semibold mx-3'> MASTER EDUCATION </span> 2024.
                </div>
                <div className="text-center">
                    AllRight Reserved
                </div>
            </div>
        </div>
    )
}

export default Footer