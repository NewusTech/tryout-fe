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
    grade: string,
    rank: string,
    skor: string,
    status: string,
    durasiPengerjaan: string
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
                            <TableRow key={user.no}>
                                <TableCell className="text-center">
                                    {(currentPage - 1) * 10 + (index + 1)}
                                </TableCell>
                                <TableCell>{user.grade ?? "-"}</TableCell>
                                <TableCell className="text-center">{user.rank ?? "-"}</TableCell>
                                <TableCell className="text-center">{user.skor ?? "-"}</TableCell>
                                <TableCell className={`text-center font-medium ${user.status === "Lulus" ? "text-green-500" : "text-red-500"}`}>
                                    {user.status === "Lulus" ? "Lulus" : "Tidak Lulus"}
                                </TableCell>
                                <TableCell className="text-center">{user.durasiPengerjaan ?? "-"}</TableCell>
                                {/*  */}
                                <TableCell className="text-center justify-center flex gap-2">
                                    <div className="flex gap-2">
                                        <LinkCustom 
                                        className="text-white bg-secondary"
                                        href="/my-package/history/statistik">
                                            Statistik
                                        </LinkCustom>
                                        <LinkCustom 
                                        className="text-white"
                                        href="/my-package/history/discussion">
                                            Pembahasan
                                        </LinkCustom>
                                        <LinkCustom 
                                        className="text-primary bg-white border border-primary"
                                        href="/my-package/history/ranking">
                                            Ranking
                                        </LinkCustom>
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
    );
};

export default DataTable;
