import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";

export default function SortInput() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span>Sort by</span>
            <ListFilter className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <DropdownMenuRadioGroup value="newest">
            <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="low">
              Price: Low to High
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="high">
              Price: High to Low
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
