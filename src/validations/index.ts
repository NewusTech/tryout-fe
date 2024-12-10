"use client";

import { z } from "zod";

// Master Data Tipe Paket
export const typePackage = z
  .object({
    name: z.string().min(1, { message: "Jawaban tidak boleh kosong!" }),
  })
  .required();
export type typePackageFormData = z.infer<typeof typePackage>;

// Master Data Tipe Paket
export const typePayment = z
  .object({
    title: z.string().min(1, { message: "Jawaban tidak boleh kosong!" }),
  })
  .required();
export type typePaymentFormData = z.infer<typeof typePayment>;

// Master Data Kenapa Kami
export const whyUs = z
  .object({
    title: z.string().min(1, { message: "Jawaban tidak boleh kosong!" }),
    description: z.string().min(1, { message: "Jawaban tidak boleh kosong!" }),
  })
  .required();
export type whyUsFormData = z.infer<typeof whyUs>;

// sosial media
export const socialMedia = z
  .object({
    title: z.string().min(1, { message: "Jawaban tidak boleh kosong!" }),
    link: z.string().min(1, { message: "Jawaban tidak boleh kosong!" }),
  })
  .required();
export type socialMediaFormData = z.infer<typeof socialMedia>;

// Master Data Tipe Paket
export const typeQuestion = z
  .object({
    name: z.string().min(1, { message: "Jawaban tidak boleh kosong!" }),
  })
  .required();
export type typeQuestionFormData = z.infer<typeof typeQuestion>;

// Master Data SNK
export const tnc = z
  .object({
    term_condition: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    privacy_policy: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
  })
  .required();
export type tncFormData = z.infer<typeof tnc>;

// Master Data Banner
export const banner = z
  .object({
    image: z
      .instanceof(File)
      .refine((file) => file.size > 0, { message: "Gambar wajib diisi" }),
  })
  .required();
export type bannerFormData = z.infer<typeof banner>;

// Master Data edit banner
export const bannerEdit = z.object({
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size > 0, {
      message: "Gambar wajib diisi!",
    }),
});
export type bannerEditFormData = z.infer<typeof bannerEdit>;

// Master Data edit about
export const aboutEdit = z.object({
  title: z.string().min(1, { message: "Jawaban tidak boleh kosong!" }),
  sub_title: z.string().min(1, { message: "Jawaban tidak boleh kosong!" }),
  description: z.string().min(1, { message: "Jawaban tidak boleh kosong!" }),
  telepon: z.string().min(1, { message: "Jawaban tidak boleh kosong!" }),
  email: z.string().min(1, { message: "Jawaban tidak boleh kosong!" }),
  address: z.string().min(1, { message: "Jawaban tidak boleh kosong!" }),
  lat: z.string().min(0, { message: "Jawaban tidak boleh kosong!" }),
  long: z.string().min(0, { message: "Jawaban tidak boleh kosong!" }),
  main_logo: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size > 0, {
      message: "Gambar wajib diisi!",
    }),
  sub_logo: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size > 0, {
      message: "Gambar wajib diisi!",
    }),
});
export type aboutEditFormData = z.infer<typeof aboutEdit>;

// Master Data edit about
export const sertifikatEdit = z.object({
  title: z.string().min(1, { message: "Jawaban tidak boleh kosong!" }),
  name: z.string().min(1, { message: "Jawaban tidak boleh kosong!" }),
  sign: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size > 0, {
      message: "Gambar wajib diisi!",
    }),
});
export type sertifikatEditFormData = z.infer<typeof sertifikatEdit>;

// paket tryout
export const packageTryout = z
  .object({
    title: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    description: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    duration: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    price: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    typepackage_id: z
    .preprocess(
        (val) => Number(val),
        z.number().min(1, { message: "Jawaban tidak boleh kosong!" })
      ),
    total_question: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
  })
  .required();
export type packageTryoutFormData = z.infer<typeof packageTryout>;

// paket edit tryout
export const editPackageTryout = z
  .object({
    title: z
      .string()
      .min(0, { message: "Jawaban tidak boleh kosong!" }),
    description: z
      .string()
      .min(0, { message: "Jawaban tidak boleh kosong!" }),
    duration: z
      .string()
      .min(0, { message: "Jawaban tidak boleh kosong!" }),
    price: z
      .string()
      .min(0, { message: "Jawaban tidak boleh kosong!" }),
    typepackage_id: z
    .preprocess(
        (val) => Number(val),
        z.number().min(0, { message: "Jawaban tidak boleh kosong!" })
      ),
    total_question: z
      .string()
      .min(0, { message: "Jawaban tidak boleh kosong!" }),
  })
export type editPackageTryoutFormData = z.infer<typeof editPackageTryout>;

// Payment user
export const payment = z
.object({
  name: z.string().min(1, { message: "Jawaban tidak boleh kosong!" }),
  email: z.string().min(1, { message: "Jawaban tidak boleh kosong!" }),
  telepon: z.string().min(1, { message: "Jawaban tidak boleh kosong!" }),
  password: z.string().min(6, { message: "Password minimal harus 6 karakter" }),
  price: z.string().min(1, { message: "Jawaban tidak boleh kosong!" }),
  receipt: z
  .instanceof(File)
  .refine((file) => file.size > 0, { message: "Gambar wajib diisi" }),
  typepackage_id: z
    .preprocess(
      (val) => Number(val),
      z.number().min(1, { message: "Jawaban tidak boleh kosong!" })
    ),
  })
  .required();
  export type paymentFormData = z.infer<typeof payment>;

  // update user profile
  // Master Data edit about
export const profileEdit = z.object({
  name: z.string().min(0, { message: "Jawaban tidak boleh kosong!" }),
  email: z.string().min(0, { message: "Jawaban tidak boleh kosong!" }),
  telepon: z.string().min(0, { message: "Jawaban tidak boleh kosong!" }),
  alamat: z.string().min(0, { message: "Jawaban tidak boleh kosong!" }),
  tempat_lahir : z.string().min(0, { message: "Jawaban tidak boleh kosong!" }),
  asal_instansi : z.string().min(0, { message: "Jawaban tidak boleh kosong!" }),
  // tgl_lahir : z.string().min(1, { message: "Jawaban tidak boleh kosong!" }),
  provinsi_id: z
  .preprocess(
    (val) => Number(val),
    z.number().min(0, { message: "Jawaban tidak boleh kosong!" })
  ),
  kota_id: z
    .preprocess(
      (val) => Number(val),
      z.number().min(0, { message: "Jawaban tidak boleh kosong!" })
    ),
  gender: z.string({
      required_error: "Jawaban tidak boleh kosong!",
    }),
  image_profile: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size > 0, {
      message: "Gambar wajib diisi!",
    }),
});
export type profileEditFormData = z.infer<typeof profileEdit>;

// jadwal tryout
export const scheduleTryout = z
  .object({
    title: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    packagetryout_id: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    tanggal: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    waktu: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
  })
  .required();
export type scheduleTryoutFormData = z.infer<typeof scheduleTryout>;

// create admin
export const adminTryout = z
  .object({
    name: z.string().min(1, { message: "Jawaban tidak boleh kosong!" }),
    email: z.string().min(1, { message: "Jawaban tidak boleh kosong!" }),
    password: z.string().min(1, { message: "Jawaban tidak boleh kosong!" }),
  })
  .required();
export type adminTryoutFormData = z.infer<typeof adminTryout>;
