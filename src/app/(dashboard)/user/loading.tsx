import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Loading() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Loading Posts...
      </h1>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-gray-900 dark:text-gray-300">
              No.
            </TableHead>
            <TableHead className="text-gray-900 dark:text-gray-300">
              Name
            </TableHead>
            <TableHead className="text-gray-900 dark:text-gray-300">
              Email
            </TableHead>
            <TableHead className="text-gray-900 dark:text-gray-300">
              Username
            </TableHead>
            <TableHead className="text-gray-900 dark:text-gray-300">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, i) => (
            <TableRow
              key={i}
              className="hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
            >
              <TableCell>
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
