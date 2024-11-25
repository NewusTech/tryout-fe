
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
import DeletePopupTitik from "@/components/Custom/PopupDelete";
import TitikIcon from "../../../../../public/assets/icons/TitikIcon";
import { PaymentResponse } from "@/types/interface";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import Cookies from "js-cookie";
import { showAlert } from "@/lib/swalAlert";
import { mutate } from "swr";


const DataTable: React.FC<PaymentResponse> = ({ headers, data, currentPage, search, }) => {
    const accessToken = Cookies.get("accessToken"); // Ambil token langsung
    const axiosPrivate = useAxiosPrivate();
    const handleDelete = async (id: number) => {
        try {
            await axiosPrivate.delete(`/user/type/payment/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            // alert
            showAlert('success', 'Data berhasil dihapus!');
            // alert
            // Update the local data after successful deletion
        } catch (error: any) {
            // Extract error message from API response
            const errorMessage = error.response?.data?.data?.[0]?.message || error.response?.data?.message || 'Gagal menghapus data!';
            showAlert('error', errorMessage);
            //   alert
        } mutate(`/user/type/payment/get?page=${currentPage}&limit=10&search=${search}`);;
    };

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
                            data.map((item, index) => (
                                <TableRow key={item.id} index={index}>
                                    <TableCell className="text-center">
                                        {(currentPage - 1) * 10 + (index + 1)}
                                    </TableCell>
                                    <TableCell className="text-center text-primary">{item?.title ?? "-"}</TableCell>
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
                                                            <Link className="w-full" href={`/data-master/payment-type/edit/${item?.id}`}>
                                                                <div className="flex items-center gap-2 text-primary">
                                                                    Edit
                                                                </div>
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                            <DeletePopupTitik onDelete={() => handleDelete(item?.id)} />
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
                                <TableCell colSpan={3} className="text-center">Tidak ada data</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default DataTable;
