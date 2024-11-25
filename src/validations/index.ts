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
export type bannerEditFormData = z.infer<typeof banner>;
