"use client";
import React, { FC, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import MessageIcon from "../../../../../public/assets/icons/MessageIcon";
import Loading from "@/components/ui/Loading";

interface FeedBackModalProps {
    onFeedback: (data: { question_1: string; feedback: string }) => Promise<void>;
    className?: string;
}

const FeedBackModal: FC<FeedBackModalProps> = ({ onFeedback, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState<string>(""); // Menyimpan nilai rating
    const [feedbackText, setFeedbackText] = useState<string>(""); // Menyimpan nilai feedback

    const handleFeedBack = async () => {
        if (!rating || !feedbackText) {
            console.log("Harap isi semua bidang sebelum mengirim.");
            return;
        }

        setLoading(true);
        try {
            await onFeedback({
                question_1: rating,
                feedback: feedbackText,
            });
            console.log({
                question_1: rating,
                feedback: feedbackText,
            });
        } catch (error) {
            console.error("Feedback operation failed:", error);
        } finally {
            setLoading(false);
            setIsOpen(false);
        }
    };

    const handleRatingClick = (value: string) => {
        setRating(value); // Mengatur nilai rating saat lingkaran diklik
    };

    return (
        <div className={`flex items-center w-full text-center ${className}`}>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogTrigger asChild>
                    <Button className="bg-primary text-white">Berikan Feedback</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white w-[600px]">
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white overflow-hidden rounded-[20px] relative w-[600px]">
                            {/* Header */}
                            <div className="px-7 flex bg-white border-b justify-between p-4">
                                <div className="text-primary font-medium flex items-center gap-2">
                                    <MessageIcon />
                                    Feedback
                                </div>
                            </div>
                            {/* Content */}
                            <div className="flex px-7 gap-4 items-center border-b border-slate-300 p-4">
                                <div>
                                    <div className="text-primary font-semibold mb-2">
                                        Berikan Masukan untuk Kami!
                                    </div>
                                    <div className="text-sm text-primary">
                                        Seberapa puas Anda dengan pengalaman menggunakan website ini?
                                    </div>
                                </div>
                            </div>
                            {/* Rating */}
                            <div className="wrap flex gap-4 px-7 p-3 justify-evenly items-end">
                                {["1", "2", "3", "4", "5"].map((value) => (
                                    <button
                                        key={value}
                                        className="flex flex-col items-center gap-2"
                                        onClick={() => handleRatingClick(value)}
                                    >
                                        <div className="text-center text-sm flex justify-center w-[40px] h-[40px] items-center font-medium">
                                            {value === "1" && "Tidak Sesuai"}
                                            {value === "2" && "Kurang Sesuai"}
                                            {value === "3" && "Cukup"}
                                            {value === "4" && "Sesuai"}
                                            {value === "5" && "Sangat Sesuai"}
                                        </div>
                                        <div
                                            className={`w-[50px] h-[50px] flex justify-center items-center rounded-full text-sm ${
                                                rating === value
                                                    ? "bg-primary text-white"
                                                    : "bg-white border border-primary text-primary"
                                            }`}
                                        >
                                            {value}
                                        </div>
                                    </button>
                                ))}
                            </div>
                            {/* Feedback Textarea */}
                            <div className="px-7 mt-3">
                                <Textarea
                                    placeholder="Masukkan kritik dan saran"
                                    value={feedbackText}
                                    onChange={(e) => setFeedbackText(e.target.value)}
                                />
                            </div>
                            {/* Submit Button */}
                            <div className="p-4 px-7 flex gap-3 justify-end">
                                <Button
                                    className={`w-full rounded-full py-2 ${
                                        loading ? "bg-gray-500" : "bg-primary hover:bg-primary-hover"
                                    }`}
                                    onClick={handleFeedBack}
                                    disabled={loading}
                                >
                                    {loading ? <Loading /> : "Kirim"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default FeedBackModal;
