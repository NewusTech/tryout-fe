/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import Link from 'next/link';
import HelperError from '@/components/ui/HelperError';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/Loading';
import { aboutEdit, aboutEditFormData } from '@/validations';
import 'react-quill/dist/quill.snow.css';
import Image from 'next/image';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { showAlert } from '@/lib/swalAlert';
import TitleBack from '@/components/Superadmin/TitleBack';
import { Label } from '@/components/ui/label';
import { useGetAboutCompany } from '@/services/api';
import { Textarea } from '@/components/ui/textarea';
import { mutate } from 'swr';


const EditPelatihan = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<aboutEditFormData>({
    resolver: zodResolver(aboutEdit),
  });

  // GET ONE SLUG
  // Integrasi API
  const { data: dataUser } = useGetAboutCompany();

  useEffect(() => {
    if (dataUser?.data) {
      const timer = setTimeout(() => {
        setValue("title", dataUser?.data?.title ?? '');
        setValue("sub_title", dataUser?.data?.sub_title ?? '');
        setValue("description", dataUser?.data?.description ?? '');
        setValue("telepon", dataUser?.data?.telepon ?? '');
        setValue("email", dataUser?.data?.email ?? '');
        setValue("address", dataUser?.data?.address ?? '');
        setValue("long", dataUser?.data?.long ?? '');
        setValue("lat", dataUser?.data?.lat ?? '');

        if (dataUser?.data?.main_logo) {
          setImagePreviewMain(dataUser?.data?.main_logo);
        }
        if (dataUser?.data?.sub_logo) {
          setImagePreviewSub(dataUser?.data?.sub_logo);
        }
      }, 1000); // Delay in milliseconds (1000 ms = 1 second)

      return () => clearTimeout(timer); // Clean up timeout on component unmount or when dataUser changes
    }
  }, [dataUser, setValue]);
  // GET ONE SLUG

  // main logo
  const [imagePreviewMain, setImagePreviewMain] = useState<string | null>(null);
  const handleImageChangeMain = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('main_logo', file);
      setImagePreviewMain(URL.createObjectURL(file));
    }
  };
  // main logo
  // sub logo
  const [imagePreviewSub, setImagePreviewSub] = useState<string | null>(null);
  const handleImageChangeSub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('sub_logo', file);
      setImagePreviewSub(URL.createObjectURL(file));
    }
  };
  // sub logo

  // 
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();
  const axiosPrivate = useAxiosPrivate();

  const onSubmit: SubmitHandler<aboutEditFormData> = async (data) => {
    setLoading(true); // Set loading to true when the form is submitted
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('sub_title', data.sub_title);
    formData.append('description', data.description);
    formData.append('telepon', data.telepon);
    formData.append('email', data.email);
    formData.append('address', data.address);
    formData.append('long', data.long);
    formData.append('lat', data.lat);

    // Memeriksa jika image ada sebelum menambahkannya ke formData
    if (data.main_logo) {
      formData.append('main_logo', data.main_logo);
    }
    // Memeriksa jika image ada sebelum menambahkannya ke formData
    if (data.sub_logo) {
      formData.append('sub_logo', data.sub_logo);
    }

    try {
      await axiosPrivate.put(`/user/company/profile/update/1`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // console.log(data);
      // alert
      showAlert('success', 'Data berhasil diperbarui!');
      // alert
      navigate.push('/data-master/about-company');
      // reset();
    } catch (error: any) {
      // Extract error message from API response
      const errorMessage = error.response?.data?.data?.[0]?.message || 'Gagal memperbarui data!';
      showAlert('error', errorMessage);
    } finally {
      setLoading(false); // Set loading to false once the process is complete
    }
    mutate(`/user/company/profile/get/1`);
  };
  // 
  return (
    <div className='flex flex-col gap-4'>
      <TitleBack href="/data-master/about-company" title="Edit Tentang Perusahaan" />
      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)} className="form shadow-lg flex flex-col gap-5 rounded-xl bg-[#FAFAFA] border border-gray-100 p-6">
        <div className="mb-2 flex flex-col gap-2">
          {/*  */}
          <div className="flex flex-col md:flex-row md:justify-between gap-2 md:lg-3 lg:gap-5">
            <div className="flex flex-col mb-2 w-full">
              <Label className="text-primary mb-2">Judul</Label>
              <Input
                type="text"
                placeholder="Judul"
                {...register('title')}
                className={`${errors.title ? 'border-red-500' : ''}`}
              />
              {errors.title && (
                <HelperError>{errors.title.message}</HelperError>
              )}
            </div>
          </div>
          {/*  */}
          {/*  */}
          <div className="flex flex-col md:flex-row md:justify-between gap-2 md:lg-3 lg:gap-5">
            <div className="flex flex-col mb-2 w-full">
              <Label className="text-primary mb-2">Sub Judul</Label>
              <Input
                type="text"
                placeholder="Sub Judul"
                {...register('sub_title')}
                className={`${errors.sub_title ? 'border-red-500' : ''}`}
              />
              {errors.sub_title && (
                <HelperError>{errors.sub_title.message}</HelperError>
              )}
            </div>
          </div>
          {/*  */}
          {/*  */}
          <div className="flex flex-col md:flex-row md:justify-between gap-2 md:lg-3 lg:gap-5">
            <div className="flex flex-col mb-2 w-full">
              <Label className="text-primary mb-2">Deskripsi</Label>
              <Textarea
                placeholder="Deskripsi"
                {...register('description')}
                className={`${errors.description ? 'border-red-500' : ''}`}
              />
              {errors.description && (
                <HelperError>{errors.description.message}</HelperError>
              )}
            </div>
          </div>
          {/*  */}
          {/*  */}
          <div className="flex flex-col md:flex-row md:justify-between gap-2 md:lg-3 lg:gap-5">
            <div className="flex flex-col mb-2 w-full">
              <Label className="text-primary mb-2">Nomor Telepon</Label>
              <Input
                type="text"
                placeholder="Nomor Telepon"
                {...register('telepon')}
                className={`${errors.telepon ? 'border-red-500' : ''}`}
              />
              {errors.telepon && (
                <HelperError>{errors.telepon.message}</HelperError>
              )}
            </div>
          </div>
          {/*  */}
          {/*  */}
          <div className="flex flex-col md:flex-row md:justify-between gap-2 md:lg-3 lg:gap-5">
            <div className="flex flex-col mb-2 w-full">
              <Label className="text-primary mb-2">Email</Label>
              <Input
                type="text"
                placeholder="Email"
                {...register('email')}
                className={`${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && (
                <HelperError>{errors.email.message}</HelperError>
              )}
            </div>
          </div>
          {/*  */}
          {/*  */}
          <div className="flex flex-col md:flex-row md:justify-between gap-2 md:lg-3 lg:gap-5">
            <div className="flex flex-col mb-2 w-full">
              <Label className="text-primary mb-2">Alamat</Label>
              <Input
                type="text"
                placeholder="Alamat"
                {...register('address')}
                className={`${errors.address ? 'border-red-500' : ''}`}
              />
              {errors.address && (
                <HelperError>{errors.address.message}</HelperError>
              )}
            </div>
          </div>
          {/*  */}
          {/*  */}
          <div className="flex flex-col md:flex-row md:justify-between gap-2 md:lg-3 lg:gap-5">
            <div className="flex flex-col mb-2 w-full">
              <Label className="text-primary mb-2">Latitude</Label>
              <Input
                type="text"
                placeholder="Latitude"
                {...register('lat')}
                className={`${errors.lat ? 'border-red-500' : ''}`}
              />
              {errors.lat && (
                <HelperError>{errors.lat.message}</HelperError>
              )}
            </div>
          </div>
          {/*  */}
          {/*  */}
          <div className="flex flex-col md:flex-row md:justify-between gap-2 md:lg-3 lg:gap-5">
            <div className="flex flex-col mb-2 w-full">
              <Label className="text-primary mb-2">Longitude</Label>
              <Input
                type="text"
                placeholder="Longitude"
                {...register('long')}
                className={`${errors.long ? 'border-red-500' : ''}`}
              />
              {errors.long && (
                <HelperError>{errors.long.message}</HelperError>
              )}
            </div>
          </div>
          {/*  */}
          {/* main upload section */}
          <div className="">
            <div className="flex flex-col mb-2 w-full">
              <Label className="text-primary mb-2">Logo Utama</Label>
              <div className="text-editor h-[260px] bg-white border border-dashed border-[#D9D9D9] rounded-lg overflow-hidden flex justify-center items-center p-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChangeMain}
                  className="hidden"
                  id="main-logo"
                />
                <label
                  htmlFor="main-logo"
                  className="cursor-pointer text-center w-full h-full flex justify-center items-center"
                >
                  {imagePreviewMain ? (
                    <Image
                      src={imagePreviewMain}
                      alt="Preview"
                      width={300} // provide a fallback width
                      height={200} // provide a fallback height
                      className="rounded"
                    />
                  ) : (
                    <p>Click to select file</p>
                  )}
                </label>
              </div>
              {errors.main_logo && (
                <HelperError>{errors.main_logo.message}</HelperError>
              )}
            </div>
          </div>
          {/* sub upload section */}
          <div className="">
            <div className="flex flex-col mb-2 w-full">
              <Label className="text-primary mb-2">Sub Utama</Label>
              <div className="text-editor h-[260px] bg-white border border-dashed border-[#D9D9D9] rounded-lg overflow-hidden flex justify-center items-center p-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChangeSub}
                  className="hidden"
                  id="sub-logo"
                />
                <label
                  htmlFor="sub-logo"
                  className="cursor-pointer text-center w-full h-full flex justify-center items-center"
                >
                  {imagePreviewSub ? (
                    <Image
                      src={imagePreviewSub}
                      alt="Preview"
                      width={300} // provide a fallback width
                      height={200} // provide a fallback height
                      className="rounded"
                    />
                  ) : (
                    <p>Click to select file</p>
                  )}
                </label>
              </div>
              {errors.sub_logo && (
                <HelperError>{errors.sub_logo.message}</HelperError>
              )}
            </div>
          </div>

          {/*  */}
        </div>
        <div className="mb-10 flex justify-end gap-3">
          <Button
            type="submit"
            className="px-12 w-[140px]">
            {loading ? <Loading /> : "Simpan"}
          </Button>
        </div>
      </form>
      {/* form */}
    </div>
  )
}

export default EditPelatihan