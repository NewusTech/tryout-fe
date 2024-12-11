"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useGetDashboard } from "@/services/api"

const chartConfig = {
    desktop: {
        label: "Pengguna",
        color: "#E4D9E6",
    },
} satisfies ChartConfig

export function BarPackage() {
    // Fetching data from the useGetDashboard hook
    const { data } = useGetDashboard();

    // Transform the API response to match the required chartData structure
    const chartData = data?.data?.usersByPackageType?.map((packageType) => ({
        month: packageType.type_package,
        desktop: packageType.user_count,
    })) || [];

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
