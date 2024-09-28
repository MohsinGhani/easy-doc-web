import * as React from "react";
import {
  addDays,
  format,
  isWithinInterval,
  setYear,
  startOfDay,
  endOfDay,
} from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Table } from "@tanstack/react-table";
import { TimePicker } from "./time-picker";

interface DatePickerWithRangeProps<TData> {
  table: Table<TData>;
  className?: string;
}

export function DatePickerWithRange<TData>({
  className,
  table,
}: DatePickerWithRangeProps<TData>) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
  const [startTime, setStartTime] = React.useState<Date>(new Date());
  const [endTime, setEndTime] = React.useState<Date>(new Date());

  const filterTableData = React.useCallback(() => {
    if (dateRange?.from && dateRange?.to) {
      const start = setYear(
        new Date(
          dateRange.from.setHours(startTime.getHours(), startTime.getMinutes())
        ),
        2024
      );
      const end = setYear(
        new Date(
          dateRange.to.setHours(endTime.getHours(), endTime.getMinutes())
        ),
        2024
      );

      table.getColumn("scheduled_date")?.setFilterValue({ start, end });
    } else {
      table.getColumn("scheduled_date")?.setFilterValue(undefined);
    }
  }, [table, dateRange, startTime, endTime]);

  React.useEffect(() => {
    filterTableData();
  }, [filterTableData]);

  const handleDateSelect = (newDateRange: DateRange | undefined) => {
    if (newDateRange?.from && newDateRange?.to) {
      const diffTime = Math.abs(
        newDateRange.to.getTime() - newDateRange.from.getTime()
      );
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 90) {
        // If range is more than 90 days, adjust the 'to' date
        newDateRange.to = addDays(newDateRange.from, 90);
      }
    }
    setDateRange(newDateRange);
  };

  return (
    <Popover>
      <PopoverTrigger
        className={cn(buttonVariants({ variant: "outline" }))}
        id="date"
      >
        <div
          className={cn(
            "flex items-center justify-start text-left font-normal overflow-hidden",
            !dateRange && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, "MMM dd, HH:mm")} -{" "}
                {format(dateRange.to, "MMM dd, HH:mm")}
              </>
            ) : (
              format(dateRange.from, "MMM dd, HH:mm")
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="p-4 space-y-4">
          <Calendar
            mode="range"
            defaultMonth={new Date()}
            selected={dateRange}
            onSelect={handleDateSelect}
            numberOfMonths={2}
            disabled={(date) =>
              date < startOfDay(new Date()) || date > addDays(new Date(), 90)
            }
          />
          <div className="flex justify-between">
            <TimePicker
              value={startTime}
              onChange={setStartTime}
              label="Start Time"
            />
            <TimePicker
              value={endTime}
              onChange={setEndTime}
              label="End Time"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
