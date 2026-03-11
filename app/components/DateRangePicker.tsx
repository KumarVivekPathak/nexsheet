"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { CalendarIcon } from "lucide-react"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

export function DatePickerWithRange({ onChange }: { onChange?: (range: DateRange | undefined) => void }) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: undefined,
        to: new Date(),
    })

    const handleSelect = (range: DateRange | undefined) => {
        setDate(range)
        onChange?.(range)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>

                <Button
                    variant="outline"
                    className="
                        h-[38px] 
                        min-w-[210px] 
                        justify-start 
                        text-[0.82rem] 
                        font-normal
                        bg-[rgba(255,255,255,0.05)]
                        border-[rgba(212,175,55,0.2)]
                        text-white
                        hover:bg-[rgba(255,255,255,0.08)]
                        hover:border-[rgba(212,175,55,0.35)]
                        "
                >
                    <CalendarIcon className="mr-2 h-4 w-4 text-[rgba(212,175,55,0.6)]" />

                    {date?.from ? (
                        date.to ? (
                            <>
                                {format(date.from, "dd MMM")} - {format(date.to, "dd MMM")}
                            </>
                        ) : (
                            format(date.from, "dd MMM")
                        )
                    ) : (
                        <span className="text-white/40">
                            Date Range
                        </span>
                    )}
                </Button>

            </PopoverTrigger>
            <PopoverContent
                align="start"
                className="
                w-auto  
                bg-[rgba(10,14,26,0.98)]
                border border-[rgba(212,175,55,0.2)]
                backdrop-blur-xl
                rounded-xl
                shadow-xl
            "
            >

                <Calendar
                    mode="range"
                    selected={date}
                    onSelect={handleSelect}
                    numberOfMonths={1}
                    defaultMonth={date?.from}
                    disabled={{ after: new Date() }}
                    className="text-white"
                />

            </PopoverContent>
        </Popover>
    )
}