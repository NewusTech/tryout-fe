"use client"
import React from 'react'
import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { browser: "lulus", visitors: 275, fill: "#4A055B" },
    { browser: "tidakLulus", visitors: 200, fill: "#E4D9E6" },
]
const chartConfig = {
    visitors: {
        label: "Pengguna",
    },
    lulus: {
        label: "Lulus",
        color: "#4A055B",
    },
    tidakLulus: {
        label: "Tidak Lulus",
        color: "#E4D9E6",
    },
} satisfies ChartConfig

const PieChartStatistik = () => {
    return (
        <div className='w-full h-[400px] rounded-3xl shadow p-6'>
            <CardHeader>
                <CardTitle>Statistik Lulus dan Tidak Lulus</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            labelClassName='bg-white'
                            cursor={false}
                            content={<ChartTooltipContent className='bg-white' hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="browser"
                            innerRadius={60}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <div className="flex items-center gap-8 justify-center">
                <div className="flex gap-2 items-center">
                    <div className="w-5 h-5 bg-primary rounded-full"></div>
                    <div className="text-black/60">Lulus</div>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="w-5 h-5 bg-[#E4D9E6] rounded-full"></div>
                    <div className="text-black/60">Tidak Lulus</div>
                </div>
            </div>
        </div>
    )
}

export default PieChartStatistik