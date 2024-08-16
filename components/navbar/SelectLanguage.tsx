import { Globe } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectLanguage = () => {
  return (
    <Select>
      <SelectTrigger className="font-semibold border-none shadow-none flex">
        <div className="flex items-center gap-1 cursor-pointer">
          <Globe className="size-6" />
          <SelectValue placeholder="Language" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="de">German</SelectItem>
        <SelectItem value="ar">Arabic</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectLanguage;
