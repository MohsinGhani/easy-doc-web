"use client";

import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
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
import { cn, lowerCase } from "@/lib/utils";
import countries from "@/data/countries.json";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setCountryValue,
  setOpenCountryDropdown,
} from "@/lib/features/common/dropdownSlice";

interface CountryDropdownProps {
  disabled?: boolean;
}

const CountryDropdown = ({ disabled }: CountryDropdownProps) => {
  const dispatch = useAppDispatch();
  const { countryValue, openCountryDropdown } = useAppSelector(
    (state) => state.dropdown
  );

  const C = countries as CountryProps[];
  const handleCountrySelect = (currentValue: CountryProps) => {
    console.log("🚀 ~ handleCountrySelect ~ currentValue:", currentValue);
    dispatch(setCountryValue(currentValue.iso2));
    dispatch(setOpenCountryDropdown(false));
  };

  const toggleDropdown = (isOpen: boolean) => {
    dispatch(setOpenCountryDropdown(isOpen));
  };

  return (
    <Popover open={openCountryDropdown} onOpenChange={toggleDropdown}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={openCountryDropdown}
          disabled={disabled}
        >
          <span>
            {countryValue ? (
              <div className="flex items-end gap-2">
                <span>
                  {
                    countries.find(
                      (country) => lowerCase(country.name) === countryValue
                    )?.emoji
                  }
                </span>
                <span>
                  {
                    countries.find(
                      (country) => lowerCase(country.name) === countryValue
                    )?.name
                  }
                </span>
              </div>
            ) : (
              <span>Select Country...</span>
            )}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] rounded-[6px] border border-[#27272a] p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {C.map((country) => (
                <CommandItem
                  key={country.id}
                  value={country.name}
                  onSelect={(currentValue) => handleCountrySelect(country)}
                  className="flex cursor-pointer items-center justify-between text-xs hover:!bg-[#27272a] hover:!text-white"
                >
                  <div className="flex items-end gap-2">
                    <span>{country.emoji}</span>
                    <span className="">{country.name}</span>
                  </div>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      countryValue === lowerCase(country.name)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CountryDropdown;
