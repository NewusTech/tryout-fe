
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { EvaluationResponse } from "@/types/interface";
import React from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const DataTable: React.FC<EvaluationResponse> = ({ headers, data, }) => {

    return (
        <div className="Table mt-3">
            <div className="md:block hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead >No</TableHead>
                            <TableHead className="text-start">Tanggal</TableHead>
                            <TableHead className="text-start">Catatan</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.length > 0 ? (
                            data.map((item, index) => (
                                <TableRow key={item.id} index={index}>
                                    <TableCell className="text-center">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell className="text-primary">
                                        {item?.tanggal
                                            ? format(new Date(item.tanggal), "EEEE, dd-MM-yyyy", { locale: id })
                                            : "-"}
                                    </TableCell>
                                    <TableCell className="text-primary">
                                        {item?.note ?? "-"}
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
