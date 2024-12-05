"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

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
    { month: "Free", desktop: 186 },
    { month: "Premium", desktop: 305 },
    { month: "Platinum", desktop: 237 },
]

const chartConfig = {
    desktop: {
        label: "Pengguna",
        color: "#FFF4DE",
    },
} satisfies ChartConfig

export function BarPackage() {
    return (
        <div className='w-full h-[400px] rounded-3xl shadow p-6'>
            <CardHeader>
                <CardTitle>Tipe Tryout</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer className="h-[300px] w-full" config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent className="bg-white" hideLabel />}
                        />
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </div>
    )
}
