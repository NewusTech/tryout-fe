"use client";

import { z } from "zod";

// Master Data Tipe Paket
export const typePackage = z
  .object({
    name: z.string().min(1, { message: "Jawaban tidak boleh kosong!" }),
  })
  .required();
// Convert Zod schema to TypeScript type
export type typePackageFormData = z.infer<typeof typePackage>;

