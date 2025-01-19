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
import { HousePlus } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const columnHelper = createColumnHelper();

const MyAddedPets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [sorting, setSorting] = useState([]);

  //Get all added pets
  const { data: pets = [], refetch } = useQuery({
    queryKey: ["pets", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/pets/${user?.email}`);
      return data.map((pet, index) => ({ ...pet, serial: index + 1 }));
    },
  });

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
          <Link to={`/dashboard/petUpdate/${info.row.original._id}`}>
            <Button
              title="update"
              size="sm"
              className="bg-primaryBlue flex items-center gap-2"
            >
              <FaEdit />
            </Button>
          </Link>
          <Button
            onClick={() => handleDelete(info.row.original._id)}
            title="delete"
            size="sm"
            className="bg-red-500 flex items-center gap-2"
          >
            <FaTrash />
          </Button>
          <Button
            onClick={() => handleAdopt(info.row.original._id)}
            title="adopted"
            size="sm"
            className="bg-green-500 flex items-center gap-2"
          >
            <HousePlus strokeWidth={2.25} />
          </Button>
        </div>
      ),
    }),
  ];

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

  //delete pet handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure to delete this pet?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.delete(`/delete-pet/${id}`);
          if (data.deletedCount) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Pet deleted Successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  //adopt pet handler
  const handleAdopt = async (id) => {
    try {
      const { data } = await axiosSecure.patch(`/adopt-pet/${id}`);
      if (data.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Pet Adopted Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    } catch (err) {
      console.log(err);
    }
  };

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
