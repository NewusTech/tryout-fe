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
    rank: number;
    nama: string,
    twk: string,
    tiu: string,
    tkp: string,
    total: string,
    durasiPengerjaan: string,
    keterangan: string
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
                        {headers.map((header, index) => (
                            <TableHead key={index}>{header}</TableHead>
                        ))}
                </TableHeader>
                <TableBody>
                    {data?.length > 0 ? (
                        data.map((user, index) => (
                            <TableRow key={user.rank}>
                                {/* <TableCell className="text-center">
                                    {(currentPage - 1) * 10 + (index + 1)}
                                </TableCell> */}
                                <TableCell className="text-center">{user.rank ?? "-"}</TableCell>
                                <TableCell className="text-center">{user.nama ?? "-"}</TableCell>
                                <TableCell className="text-center">{user.twk ?? "-"}</TableCell>
                                <TableCell className="text-center">{user.tiu ?? "-"}</TableCell>
                                <TableCell className="text-center">{user.tkp ?? "-"}</TableCell>
                                <TableCell className="text-center">{user.total ?? "-"}</TableCell>
                                <TableCell className="text-center">{user.durasiPengerjaan ?? "-"}</TableCell>
                                <TableCell className="text-center">{user.keterangan ?? "-"}</TableCell>
                                {/*  */}
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
