"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
    { month: "July", desktop: 254 },
    { month: "August", desktop: 114 },
    { month: "September", desktop: 143 },
    { month: "October", desktop: 241 },
    { month: "November", desktop: 189 },
    { month: "December", desktop: 214 },
]

const chartConfig = {
    desktop: {
        label: "Peserta",
        color: "#4A055B",
    },
} satisfies ChartConfig

export function ChartPengguna() {
    return (
        <div className='w-full h-[450px] rounded-3xl shadow p-6'>
            <CardHeader>
                <CardTitle>Grafik Bulanan Peserta</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer className="h-[300px] w-full mt-3" config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent className="bg-white" indicator="line" />}
                        />
                        <Area
                            dataKey="desktop"
                            type="natural"
                            fill="var(--color-desktop)"
                            fillOpacity={0.4}
                            stroke="var(--color-desktop)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </div>
    )
}
