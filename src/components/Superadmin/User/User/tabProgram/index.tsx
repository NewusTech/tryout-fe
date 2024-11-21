import Image from 'next/image'
import React from 'react'

const TabProgram = () => {
    return (
        <div>
            <div className="card bg-white border border-gray-100 shadow-lg rounded-xl overflow-hidden md:p-7 flex md:flex-row flex-col gap-4">
                <div className="left flex-shrink-0">
                    <div className="img">
                        <Image
                            src="/assets/images/book.png"
                            alt="logo"
                            width={1000}
                            height={1000}
                            unoptimized
                            className="md:w-[300px] w-full object-contain md:rounded-xl"
                        />
                    </div>
                </div>
                <div className="right flex flex-col justify-center md:px-0 px-4 w-full text-primary">
                    <div className="md:text-xl text-base font-semibold">
                        Try Out CPNS 2024 (Part 1)
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TabProgram