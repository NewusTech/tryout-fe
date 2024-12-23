
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React from "react";

interface Response {
    headers: string[];
    data: Data[];
    currentPage: number;
    search: string;
}

interface Data {
    id: number;
    tanggal: string;
    catatan: string;
}
const DataTable: React.FC<Response> = ({ headers, data, currentPage, search }) => {

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
                                    <TableCell className="text-center text-primary">
                                        {item?.tanggal ?? "-"}
                                    </TableCell>
                                    <TableCell className="text-primary">
                                        {item?.catatan ?? "-"}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">Tidak ada catatan</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default DataTable;
