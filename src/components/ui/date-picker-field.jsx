import * as React from "react"
import { format, parseISO, isBefore, startOfDay } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Drop-in replacement for a native <input type="date">: keeps the same
// 'YYYY-MM-DD' value/onChange({ target: { name, value } }) contract, but
// always displays and lets the user pick dates as DD/MM/YYYY regardless of
// the visitor's browser/OS locale.
function DatePickerField({
  id,
  name,
  value,
  onChange,
  min,
  max,
  disabled,
  className,
  placeholder = "Select date",
  "data-testid": dataTestId,
}) {
  const selected = value ? parseISO(value) : undefined
  const minDate = min ? startOfDay(parseISO(min)) : undefined
  const maxDate = max ? startOfDay(parseISO(max)) : undefined

  const handleSelect = (date) => {
    if (!date) return
    const formatted = format(date, "yyyy-MM-dd")
    onChange?.({ target: { name, value: formatted } })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          id={id}
          disabled={disabled}
          data-testid={dataTestId}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
          {value ? format(selected, "dd/MM/yyyy") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={handleSelect}
          disabled={(date) => {
            const day = startOfDay(date)
            if (minDate && isBefore(day, minDate)) return true
            if (maxDate && isBefore(maxDate, day)) return true
            return false
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePickerField }
