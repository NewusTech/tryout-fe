"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

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
import { cn } from "@/lib/utils";
import { SelectSearchProps } from "@/types/interface";

const SelectSearch: React.FC<SelectSearchProps> = ({
  data,
  placeholder,
  type,
  valueId,
  setValueId,
}) => {
  const [open, setOpen] = React.useState(false);

  if (type === "language") {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between rounded-full"
          >
            {valueId?.id
              ? data?.find((v: any) => v.value === valueId.id)?.label
              : `Pilih ${placeholder}`}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0">
          <Command>
            <CommandInput placeholder={`Cari ${placeholder}`} />
            <CommandList>
              <CommandEmpty>No data found.</CommandEmpty>
              <CommandGroup>
                {data?.map((v: any, index: any) => (
                  <CommandItem
                    key={v.id}
                    value={v.label}
                    onSelect={() => {
                      setValueId && setValueId({ id: v.value, label: v.label });
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        valueId?.id === v.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {v.label}
                    {v && index === 0 && (
                      <p className="text-green-500 ml-3 italic text-xs">
                        Terbaru
                      </p>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outlinePrimary"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between rounded-full"
        >
          {valueId?.id
            ? data?.find((v: any) => v.value === valueId.id)?.label
            : `Pilih ${placeholder}`}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-[400px] p-0 bg-white">
        <Command>
          <CommandInput placeholder={`Cari ${placeholder}`} />
          <CommandList>
            <CommandEmpty>No data found.</CommandEmpty>
            <CommandGroup>
              {data?.map((v: any) => (
                <CommandItem
                  className="hover:bg-primary/10"
                  key={v.id}
                  value={v.label}
                  onSelect={() => {
                    setValueId && setValueId({ id: v.value, label: v.label });
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      valueId?.id === v.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {v.label}
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