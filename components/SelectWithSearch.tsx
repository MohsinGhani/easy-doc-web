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
  items: initialItems,
  placeholder = "Select an item...",
  className,
  onChange,
  defaultValue = "",
}: SelectWithSearchProps) {
  const [open, setOpen] = React.useState(false);
  const [customValue, setCustomValue] = React.useState("");
  const [value, setValue] = React.useState(defaultValue);
  const [items, setItems] = React.useState(initialItems);

  React.useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  React.useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

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
    setItems((prevItems) => [...prevItems, newItem]); // Add new item to list state
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
            className={cn(
              "w-full justify-between max-w-full text-left truncate",
              className
            )}
          >
            <span className="max-w-[90%] truncate">
              {value
                ? items.find((item) => item.value === value)?.label
                : placeholder}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder={`Search ${placeholder.toLowerCase()}`}
              onValueChange={setCustomValue}
              value={customValue}
            />
            <CommandList>
              {/* Add new custom value option */}
              {customValue &&
                !items.some((item) => item.label === customValue) && (
                  <CommandItem onSelect={handleAddCustom}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add &quot;{customValue}&quot;
                  </CommandItem>
                )}

              {filteredItems.length === 0 ? (
                <CommandEmpty>No items found.</CommandEmpty>
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
