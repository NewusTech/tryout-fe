import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    TableHead,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { mutate } from "swr";
import Loading from "@/components/ui/Loading";
import LinkCustom from "@/components/ui/LinkCustom";

interface History {
    no: number;
    nama: string,
    passingGrade: string,
    waktuTersisa: string,
    soal: string,
}
interface ApiResponse {
    headers: string[];
    data: History[];
    currentPage: number;
    search: string;
}


const DataTable: React.FC<ApiResponse> = ({ headers, data, currentPage, search, }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any | null>(null); // Store the currently selected user for status update
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false); // Loading state

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
                                <TableRow key={user.no} index={index}>
                                    <TableCell className="text-center">
                                        {(currentPage - 1) * 10 + (index + 1)}
                                    </TableCell>
                                    <TableCell className="text-primary">{user.nama ?? "-"}</TableCell>
                                    <TableCell className="text-center">
                                        <div className="wrap flex gap-2 justify-center">
                                            <div className="p-1 px-2 bg-[#EDDDB8] text-primary rounded-full">
                                                TWK: 180/60
                                            </div>
                                            <div className="p-1 px-2 bg-[#EDDDB8] text-primary rounded-full">
                                                TIU: 180/60
                                            </div>
                                            <div className="p-1 px-2 bg-[#EDDDB8] text-primary rounded-full">
                                                TKP: 180/60
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center text-primary">{user.waktuTersisa ?? "-"}</TableCell>
                                    <TableCell className="text-center">
                                        <div className="wrap flex gap-2 justify-center">
                                            <div className="p-1 px-2 bg-primary text-[#EDDDB8] rounded-full">
                                                TWK: 30/45
                                            </div>
                                            <div className="p-1 px-2 bg-primary text-[#EDDDB8] rounded-full">
                                                TIU: 12/45
                                            </div>
                                            <div className="p-1 px-2 bg-primary text-[#EDDDB8] rounded-full">
                                                TKP: 25/45
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center">Tidak ada data</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default DataTable;
