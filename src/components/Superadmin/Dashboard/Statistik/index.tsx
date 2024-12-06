import React from 'react'
import PieChartStatistik from './PieChartStatistik'
import { BarPackage } from './BarPackage'
import { ChartPengguna } from './ChartPengguna'

const Statistik = () => {
    return (
        <div className='flex flex-col gap-7'>
            {/*  */}
            <div className="flex gap-7">
                <div className="w-1/3">
                    <PieChartStatistik />
                </div>
                <div className="w-2/3">
                    <BarPackage />
                </div>
            </div>
            {/*  */}
            <div className="">
                <ChartPengguna />
            </div>
        </div>
    )
}

export default Statistik