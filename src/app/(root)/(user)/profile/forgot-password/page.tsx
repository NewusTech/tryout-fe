"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/User/Home/Navbar";
import Loading from "@/components/ui/Loading";
import { showAlert } from "@/lib/swalAlert";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";


// Schema validasi dengan Zod
const schema = z
    .object({
        oldPassword: z.string().min(1, "Kata sandi lama wajib diisi"),
        newPassword: z
            .string()
            .min(8, "Kata sandi baru harus minimal 8 karakter"),
        confirmNewPassword: z
            .string()
            .min(1, "Konfirmasi kata sandi baru wajib diisi"),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "Kata sandi baru dan konfirmasi tidak cocok",
        path: ["confirmNewPassword"], // Path untuk field error
    });

type FormData = z.infer<typeof schema>;

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const [slug, setSlug] = useState<string | undefined>(undefined);

    useEffect(() => {
        setSlug(Cookies.get("slug"));
    }, []);

    const onSubmit = async (data: FormData) => {
        try {
            setLoading(true);
            await axiosPrivate.post(`/user/change/password/${slug}`, data);
            showAlert("success", "Kata sandi berhasil diperbarui!");
            navigate.push("/");
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.data?.[0]?.message ||
                error?.response?.data?.message ||
                "Gagal memperbarui kata sandi!";
            showAlert("error", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="text-srBlack overflow-x-hidden min-h-screen">
                <Navbar />
                <div className="container mx-auto pt-[120px]">
                    <div className="md:text-2xl text-xl font-semibold my-4 text-primary">
                        Ganti Kata Sandi
                    </div>
                    <div className="md:w-[80%] rounded-[20px] md:p-7 p-4 border border-gray-100 shadow-md mb-10 bg-white flex flex-col gap-5">
                        <form onSubmit={handleSubmit(onSubmit)} className="md:px-7 flex flex-col gap-5">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-3">
                                    <Label>Kata Sandi Lama</Label>
                                    <Input
                                        type="password"
                                        placeholder="Kata Sandi Lama"
                                        {...register("oldPassword")}
                                    />
                                    {errors.oldPassword && (
                                        <p className="text-red-500 text-sm">
                                            {errors.oldPassword.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label>Kata Sandi Baru</Label>
                                    <Input
                                        type="password"
                                        placeholder="Kata Sandi Baru"
                                        {...register("newPassword")}
                                    />
                                    {errors.newPassword && (
                                        <p className="text-red-500 text-sm">
                                            {errors.newPassword.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label>Konfirmasi Kata Sandi Baru</Label>
                                    <Input
                                        type="password"
                                        placeholder="Konfirmasi Kata Sandi Baru"
                                        {...register("confirmNewPassword")}
                                    />
                                    {errors.confirmNewPassword && (
                                        <p className="text-red-500 text-sm">
                                            {errors.confirmNewPassword.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-end md:mt-5 mt-3">
                                <Button type="submit" className="px-10 w-full md:w-[160px]">
                                    {loading ? <Loading /> : "Simpan"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
