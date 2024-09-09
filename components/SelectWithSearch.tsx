"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
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

interface SelectWithSearchProps {
  items: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
  onChange: (value: string) => void;
  defaultValue?: string;
}

export function SelectWithSearch({
  items,
  placeholder = "Select an item...",
  className,
  onChange,
  defaultValue = "",
}: SelectWithSearchProps) {
  const [open, setOpen] = React.useState(false);
  const [customValue, setCustomValue] = React.useState("");
  const [value, setValue] = React.useState(defaultValue);

  // Filter items based on the search input
  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(customValue.toLowerCase())
  );

  const handleSelect = (selectedValue: string | null) => {
    const newValue = selectedValue === value ? "" : selectedValue;
    setValue(newValue!);
    setOpen(false);
    onChange(newValue!);
  };

  const handleAddCustom = () => {
    const newItem = { value: customValue.toLowerCase(), label: customValue };
    items.push(newItem); // Add new item to list
    setValue(newItem.value);
    setOpen(false);
    onChange(newItem.value);
    setCustomValue("");
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-[200px] justify-between", className)}
          >
            {value
              ? items.find((item) => item.value === value)?.label
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder={`Search ${placeholder.toLowerCase()}`}
              onValueChange={setCustomValue}
            />
            <CommandList>
              {/* Add new custom value option */}
              {customValue && (
                <CommandItem onSelect={handleAddCustom}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add &quot;{customValue}&quot;
                </CommandItem>
              )}

              {filteredItems.length === 0 ? (
                <CommandEmpty>No item found.</CommandEmpty>
              ) : (
                <CommandGroup>
                  {filteredItems.map((item) => (
                    <CommandItem
                      key={item.value}
                      onSelect={() => handleSelect(item.value)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === item.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
