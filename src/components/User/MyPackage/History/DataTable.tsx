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
import { HistoryUser } from "@/types/interface";


const DataTable: React.FC<HistoryUser> = ({ headers, data, currentPage, search, }) => {

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
                            <TableRow key={user?.id} index={index}>
                                <TableCell className="text-center">
                                    {(currentPage - 1) * 10 + (index + 1)}
                                </TableCell>
                                <TableCell className="text-center">{user?.package_name ?? "-"}</TableCell>
                                <TableCell className="text-center">{user?.skor ?? "-"}</TableCell>
                                {/* <TableCell >
                                    <div className={`text-center font-medium ${user.status === "Lulus" ? "text-succes bg-succes/20 p-2 rounded-full" : "text-error bg-error/20 p-2 rounded-full"}`}>
                                        {user.status === "Lulus" ? "Lulus" : "Tidak Lulus"}
                                    </div>
                                </TableCell> */}
                                <TableCell className="text-center">{"-"}</TableCell>
                                <TableCell className="text-center">{"-"}</TableCell>
                                {/*  */}
                                <TableCell className="text-center">
                                    <div className="flex gap-2 justify-center">
                                        <LinkCustom
                                            className="text-white bg-secondary"
                                            href={`/my-package/history/statistik/${user?.id}`}>
                                            Statistik
                                        </LinkCustom>
                                        <LinkCustom
                                            className="text-white"
                                            href={`/my-package/history/discussion/${user?.id}`}>
                                            Pembahasan
                                        </LinkCustom>
                                        <LinkCustom
                                            className="text-primary bg-white border border-primary"
                                            href={`/my-package/history/ranking/${user?.id}`}>
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

            {/* mobile table */}
            <div className="wrap-table flex-col gap-4 mt-3 flex md:hidden">
                <div className="card-table text-sm p-4 rounded-2xl border border-gray-100 shadow-md bg-white">
                    <div className="wrap-konten flex flex-col gap-2">
                        <div className="flex justify-between gap-5">
                            <div className="label w-[50%] font-medium text-primary">No</div>
                            <div className="konten w-[50%] text-black/80 text-start">: 1</div>
                        </div>
                        <div className="flex justify-between gap-5">
                            <div className="label w-[50%] font-medium text-primary">Passing Grade</div>
                            <div className="konten w-[50%] text-black/80 text-start">: Passing Grade</div>
                        </div>
                        <div className="flex justify-between gap-5">
                            <div className="label w-[50%] font-medium text-primary">Skor</div>
                            <div className="konten w-[50%] text-black/80 text-start">: 232</div>
                        </div>
                        <div className="flex justify-between gap-5">
                            <div className="label w-[50%] font-medium text-primary">Status</div>
                            <div className="konten w-[50%] text-black/80 text-start">
                            <p className="p-1 rounded w-fit px-3 bg-succes/10 text-succes">Lulus</p>
                            </div>
                        </div>
                        <div className="flex justify-between gap-5">
                            <div className="label w-[50%] font-medium text-primary">Durasi Pengerjaan</div>
                            <div className="konten w-[50%] text-black/80 text-start">: 1</div>
                        </div>
                    </div>
                    <div className="flex gap-3 text-white mt-5">
                        <Link href={`/my-package/history/statistik`} className="bg-secondary rounded-full w-full py-2 text-center text-xs">
                            Statistik
                        </Link>
                        <Link href={`/my-package/history/discussion`} className="bg-primary px-4 rounded-full w-full py-2 text-center text-xs">
                            Pembahasan
                        </Link>
                        <Link href={`/my-package/history/ranking`} className="bg-white border border-gray-200 rounded-full w-full py-2 text-center text-xs text-primary">
                            Ranking
                        </Link>
                    </div>
                </div>
            </div>
            {/* mobile table */}
        </div>
    );
};

export default DataTable;
