import { useQuery } from "react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AllPets = () => {
  const axiosSecure = useAxiosSecure();
  //get all pets data
  const { data: allPets = [], refetch } = useQuery({
    queryKey: ["allPets"],
    queryFn: async () => {
      const { data } = await axiosSecure("/all-pets");
      return data;
    },
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

  //handle status change
  const handleStatus = async (id, adopted, petName) => {
    try {
      const isAdopted = adopted === true ? false : true;
      const { data } = await axiosSecure.patch(`/adopt-pet/${id}`, {
        status: isAdopted,
      });

      if (data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${petName} ${isAdopted === true ? "Adopted" : "Not Adopted"}`,
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Serial No.</TableHead>
            <TableHead>Pet Image</TableHead>
            <TableHead>Pet Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allPets.map((pet, idx) => (
            <TableRow key={pet._id}>
              <TableCell> {idx + 1}</TableCell>
              <TableCell>
                <img
                  className="w-12 h-12 object-cover rounded-xl"
                  src={pet?.photo}
                  alt={pet?.name}
                />
              </TableCell>
              <TableCell> {pet?.name}</TableCell>
              <TableCell>{pet?.category}</TableCell>
              <TableCell className="flex gap-2 items-center">
                <Link to={`/dashboard/petUpdate/${pet?._id}`}>
                  <Button
                    title="update"
                    size="sm"
                    className="bg-primaryBlue flex items-center gap-2"
                  >
                    <FaEdit />
                  </Button>
                </Link>
                <Button
                  onClick={() => handleDelete(pet?._id)}
                  title="delete"
                  size="sm"
                  className="bg-red-500 flex items-center gap-2"
                >
                  <FaTrash />
                </Button>
                <Button
                  onClick={() => handleStatus(pet._id, pet.adopted, pet.name)}
                  className={` ${
                    pet.adopted === true ? "bg-green-400" : "bg-red-400"
                  }`}
                >
                  {pet.adopted === true ? "Adopted" : "Not Adopted"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default AllPets;
