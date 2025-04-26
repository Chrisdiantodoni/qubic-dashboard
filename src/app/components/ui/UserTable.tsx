"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchBar } from "./SearchBar";
import { Label } from "@/components/ui/label";
import { PaginationComponent } from "./Pagination";
import { User } from "@/app/(dashboard)/user/action";
import { DataTable } from "@/components/data-table";
import { useMemo, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Eye, Pencil } from "lucide-react";
import Link from "next/link";

interface UserTableProps {
  users: User[];
}

export default function UserTable({ users }: UserTableProps) {
  const [search, setSearch] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(10); // Default page size
  const [currentPage, setCurrentPage] = useState<number>(1); // Default page 1
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users); // Users after search filter
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | undefined;
  }>({
    key: "",
    direction: undefined,
  });

  // Filtering users based on search input
  const filterUsers = (searchQuery: string) => {
    if (!searchQuery) {
      return users; // If no search query, return all users
    }
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Update filtered users based on search query
  const handleSearchChange = (searchQuery: string) => {
    setSearch(searchQuery);
    setFilteredUsers(filterUsers(searchQuery)); // Filter users when search query changes
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Handle page size change
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to page 1 when page size changes
  };

  const handleSortChange = (column: string) => {
    let direction: "asc" | "desc" = "asc";

    if (sortConfig.key === column && sortConfig.direction === "asc") {
      direction = "desc"; // If already ascending, change to descending
    }

    setSortConfig({ key: column, direction });
  };

  // Sorting the filtered users based on current sortConfig
  const sortedUsers = useMemo(() => {
    if (sortConfig.key) {
      const sorted = [...filteredUsers].sort((a, b) => {
        const aValue = a[sortConfig.key as keyof User];
        const bValue = b[sortConfig.key as keyof User];

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
      return sorted;
    }
    return filteredUsers;
  }, [filteredUsers, sortConfig]);

  // Paginate data based on current page and page size
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedUsers.slice(startIndex, endIndex); // Slice data for current page
  }, [currentPage, pageSize, sortedUsers]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Label className="whitespace-nowrap">Show</Label>
          <Select
            onValueChange={(value) => handlePageSizeChange(Number(value))}
            value={String(pageSize)}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Label className="whitespace-nowrap">Entries</Label>
        </div>
        <div className="w-full sm:max-w-xs mr-4">
          <SearchBar
            placeholder="Search name, email, and username..."
            value={search}
            onChange={(e) => handleSearchChange(e)}
          />
        </div>
      </div>
      <div>
        <DataTable
          columns={columns.map((col) => ({
            ...col,
            header: (
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => col.sortable && handleSortChange(col.accessor)}
              >
                <span>{col.header}</span>
                {col.sortable && sortConfig.key === col.accessor && (
                  <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                )}
              </div>
            ),
          }))}
          data={paginatedUsers?.map((user) => ({
            id: String(user.id),
            name: user.name,
            email: user.email,
            username: user.username,
            action: (
              <div className="flex flex-wrap gap-2">
                <Link
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                  href={`/user/${user.id}`}
                  prefetch
                >
                  <Eye className="w-5 h-5" />
                </Link>
                <Link
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                  href={`/user/${user.id}/edit`}
                  prefetch
                >
                  <Pencil className="w-5 h-5" />
                </Link>
              </div>
            ),
          }))}
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <Label className="whitespace-nowrap">
            Show {pageSize} entries from total {filteredUsers.length} entries
          </Label>
        </div>
        <div className="mt-2">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={Math.ceil(filteredUsers.length / pageSize)} // Calculate total pages from filtered data
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

const columns = [
  { header: "ID", accessor: "id", sortable: true },
  { header: "Name", accessor: "name", sortable: true },
  { header: "Email", accessor: "email", sortable: true },
  { header: "Username", accessor: "username", sortable: true },
  { header: "Action", accessor: "action" },
];
