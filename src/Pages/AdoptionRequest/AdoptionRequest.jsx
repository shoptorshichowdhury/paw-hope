import useAuth from "@/hooks/useAuth";
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
import { Check, X } from "lucide-react";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";

const AdoptionRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  //get all donation data
  const {
    data: adoptionRequest = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["adoptionRequest", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/adoption-request/${user?.email}`
      );
      return data;
    },
  });

  //handle accept
  const handleAccept = async (id) => {
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
      }
    } catch (err) {
      console.log(err);
    }
  };

  //handle reject
  const handleReject = async (id) => {
    try {
      const { data } = await axiosSecure.delete(
        `/delete-adoption-request/${id}`
      );
      if (data.deletedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Adoption Request Rejected!",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <Skeleton count={5}></Skeleton>;

  return (
    <section className="w-11/12 mx-auto my-12">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pet Name</TableHead>
            <TableHead>Pet Image</TableHead>
            <TableHead>Requester Name</TableHead>
            <TableHead>Requester Email</TableHead>
            <TableHead>Requester Phone Number</TableHead>
            <TableHead>Requester Location</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adoptionRequest.map((request) => (
            <TableRow key={request._id}>
              <TableCell>
                <img
                  className="w-12 h-12 object-cover rounded-xl"
                  src={request.petImage}
                  alt={request.petName}
                />
              </TableCell>
              <TableCell> {request.petName}</TableCell>
              <TableCell>{request.userInfo.name}</TableCell>
              <TableCell>{request.userInfo.email}</TableCell>
              <TableCell>{request.userInfo.phoneNumber}</TableCell>
              <TableCell>{request.userInfo.address}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  onClick={() => handleAccept(request.petId)}
                  title="accept"
                  className="bg-green-500"
                >
                  <Check />
                </Button>
                <Button
                  onClick={() => handleReject(request._id)}
                  title="reject"
                  className="bg-red-600"
                >
                  <X />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default AdoptionRequest;
