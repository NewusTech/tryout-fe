"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useGetDashboard } from "@/services/api"

const chartConfig = {
    desktop: {
        label: "Peserta",
        color: "#4A055B",
    },
} satisfies ChartConfig

export function ChartPengguna() {
    // Fetch data from the API using the useGetDashboard hook
    const { data } = useGetDashboard();

    // Transform API data to match the format expected by the chart
    const chartData = data?.data?.tryoutMonthly?.map((item) => ({
        month: item.month,
        desktop: item.user_count,
    })) || [];

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
                            tickFormatter={(value) => value.slice(0, 3)} // Shorten month names
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
