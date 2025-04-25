"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { JSX } from "react";

type Column<T> = {
  header: string;
  accessor: keyof T | string;
  sortable?: boolean;
};

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  sortConfig?: { key: string; direction: "asc" | "desc" | undefined };
  onSortChange?: (key: string) => void;
}

export function DataTable<
  T extends Record<string, string | number | boolean | JSX.Element>
>({ columns, data, sortConfig, onSortChange }: DataTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col, i) => (
            <TableHead
              key={i}
              onClick={() =>
                col.sortable && onSortChange?.(col.accessor as string)
              }
            >
              <div className="flex gap-1 items-center cursor-pointer">
                <span>{col.header}</span>
                {col.sortable && sortConfig?.key === col.accessor && (
                  <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                )}
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((col, colIndex) => (
              <TableCell key={colIndex}>
                {row[col.accessor as keyof T] ?? "-"}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
