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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import TitikIcon from "../../../../../public/assets/icons/TitikIcon";
// import { TryoutHistoryResponse } from "@/types/interface";

interface Response {
    data: History[];
    headers: string[];
    currentPage: number;
    search: string;
    status?: number;
    message?: string;
}

interface History {
    id: number;
    name: string;
    package_name: string;
    status: string;
    skor: number;
}

const DataTable: React.FC<Response> = ({ headers, data, currentPage, search, }) => {

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
                                <TableRow key={user.id} index={index}>
                                    <TableCell className="text-center">
                                        {(currentPage - 1) * 10 + (index + 1)}
                                    </TableCell>
                                    <TableCell className="text-center text-primary">{user?.package_name ?? "-"}</TableCell>
                                    <TableCell className="text-center text-primary">{user?.name ?? "-"}</TableCell>
                                    <TableCell className="text-center text-primary">{user?.skor ?? "-"}</TableCell>
                                    <TableCell className="text-center text-primary">{user?.status ?? "-"}</TableCell>
                                    {/*  */}
                                    <TableCell className="text-center justify-center items-center flex gap-2">
                                        <div className="aksi flex-shrink-0">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <div className="cursor-pointer w-8 h-8 flex justify-center items-center">
                                                        <TitikIcon />
                                                    </div>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-fit mr-8 mt-1 bg-white">
                                                    <DropdownMenuLabel className="font-semibold text-primary text-sm w-full">
                                                        Pilih Aksi
                                                    </DropdownMenuLabel>
                                                    <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent transition-all animate-pulse"></div>
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                            <Link className="w-full" href={`/tryout/history/detail/${user.id}`}>
                                                                <div className="flex items-center gap-2 text-primary">
                                                                    Detail
                                                                </div>
                                                            </Link>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
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
