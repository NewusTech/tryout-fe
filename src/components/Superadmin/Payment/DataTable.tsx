
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
import TitikIcon from "../../../../public/assets/icons/TitikIcon";

interface History {
    no: number;
    nama: string,
    namaPaket: string,
    metodePembayaran: string,
    status: string,
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
                                    <TableCell className="text-center text-primary">{user.nama ?? "-"}</TableCell>
                                    <TableCell className="text-center text-primary">{user.namaPaket ?? "-"}</TableCell>
                                    <TableCell className="text-center text-primary">{user.metodePembayaran ?? "-"}</TableCell>
                                    <TableCell className="text-center text-primary">{user.status ?? "-"}</TableCell>
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
                                                            <Link className="w-full" href={`/payment/detail`}>
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
