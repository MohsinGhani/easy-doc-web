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

interface MultiSelectWithSearchProps {
  items: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
  onSelect: (selectedItems: string[]) => void; // Returns all selected items
  defaultValues?: string[];
}

export function MultiSelectWithSearch({
  items,
  placeholder = "Select items...",
  onSelect,
  className,
  defaultValues = [],
}: MultiSelectWithSearchProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValues);
  const [customValue, setCustomValue] = React.useState("");

  // Handle selecting and unselecting items
  const handleSelect = (currentValue: string) => {
    const isSelected = selectedValues.includes(currentValue);

    const newSelectedValues = isSelected
      ? selectedValues.filter((value) => value !== currentValue) // Remove if selected
      : [...selectedValues, currentValue]; // Add if not selected

    setSelectedValues(newSelectedValues);
    onSelect(newSelectedValues);
  };

  // Handle adding custom items
  const handleAddCustom = () => {
    const newItem = { value: customValue.toLowerCase(), label: customValue };
    items.push(newItem); // Add the custom item to the list
    const newSelectedValues = [...selectedValues, newItem.value];
    setSelectedValues(newSelectedValues);
    setOpen(false);
    setCustomValue("");
    onSelect(newSelectedValues);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          {selectedValues.length > 0
            ? `${selectedValues.length} selected`
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
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => handleSelect(item.value)}
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
              {customValue && (
                <CommandItem onSelect={handleAddCustom}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add &quot;{customValue}&quot;
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
