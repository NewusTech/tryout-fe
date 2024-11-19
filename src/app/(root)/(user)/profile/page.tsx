"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/User/Home/Navbar';
import Image from 'next/image';

const Profile = () => {
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
                        Profile
                    </div>
                    {/* Profile Section */}
                    <div className="wrap rounded-[20px] border border-gray-100 md:p-7 p-4 shadow-md mb-10 bg-white flex flex-col gap-5">
                        <div className="profile flex justify-center">
                            <div className="h-[125px] w-[125px] rounded-full overflow-hidden relative border border-primary">
                                <Image
                                    src={profileImage}
                                    alt="profile"
                                    width={1000}
                                    height={1000}
                                    unoptimized
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-2 right-[42px]">
                                    <label htmlFor="profileImageInput" className="cursor-pointer bg-primary text-white px-2 py-1 text-xs rounded-md">
                                        Edit
                                    </label>
                                    <input
                                        id="profileImageInput"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="md:px-7 text-lg md:text-xl font-medium text-primary">
                            Data Diri
                        </div>
                        <div className="form md:px-7 flex flex-col md:gap-5 gap-4">
                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-7">
                                <div className="flex flex-col md:gap-3 gap-2">
                                    <Label>Nama</Label>
                                    <Input placeholder="Nama" />
                                </div>
                                <div className="flex flex-col md:gap-3 gap-2">
                                    <Label>Jenis Kelamin</Label>
                                    <Input placeholder="Jenis Kelamin" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-7">
                                <div className="flex flex-col md:gap-3 gap-2">
                                    <Label>Email</Label>
                                    <Input placeholder="Email" />
                                </div>
                                <div className="flex flex-col md:gap-3 gap-2">
                                    <Label>Nomer Telepon</Label>
                                    <Input placeholder="Nomer Telepon" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-7">
                                <div className="flex flex-col md:gap-3 gap-2">
                                    <Label>Asal Sekolah</Label>
                                    <Input placeholder="Asal Sekolah" />
                                </div>
                                <div className="flex flex-col md:gap-3 gap-2">
                                    <Label>Provinsi</Label>
                                    <Input placeholder="Provinsi" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-7">
                                <div className="flex flex-col md:gap-3 gap-2">
                                    <Label>Kabupaten / Kota</Label>
                                    <Input placeholder="Kabupaten / Kota" />
                                </div>
                                <div className="flex flex-col md:gap-3 gap-2">
                                    <Label>Kecamatan</Label>
                                    <Input placeholder="Kecamatan" />
                                </div>
                            </div>
                            <div className="flex flex-col md:gap-3 gap-2">
                                <Label>Alamat</Label>
                                <Textarea placeholder="Alamat" />
                            </div>
                            {/* Submit Button */}
                            <div className="flex justify-center md:my-5 my-3">
                                <Button
                                    className="px-10 w-full md:w-[180px]">
                                    Simpan
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
