"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Plus, X } from "lucide-react";
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
import { Badge } from "@/components/ui/badge"; // Assuming you have a Badge component for selected items
import { toast } from "sonner";

interface MultiSelectWithSearchProps {
  items: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
  onChange: (values: string[]) => void;
  defaultValues?: string[];
  enableCreation?: boolean;
  maxSelected?: number; // Add the maxSelected prop
  maxSelectedMessage?: string; // Add the maxSelectedMessage prop
}

export function MultiSelectWithSearch({
  items: initialItems = [],
  placeholder = "Select items...",
  className,
  onChange,
  defaultValues = [],
  enableCreation = true,
  maxSelected = Infinity,
  maxSelectedMessage = `You can only select up to ${maxSelected} items.`,
}: MultiSelectWithSearchProps) {
  const [open, setOpen] = React.useState(false);
  const [customValue, setCustomValue] = React.useState("");
  const [selectedValues, setSelectedValues] = React.useState(defaultValues);
  const [items, setItems] = React.useState(initialItems);
  const [filteredItems, setFilteredItems] = React.useState(initialItems);

  React.useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  React.useEffect(() => {
    setSelectedValues(defaultValues);
  }, [defaultValues]);

  React.useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        item.label.toLowerCase().includes(customValue.toLowerCase())
      )
    );
  }, [customValue, items]);

  const handleSelect = (selectedValue: string) => {
    const alreadySelected = selectedValues.includes(selectedValue);

    let newSelectedValues;
    if (alreadySelected) {
      newSelectedValues = selectedValues.filter((val) => val !== selectedValue);
    } else {
      // Check if maxSelected is reached
      if (selectedValues.length >= maxSelected) {
        toast.error(maxSelectedMessage);
        setOpen(false);
        return; // Prevent adding more than maxSelected items
      }
      newSelectedValues = [...selectedValues, selectedValue];
    }

    setSelectedValues(newSelectedValues);
    onChange(newSelectedValues);
  };

  const handleAddCustom = () => {
    if (selectedValues.length >= maxSelected) {
      toast.error(maxSelectedMessage);
      setOpen(false);
      return; // Prevent adding more than maxSelected items
    }
    const newItem = { value: customValue.toLowerCase(), label: customValue };
    setItems((prevItems) => [...prevItems, newItem]);
    setSelectedValues((prevSelected) => [...prevSelected, newItem.value]);
    onChange([...selectedValues, newItem.value]);
    setCustomValue("");
    setOpen(false);
  };

  const handleRemove = (value: string) => {
    const newSelectedValues = selectedValues.filter((val) => val !== value);
    setSelectedValues(newSelectedValues);
    onChange(newSelectedValues);
  };

  const handleClearAll = () => {
    setSelectedValues([]);
    onChange([]);
  };

  return (
    <div className="w-full">
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
              {selectedValues.length > 0
                ? selectedValues
                    .map(
                      (value) =>
                        items.find((item) => item.value === value)?.label
                    )
                    .join(", ")
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
              {enableCreation &&
                customValue &&
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
                      value={item.label}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedValues.includes(item.value)
                            ? "opacity-100"
                            : "opacity-0"
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

      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedValues.map((value) => {
            const label = items.find((item) => item.value === value)?.label;
            return (
              <Badge key={value} className="flex items-center gap-2">
                {label}
                <button className="ml-1" onClick={() => handleRemove(value)}>
                  <X className="h-4 w-4" />
                </button>
              </Badge>
            );
          })}
          <Button variant="ghost" size="sm" onClick={handleClearAll}>
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
}
