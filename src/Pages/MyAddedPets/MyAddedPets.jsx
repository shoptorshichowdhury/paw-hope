import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery } from "react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaEdit, FaPaw, FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LuArrowUpDown } from "react-icons/lu";
import { FaCaretSquareUp, FaCaretSquareDown } from "react-icons/fa";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("serial", {
    header: () => <span>Serial No.</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("photo", {
    header: () => <span>Pet Image</span>,
    cell: (info) => (
      <img
        src={info.getValue()}
        alt="Pet"
        className="w-12 h-12 object-cover rounded-xl"
      />
    ),
  }),
  columnHelper.accessor("name", {
    header: () => <span>Pet Name</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("category", {
    header: () => <span>Category</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("adopted", {
    header: () => <span>Adoption Status</span>,
    cell: (info) => {
      const value = info.getValue();
      return value ? "Adopted" : "Not Adopted";
    },
  }),
  columnHelper.display({
    id: "action",
    header: () => <span>Action</span>,
    enableSorting: false,
    cell: (info) => (
      <div className="flex gap-2">
        <Button
          title="update"
          size="sm"
          variant="cardBtn"
          className="flex items-center gap-2"
        >
          <FaEdit />
        </Button>
        <Button
          title="delete"
          size="sm"
          variant="cardBtn"
          className="flex items-center gap-2"
        >
          <FaTrash />
        </Button>
        <Button
          title="adopted"
          size="sm"
          variant="cardBtn"
          className="flex items-center gap-2"
        >
          <FaPaw />
        </Button>
      </div>
    ),
  }),
];

const MyAddedPets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [sorting, setSorting] = useState([]);

  //Get all added pets
  const { data: pets = [] } = useQuery({
    queryKey: ["pets", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/pets/${user?.email}`);
      return data.map((pet, index) => ({ ...pet, serial: index + 1 }));
    },
  });

  const table = useReactTable({
    data: pets,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <section className="w-11/12 mx-auto my-12">
      <Table className="border">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup, idx) => (
            <TableRow key={idx}>
              {headerGroup.headers.map((header, id) => (
                <TableHead className="md:w-52" key={id}>
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? "cursor-pointer select-none flex items-center gap-2"
                        : "",
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getCanSort() && <LuArrowUpDown />}
                    {
                      {
                        asc: <FaCaretSquareUp />,
                        desc: <FaCaretSquareDown />,
                      }[header.column.getIsSorted()]
                    }
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row, id) => (
            <TableRow key={id}>
              {row.getVisibleCells().map((cell, idx) => (
                <TableCell key={idx}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* pagination section */}
      {pets.length > 10 && (
        <div className="mt-3 md:mt-5 lg:mt-8 flex items-center justify-between w-full">
          <div>
            Page
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div>
            <Pagination className="items-end w-max">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={`${
                      !table.getCanPreviousPage()
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    } ${
                      table.getState().pagination.pageIndex === 0
                        ? "isActive"
                        : ""
                    }`}
                    onClick={() => table.previousPage()}
                    isDisable={!table.getCanPreviousPage()}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    className={`${
                      !table.getCanNextPage()
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    } ${
                      table.getState().pagination.pageIndex ===
                      table.getPageCount() - 1
                        ? "isActive"
                        : ""
                    }`}
                    onClick={() => table.nextPage()}
                    isDisable={!table.getCanNextPage()}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyAddedPets;
