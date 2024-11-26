"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

interface SelectItem {
    id: string | number;
    value: string;
}

interface SelectSearchProps {
    items?: SelectItem[]; // Items bisa undefined
    label?: string;
    placeholder?: string;
    value: any;
    onChange: (value: string ) => void;
}

const SelectSearch: React.FC<SelectSearchProps> = ({
    items = [], // Default ke array kosong jika undefined
    label = "Instansi",
    placeholder = "Pilih Instansi",
    value,
    onChange,
}) => {
    const [searchValue, setSearchValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null); // Referensi untuk input

    // Filter items berdasarkan input pencarian
    const filteredItems = items.filter((item) =>
        item.value.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Menangani perubahan input pencarian
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    // Pastikan input tetap fokus setelah render
    useEffect(() => {
        if (inputRef.current) {
            // Timeout untuk memastikan DOM selesai diperbarui
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        }
    }, [filteredItems]); // Fokus ulang jika filteredItems berubah

    return (
        <Select
            value={value}
            onValueChange={onChange}
            onOpenChange={(open) => {
                if (open && inputRef.current) {
                    setTimeout(() => {
                        inputRef.current?.focus(); // Fokus ulang saat dropdown terbuka
                    }, 0);
                }
            }}
        >
            <SelectTrigger className="w-full border border-primary rounded-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="pt-10 bg-white">
                {/* Input pencarian */}
                <div className="px-2 fixed border-b w-full top-0 flex items-center justify-between z-10 bg-white">
                    <Search className="text-slate-400" />
                    <Input
                        ref={inputRef} // Gunakan ref untuk fokus manual
                        placeholder="Search..."
                        className="w-full border-0"
                        value={searchValue}
                        onChange={handleSearchChange}
                    />
                </div>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {/* Menampilkan hasil pencarian atau pesan "data tidak ada" */}
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                                {item.value}
                            </SelectItem>
                        ))
                    ) : (
                        <div className="px-4 py-2 text-gray-500 text-sm text-center">
                            Data tidak ada
                        </div>
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SelectSearch;
