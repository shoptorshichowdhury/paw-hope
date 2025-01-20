import useAxiosSecure from "@/hooks/useAxiosSecure";
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
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";

const AllDonations = () => {
  const axiosSecure = useAxiosSecure();

  //get all donations
  const {
    data: allDonations = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allDonations"],
    queryFn: async () => {
      const { data } = await axiosSecure("/all-donation-campaigns");
      return data;
    },
  });

  if (isLoading) return <Skeleton count={5}></Skeleton>;

  //handle donation status change
  const handleStatus = async (id, status) => {
    try {
      const newStatus = status === "Active" ? "Pause" : "Active";
      const { data } = await axiosSecure.patch(`/donation-status/${id}`, {
        status: newStatus,
      });

      if (data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Donation ${newStatus === "Pause" ? "Paused" : "Unpaused"}`,
          showConfirmButton: false,
          timer: 1500,
        });

        refetch();
      }
    } catch (err) {
      console.log(err);
    }
  };

  //delete donation handler
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
          const { data } = await axiosSecure.delete(`/donations/${id}`);
          if (data.deletedCount) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Donation deleted Successfully!",
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

  return (
    <section className="w-11/12 mx-auto my-12">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Serial No.</TableHead>
            <TableHead>Pet Name</TableHead>
            <TableHead>Maximum Amount</TableHead>
            <TableHead>Asker Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allDonations.map((donation, idx) => (
            <TableRow key={donation._id}>
              <TableCell> {idx + 1}</TableCell>
              <TableCell> {donation?.petName}</TableCell>
              <TableCell>${donation?.maxAmount}</TableCell>
              <TableCell>{donation?.askerInfo?.name}</TableCell>
              <TableCell className="flex gap-2 items-center">
                <Link to={`/dashboard/editDonationCampaigns/${donation._id}`}>
                  <Button
                    title="update"
                    size="sm"
                    className="bg-primaryBlue flex items-center gap-2"
                  >
                    <FaEdit />
                  </Button>
                </Link>
                <Button
                  onClick={() => handleDelete(donation?._id)}
                  title="delete"
                  size="sm"
                  className="bg-red-500 flex items-center gap-2"
                >
                  <FaTrash />
                </Button>
                <Button
                  onClick={() => handleStatus(donation._id, donation.status)}
                  className={` ${
                    donation.status === "Active" ? "bg-red-400" : "bg-green-400"
                  }`}
                >
                  {donation.status === "Active" ? `Pause` : "Unpause"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default AllDonations;
