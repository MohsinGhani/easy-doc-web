"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Filter, LucideSearch } from "lucide-react";
import { CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { DatePickerWithRange } from "../ui/date-range-picker";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Separator } from "../ui/separator";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isPrimaryHeader?: boolean;
  title: string;
  searchKey?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isPrimaryHeader = true,
  searchKey = "email",
  title,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <>
      <CardHeader className="px-0">
        {!isPrimaryHeader ? (
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">{title}</CardTitle>
            <Link
              className="text-sm font-medium text-primary"
              href="/patients-requests"
            >
              View All
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative col-span-2">
              <Input
                placeholder={`Search by ${searchKey}`}
                id={searchKey}
                value={
                  (table
                    .getColumn(`${searchKey}`)
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn(`${searchKey}`)
                    ?.setFilterValue(event.target.value)
                }
                autoComplete="off"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <span className="mr-2 text-gray-500">
                  <LucideSearch className="h-5 w-5" />
                </span>
              </div>
            </div>

            <DatePickerWithRange table={table} className="" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild className="">
                <Button variant={"outline"} className="w-full md:w-28px-4 py-2">
                  <Filter className="w-4 h-4 mr-2" />
                  <span>Filter by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanSort())
                  .map((column) => {
                    return (
                      <DropdownMenuItem
                        key={column.id}
                        className="capitalize"
                        onClick={() =>
                          column.toggleSorting(column.getIsSorted() === "asc")
                        }
                      >
                        {column.id}
                      </DropdownMenuItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </CardHeader>

      {!isPrimaryHeader && <Separator />}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={cn(header.column.columnDef.meta?.className)}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(cell.column.columnDef.meta?.className)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => table.getCanPreviousPage() && table.previousPage()}
              className={cn(
                table.getCanPreviousPage()
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
              )}
            >
              Previous
            </PaginationPrevious>
          </PaginationItem>
          {[...Array(table.getPageCount())].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => table.setPageIndex(index)}
                isActive={table.getState().pagination.pageIndex === index}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => table.getCanNextPage() && table.nextPage()}
              className={cn(
                table.getCanNextPage() ? "cursor-pointer" : "cursor-not-allowed"
              )}
            >
              Next
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
