import React from "react";
import { Input } from "./ui/input";
import { LucideSearch } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  searchKey?: string;
}

const SearchInput = ({
  className = "",
  value,
  setValue,
  searchKey = "email",
}: SearchInputProps) => {
  return (
    <div className={cn("relative w-full", className)}>
      <Input
        placeholder={`Search by ${searchKey}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="absolute inset-y-0 right-0 flex items-center">
        <span className="mr-2 text-gray-500">
          <LucideSearch className="h-5 w-5" />
        </span>
      </div>
    </div>
  );
};

export default SearchInput;
