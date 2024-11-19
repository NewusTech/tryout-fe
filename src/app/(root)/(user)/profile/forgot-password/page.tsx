"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/User/Home/Navbar';
import Image from 'next/image';

const ForgotPassword = () => {
    const [profileImage, setProfileImage] = useState<string>('/assets/images/profile.png');

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    return (
        <div>
            <div className="text-srBlack overflow-x-hidden min-h-screen">
                <Navbar />
                <div className="wrap-alll container mx-auto pt-[120px]">
                    <div className="md:text-2xl text-xl font-semibold my-4 text-primary">
                        Ganti Kata Sandi
                    </div>
                    {/* Profile Section */}
                    <div className="wrap  md:w-[80%] rounded-[20px] md:p-7 p-4 border border-gray-100 shadow-md mb-10 bg-white flex flex-col gap-5">
                        <div className="form md:px-7 flex flex-col gap-5">
                            {/* Form Fields */}
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-3">
                                    <Label>Kata Sandi Lama</Label>
                                    <Input placeholder="Kata Sandi Lama" />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label>Kata Sandi Baru</Label>
                                    <Input placeholder="Kata Sandi Baru" />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label>Konfirmasi Kata Sandi Baru</Label>
                                    <Input placeholder="Konfirmasi Kata Sandi Baru" />
                                </div>
                            </div>
                            {/* Submit Button */}
                            <div className="flex justify-end md:mt-5 mt-3">
                                <Button className="px-10 w-full md:w-[160px]">Simpan</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
