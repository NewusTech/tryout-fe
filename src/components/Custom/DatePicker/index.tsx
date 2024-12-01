"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  buttonClassName?: string;
  calendarClassName?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = "Pick a date",
  buttonClassName,
  calendarClassName,
}) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    value
  );

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    onChange?.(date);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outlinePrimary"}
          className={cn(
            "w-[280px] justify-between text-left font-normal",
            !selectedDate && "text-muted-foreground",
            buttonClassName
          )}
        >
          <p className="text-primary">
            {selectedDate ? format(selectedDate, "dd/MM/yyyy") : <span className="text-xs">{placeholder}</span>}
          </p>
          <CalendarIcon className="mr-2 text-primary h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-auto p-0 bg-white", calendarClassName)}>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
