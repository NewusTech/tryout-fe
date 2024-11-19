import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    "flex w-full rounded-[20px] border border-[#D9D9D9] bg-white p-3 text-md ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#AAAAB4] placeholder:text-sm md:placeholder:text-base focus-visible:outline-none h-[160px] focus-visible:ring-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Textarea.displayName = "Textarea"

export { Textarea }
