import React from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const SearchInput = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <SearchIcon className="w-5 h-5 text-muted-foreground" />
      </div>
      <Input
        type="search"
        placeholder="Search..."
        className="w-full pl-10 pr-4 py-2 text-sm rounded-md border border-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
      />
    </div>
  );
};

export default SearchInput;
