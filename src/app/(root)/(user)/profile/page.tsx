"use client"
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/User/Home/Navbar';
import Image from 'next/image';
import { useGetKota, useGetProvinsi, useGetUserProfileId } from '@/services/api';
import Cookies from "js-cookie";
import { showAlert } from '@/lib/swalAlert';
import { profileEdit, profileEditFormData } from '@/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import Loading from '@/components/ui/Loading';
import HelperError from '@/components/ui/HelperError';
import { CustomSelect } from '@/components/Custom/SelectCustom';
import SelectSearch from '@/components/Custom/SelectSearch3';
import { mutate } from 'swr';


const Profile = () => {
    // const [profileImage, setProfileImage] = useState<string>('/assets/images/profile.png');
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        getValues,
        control,
        formState: { errors },
    } = useForm<profileEditFormData>({
        resolver: zodResolver(profileEdit),
    });

    // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files?.[0];
    //     if (file) {
    //         const imageUrl = URL.createObjectURL(file);
    //         setProfileImage(imageUrl);
    //     }
    // };

    const [slug, setSlug] = useState<string | undefined>(undefined);

    useEffect(() => {
        setSlug(Cookies.get("slug"));
    }, []);

    // kelamin
    const kelaminOptions = [
        { label: "Laki-laki", value: 1 },
        { label: "Perempuan", value: 2 },
    ];

    // Integrasi API
    const { data: dataUser } = useGetUserProfileId(slug as string);
    // provinsi
    const { data: dataProvinsi } = useGetProvinsi();
    const transformedItems = dataProvinsi?.data.map((item) => ({
        value: item.id.toString(), // Ensure id is a string if needed
        label: item.name, // Map 'name' to 'nama'
    })) || [];
    // kota
    const { data: dataKota } = useGetKota();
    const kotaItems = dataKota?.data.map((item) => ({
        value: item.id.toString(), // Ensure id is a string if needed
        label: item.name, // Map 'name' to 'nama'
    })) || [];

    useEffect(() => {
        if (dataUser?.data) {
            const timer = setTimeout(() => {
                setValue("name", dataUser?.data?.name ?? '');
                setValue("email", dataUser?.data?.email ?? '');
                setValue("telepon", dataUser?.data?.telepon ?? '');
                setValue("alamat", dataUser?.data?.alamat ?? '');
                setValue("tempat_lahir", dataUser?.data?.tempat_lahir ?? '');
                // setValue("tgl_lahir", dataUser?.data?.tgl_lahir ?? '');
                setValue("gender", dataUser?.data?.gender?.toString() ?? '');
                setValue("asal_instansi", dataUser?.data?.asal_instansi ?? '');
                setValue("provinsi_id", dataUser?.data?.provinsi_id || 0);
                setValue("kota_id", dataUser?.data?.kota_id || 0);

                if (dataUser?.data?.image_profile) {
                    setImagePreviewMain(dataUser?.data?.image_profile);
                }
            }, 1000); // Delay in milliseconds (1000 ms = 1 second)

            return () => clearTimeout(timer); // Clean up timeout on component unmount or when dataUser changes
        }
    }, [dataUser, setValue]);
    // GET ONE SLUG

    // main logo
    const [imagePreviewMain, setImagePreviewMain] = useState<string | null>(null);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue('image_profile', file);
            setImagePreviewMain(URL.createObjectURL(file));
        }
    };
    // main logo

    // 
    const [loading, setLoading] = useState(false);
    const navigate = useRouter();
    const axiosPrivate = useAxiosPrivate();

    const onSubmit: SubmitHandler<profileEditFormData> = async (data) => {
        setLoading(true); // Set loading to true when the form is submitted
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('telepon', data.telepon);
        formData.append('alamat', data.alamat);
        formData.append('provinsi_id', data.provinsi_id.toString());
        formData.append('kota_id', data.kota_id.toString());
        formData.append('tempat_lahir', data.tempat_lahir);
        // formData.append('tgl_lahir', data.tgl_lahir);
        formData.append('gender', data.gender.toString());
        formData.append('asal_instansi', data.asal_instansi);

        // Memeriksa jika image ada sebelum menambahkannya ke formData
        if (data.image_profile) {
            formData.append('image_profile', data.image_profile);
        }

        try {
            await axiosPrivate.put(`/user/info/update/${slug}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // console.log(data);
            // alert
            showAlert('success', 'Data berhasil diperbarui!');
            // alert
            // navigate.push('/data-master/about-company');
            // reset();
        } catch (error: any) {
            // Extract error message from API response
            const errorMessage = error.response?.data?.data?.[0]?.message || 'Gagal memperbarui data!';
            showAlert('error', errorMessage);
        } finally {
            setLoading(false); // Set loading to false once the process is complete
        }
        mutate(`/user/info/get/${slug}`);
    };
    // 

    return (
        <div>
            <div className="text-srBlack overflow-x-hidden min-h-screen">
                <Navbar />
                <div className="wrap-alll container mx-auto pt-[120px]">
                    <div className="md:text-2xl text-xl font-semibold my-4 text-primary">
                        Profile
                    </div>
                    {/* Profile Section */}
                    <form onSubmit={handleSubmit(onSubmit)} className="wrap rounded-[20px] border border-gray-100 md:p-7 p-4 shadow-md mb-10 bg-white flex flex-col gap-5">
                        <div className="profile flex justify-center">
                            <div className="h-[125px] w-[125px] rounded-full overflow-hidden relative border border-primary">
                                <Image
                                    src={imagePreviewMain ?? "/assets/images/profile.png"}
                                    alt="profile"
                                    width={500}
                                    height={500}
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
                                    <Input
                                        placeholder="Nama"
                                        type='text'
                                        {...register('name')}
                                        className={`${errors.name ? 'border-red-500' : ''}`}
                                    />
                                    <HelperError>{errors?.name?.message}</HelperError>
                                </div>
                                <div className="flex flex-col md:gap-3 gap-2">
                                    <Label>Jenis Kelamin</Label>
                                    <Controller
                                        name="gender"
                                        control={control}
                                        render={({ field }) => (
                                            <CustomSelect
                                                label="Pilih Jenis Kelamin"
                                                options={kelaminOptions}
                                                placeholder="Pilih Jenis Kelamin"
                                                value={field.value}
                                                onChange={(option) => field.onChange(option || '')}
                                                width={`w-full ${errors.gender ? 'border-red-500' : ''}`}
                                            />
                                        )}
                                    />
                                    <HelperError>{errors?.email?.message}</HelperError>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-7">
                                <div className="flex flex-col md:gap-3 gap-2">
                                    <Label>Email</Label>
                                    <Input
                                        placeholder="Email"
                                        type='text'
                                        {...register('email')}
                                        className={`${errors.email ? 'border-red-500' : ''}`}
                                    />
                                    <HelperError>{errors?.email?.message}</HelperError>
                                </div>
                                <div className="flex flex-col md:gap-3 gap-2">
                                    <Label>Nomer Telepon</Label>
                                    <Input
                                        placeholder="Nomer Telepon"
                                        type='number'
                                        {...register('telepon')}
                                        className={`${errors.telepon ? 'border-red-500' : ''}`}
                                    />
                                    <HelperError>{errors?.telepon?.message}</HelperError>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-7">
                                <div className="flex flex-col md:gap-3 gap-2">
                                    <Label>Asal Instansi</Label>
                                    <Input
                                        placeholder="Asal Instansi"
                                        type='text'
                                        {...register('asal_instansi')}
                                        className={`${errors.asal_instansi ? 'border-red-500' : ''}`}
                                    />
                                    <HelperError>{errors?.asal_instansi?.message}</HelperError>
                                </div>
                                <div className="flex flex-col md:gap-3 gap-2">
                                    <Label>Provinsi</Label>
                                    <Controller
                                        name="provinsi_id"
                                        control={control}
                                        render={({ field }) => (
                                            <SelectSearch
                                                items={transformedItems}
                                                label="Provinsi"
                                                placeholder="Cari Provinsi"
                                                value={field.value?.toString() || ""}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <HelperError>{errors?.provinsi_id?.message}</HelperError>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-7">
                                <div className="flex flex-col md:gap-3 gap-2">
                                    <Label>Kabupaten / Kota</Label>
                                    <Controller
                                        name="kota_id"
                                        control={control}
                                        render={({ field }) => (
                                            <SelectSearch
                                                items={kotaItems}
                                                label="Kota"
                                                placeholder="Cari Kota"
                                                value={field.value?.toString() || ""}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <HelperError>{errors?.kota_id?.message}</HelperError>
                                </div>
                            </div>
                            <div className="flex flex-col md:gap-3 gap-2">
                                <Label>Alamat</Label>
                                <Textarea
                                    placeholder="Alamat"
                                    {...register('alamat')}
                                    className={`${errors.alamat ? 'border-red-500' : ''}`}
                                />
                                <HelperError>{errors?.alamat?.message}</HelperError>
                            </div>
                            {/* Submit Button */}
                            <div className="flex justify-center md:my-5 my-3">
                                <Button
                                    type='submit'
                                    className="px-10 w-full md:w-[180px]">
                                    {loading ? <Loading /> : "Simpan"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
