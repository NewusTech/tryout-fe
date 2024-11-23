/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { FC, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
// import HapusIcon from '../../../../public/icons/HapusIcon';
import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/Loading';
import WarningIcon from '../../../../public/assets/icons/WarningIcon';
import TrashIcon from '../../../../public/assets/icons/TrashIcon';

interface DeletePopupTitikProps {
    onDelete: () => Promise<void>; // onDelete should return a promise
    className?: string;
}

const DeletePopupTitik: FC<DeletePopupTitikProps> = ({ onDelete, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true); // Set loading to true when starting the delete operation
        try {
            await onDelete(); // Wait for the delete action to complete
        } catch (error) {
            console.error("Delete operation failed:", error);
        } finally {
            setLoading(false); // Set loading to false once the operation is complete
            setIsOpen(false); // Close the dialog
        }
    };

    return (
        <div title='Hapus' className='flex items-center w-full text-center'>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <div className={`text-primary w-full text-start cursor-pointer ${className}`}>Hapus</div>
                </DialogTrigger>
                <DialogContent className='bg-white w-[600px]'>
                    <div onClick={() => setIsOpen(false)} className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                        <div
                            onClick={(e) => e.stopPropagation()} // Prevents click from closing pop-up when interacting inside
                            className="bg-white overflow-hidden rounded-[20px] relative w-[600px] md:mx-0 mx-4"
                        >
                            <div className="px-7 flex bg-[#FFC3C3] justify-between p-4">
                                <div className="text-[#B11D1D] font-medium">Hapus</div>
                                <button onClick={() => setIsOpen(false)} className="flex justify-center items-center text-white w-6 h-6 rounded-full bg-[#B11D1D]">x</button>
                            </div>
                            <div className="flex px-7 gap-4 items-center border-b border-slate-300 p-4">
                                <div className="left">
                                    <TrashIcon />
                                </div>
                                <div className="right">
                                    <div className="text-[#D32F2F] font-semibold mb-2">
                                        Apakah Anda yakin ingin menghapus data ini?
                                    </div>
                                    <div className="text-justify text-sm">
                                        Jika Anda memilih "Ya," data ini akan dihapus secara permanen dan tidak dapat dikembalikan.
                                        Jika Anda memilih "Tidak," data akan tetap tersimpan seperti sebelumnya.
                                    </div>
                                </div>
                            </div>
                            {/* button */}
                            <div className="p-4 px-7 flex gap-3 justify-end">
                                <Button
                                    onClick={() => setIsOpen(false)}
                                    variant="outline"
                                    className='w-[130px]'
                                >
                                    Tidak
                                </Button>
                                <Button
                                    className={`w-[130px]  rounded-full py-2 ${loading ? 'bg-gray-500' : 'bg-[#D32F2F] hover:bg-red-700'}`}
                                    onClick={handleDelete} // Menambahkan fungsi onClick
                                    disabled={loading} // Disable button while loading
                                >
                                    {loading ? <Loading /> : "Iya"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            {/*  */}
        </div>
    );
}

export default DeletePopupTitik;
