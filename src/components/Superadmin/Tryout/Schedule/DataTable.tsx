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
import { ScheduleTryoutResponse } from "@/types/interface";


const DataTable: React.FC<ScheduleTryoutResponse> = ({ headers, data, currentPage, search, }) => {

    //  const handleDelete = async (id: number) => {
    //         try {
    //             await axiosPrivate.delete(`/user/type/package/delete/${id}`, {
    //                 headers: {
    //                     Authorization: `Bearer ${accessToken}`,
    //                 },
    //             });
    //             // alert
    //             showAlert('success', 'Data berhasil dihapus!');
    //             // alert
    //             // Update the local data after successful deletion
    //         } catch (error: any) {
    //             // Extract error message from API response
    //             const errorMessage = error.response?.data?.data?.[0]?.message || error.response?.data?.message || 'Gagal menghapus data!';
    //             showAlert('error', errorMessage);
    //             //   alert
    //         } mutate(`/user/type/package/get?page=${currentPage}&limit=10&search=${search}`);;
    //     };

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
                                <TableRow key={user?.id} index={index}>
                                    <TableCell className="text-center">
                                        {(currentPage - 1) * 10 + (index + 1)}
                                    </TableCell>
                                    <TableCell className="text-primary">{user?.scheduleTitle ?? "-"}</TableCell>
                                    <TableCell className="text-center text-primary">{user?.tanggal ?? "-"}</TableCell>
                                    <TableCell className="text-center text-primary">{user?.waktu ?? "-"}</TableCell>
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
                                                            <Link className="w-full" href={`/tryout/schedule/detail/${user?.id}`}>
                                                                <div className="flex items-center gap-2 text-primary">
                                                                    Detail
                                                                </div>
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                            <Link className="w-full" href={`/tryout/schedule/edit`}>
                                                                <div className="flex items-center gap-2 text-primary">
                                                                    Edit
                                                                </div>
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        {/* <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                            <DeletePopupTitik onDelete={async () => { }} />
                                                        </DropdownMenuItem> */}
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
