import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { MonitoringResponse } from "@/types/interface";

// Utility untuk mengonversi waktu dalam "HH:MM:SS" ke detik
const timeStringToSeconds = (time: string): number => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
};

// Utility untuk mengonversi detik kembali ke "HH:MM:SS"
const secondsToTimeString = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
};

const DataTable: React.FC<MonitoringResponse> = ({ headers, data, currentPage }) => {
    // State untuk menyimpan waktu tersisa
    const [timeRemaining, setTimeRemaining] = useState<Record<number, number>>({});

    // Inisialisasi waktu tersisa saat data diterima
    useEffect(() => {
        if (data) {
            const initialTime = data.reduce((acc, user, index) => {
                acc[index] = timeStringToSeconds(user.timeRemaining ?? "00:00:00");
                return acc;
            }, {} as Record<number, number>);
            setTimeRemaining(initialTime);
        }
    }, [data]);

    // Update waktu tersisa secara real-time
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining((prev) =>
                Object.fromEntries(
                    Object.entries(prev).map(([key, value]) => [key, Math.max(0, value - 1)])
                )
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="Table mt-3">
            <div className="md:block hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {headers.map((header, index) => (
                                <TableHead key={index}>{header}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.length > 0 ? (
                            data.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell className="text-center">
                                        {(currentPage - 1) * 10 + (index + 1)}
                                    </TableCell>
                                    <TableCell className="text-primary">{user.name ?? "-"}</TableCell>
                                    <TableCell className="text-center">
                                        <div className="wrap flex gap-2 justify-center">
                                            <div className="p-1 px-2 bg-[#EDDDB8] text-primary rounded-full">
                                                TWK: {user.passingGrade[1]?.passingGrade ?? "-"}
                                            </div>
                                            <div className="p-1 px-2 bg-[#EDDDB8] text-primary rounded-full">
                                                TIU: {user.passingGrade[0]?.passingGrade ?? "-"}
                                            </div>
                                            <div className="p-1 px-2 bg-[#EDDDB8] text-primary rounded-full">
                                                TKP: {user.passingGrade[2]?.passingGrade ?? "-"}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center text-primary">
                                        {secondsToTimeString(timeRemaining[index] ?? 0)}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="wrap flex gap-2 justify-center">
                                            <div className="p-1 px-2 bg-primary text-[#EDDDB8] rounded-full">
                                                TWK: {user.questionsAnswered[1]?.answered ?? "-"}
                                            </div>
                                            <div className="p-1 px-2 bg-primary text-[#EDDDB8] rounded-full">
                                                TIU: {user.questionsAnswered[0]?.answered ?? "-"}
                                            </div>
                                            <div className="p-1 px-2 bg-primary text-[#EDDDB8] rounded-full">
                                                TKP: {user.questionsAnswered[2]?.answered ?? "-"}
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={headers.length} className="text-center">
                                    Tidak ada data
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default DataTable;
