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

const AdoptionRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  //get all donation data
  const { data: adoptionRequest = [] } = useQuery({
    queryKey: ["adoptionRequest", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/adoption-request/${user?.email}`
      );
      return data;
    },
  });

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
              <TableCell>
                <Button>Accept</Button>
                <Button>Reject</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default AdoptionRequest;
