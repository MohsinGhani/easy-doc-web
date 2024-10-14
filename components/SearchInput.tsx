import React from "react";
import { LucideSearch } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  searchKey?: string;
  // Adding children in case `Input` might have other props like `aria-*` attributes
  [key: string]: any;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className = "", value, setValue, searchKey = "email", ...props }, ref) => {
    return (
      <div className={cn("relative w-full flex items-center", className)}>
        <div className="absolute left-3">
          <LucideSearch className="h-5 w-5" />
        </div>
        <input
          type="text"
          id={searchKey}
          className="w-full pl-11 pr-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent placeholder-gray-400 text-sm shadow-sm flex-1"
          placeholder={`Search ${searchKey}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          {...props}
          ref={ref}
          autoComplete="off"
        />
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
