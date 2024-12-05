"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

// Contoh data, bisa diganti dengan data dinamis
const frameworks = [
    { value: "next.js", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
];

interface SelectSearchProps {
    items: { value: string; label: string }[];
    label: string;
    className?: string;
    placeholder: string;
    value: string | number;
    onChange: (value: string) => void;
}

const SelectSearch: React.FC<SelectSearchProps> = ({
    items,
    label,
    className,
    placeholder,
    value,
    onChange,
}) => {
    const [open, setOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState("");

    // Filter item berdasarkan pencarian
    const filteredItems = items.filter((item) =>
        item.label.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open ? "true" : "false"}
                    className={`w-full justify-between ${className}`}
                >
                    {value
                        ? items.find((item) => item.value === value)?.label
                        : placeholder}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="md:w-[400px] w-[250px] p-0 bg-white">
                <Command>
                    {/* Gunakan onChange dengan tipe yang sesuai */}
                    <div className="flex items-center border-b border-[#D9D9D9] px-3">
                        <Search className="mr-1 h-4 w-4 shrink-0 opacity-50" />
                        <input
                            placeholder={placeholder}
                            className="h-9 text-sm placeholder:text-sm pr-4 py-2 w-full focus-visible:outline-none focus-visible:ring-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                            value={searchValue}
                            // Pastikan tipe e sudah sesuai dengan React.ChangeEvent<HTMLInputElement>
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setSearchValue(e.target.value)
                            }
                        />
                    </div>
                    <CommandList>
                        <CommandEmpty>Data tidak ada</CommandEmpty>
                        <CommandGroup>
                            {filteredItems.map((item) => (
                                <CommandItem
                                    className="hover:bg-primary/5 cursor-pointer"
                                    key={item.value}
                                    value={item.value}
                                    onSelect={(currentValue) => {
                                        onChange(currentValue === value ? "" : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    {item.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === item.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default SelectSearch;
