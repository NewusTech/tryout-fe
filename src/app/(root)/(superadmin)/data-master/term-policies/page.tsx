"use client";

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import 'react-quill/dist/quill.snow.css';
import Loading from '@/components/ui/Loading';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import TitleAdmin from '@/components/Superadmin/Title';
import { Label } from '@/components/ui/label';
import HelperError from '@/components/ui/HelperError';
import { putSubmitTnc, useGetTnc } from '@/services/api';
import { tnc, tncFormData } from '@/validations';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const TncPage = () => {
    const [termContent, setTermContent] = useState(''); // State for editor content
    const [policyContent, setPolicyContent] = useState(''); // State for editor content
    const [loading, setLoading] = useState(false);

    // INTEGRASI
    const { data } = useGetTnc();
    // INTEGRASI

    // Form setup using React Hook Form and Zod
    const { register, setValue, handleSubmit, formState: { errors }, reset } = useForm<tncFormData>({
        resolver: zodResolver(tnc),
    });

    // Populate editor with initial data on mount
    useEffect(() => {
        if (data?.data?.term_condition) {
            setTermContent(data?.data.term_condition); // Set editor content from the fetched data
            setValue('term_condition', data?.data?.term_condition); // Set form value for desc
        }
        if (data?.data?.privacy_policy) {
            setPolicyContent(data?.data.privacy_policy); // Set editor content from the fetched data
            setValue('privacy_policy', data?.data?.privacy_policy); // Set form value for desc
        }
    }, [data, setValue]);

    // 
    const { handlePostSubmit } = putSubmitTnc();

    const onSubmit: SubmitHandler<tncFormData> = (data) => {
        handlePostSubmit(data, setLoading);
    };
    // 

    // Reset both the form and the ReactQuill editor
    const resetForm = () => {
        reset(); // Reset form values
        setTermContent(''); // Clear the editor content
    };

    return (
        <div>
            <TitleAdmin title="Syarat Ketentuan & Kebijakan Privasi" />
            <div className="wrap border shadow border-line-stroke flex my-4 flex-col rounded-xl overflow-hidden">
                <div className="head bg-primary text-sm md:text-base text-white py-3 md:py-4 text-center">
                    Syarat dan Ketentuan
                </div>
                <div className="desk text-justify p-4 text-sm">
                    <div
                        className="prose max-w-none text-justify text-xs md:text-base"
                        dangerouslySetInnerHTML={{ __html: data?.data?.term_condition || "Tidak Ada Syarat dan Ketentuan" }}
                    />
                </div>
            </div>
            {/*  */}
            <div className="wrap border shadow border-line-stroke flex my-4 flex-col rounded-xl overflow-hidden mb-10">
                <div className="head bg-primary text-sm md:text-base text-white py-3 md:py-4 text-center">
                    Kebijakan Privasi
                </div>
                <div className="desk text-justify p-4 text-sm">
                    <div
                        className="prose max-w-none text-justify text-xs md:text-base"
                        dangerouslySetInnerHTML={{ __html: data?.data?.privacy_policy || "Tidak Ada Kebijakan Privasi" }}
                    />
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                <div className="">
                    <Label className="text-primary">Syarat dan Ketentuan</Label>
                    <ReactQuill
                        className='h-[250px] mt-2'
                        value={termContent} // Controlled value
                        onChange={(value) => {
                            setTermContent(value); // Update state for editor content
                            setValue('term_condition', value); // Update form value
                        }}
                    />
                    {errors.term_condition && (
                        <HelperError>{errors.term_condition.message}</HelperError>
                    )}
                </div>
                <div className="mt-[60px]">
                    <Label className="text-primary">Kebijakan Privasi</Label>
                    <ReactQuill
                        className='h-[250px] mt-2'
                        value={policyContent} // Controlled value
                        onChange={(value) => {
                            setPolicyContent(value); // Update state for editor content
                            setValue('privacy_policy', value); // Update form value
                        }}
                    />
                    {errors.privacy_policy && (
                        <HelperError>{errors.privacy_policy.message}</HelperError>
                    )}
                </div>
                <div className="w-full flex justify-center mt-[60px]">
                    <Button
                        type="submit"
                        className="px-12 w-[200px]">
                        {loading ? <Loading /> : "Simpan Perubahan"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default TncPage;
