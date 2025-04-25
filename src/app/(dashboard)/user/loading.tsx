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
      <h1 className="text-2xl font-bold mb-6">Loading Posts...</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-48 bg-gray-200 animate-pulse rounded" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
