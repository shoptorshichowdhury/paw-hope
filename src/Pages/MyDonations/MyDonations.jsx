import { Button } from "@/components/ui/button";
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

const MyDonations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  //get all donation data
  const { data: myDonations = [] } = useQuery({
    queryKey: ["myDonations", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-donations/${user?.email}`);
      return data;
    },
  });

  //handleRefund

  return (
    <section className="w-11/12 mx-auto my-12">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pet Image</TableHead>
            <TableHead>Pet Name</TableHead>
            <TableHead>Donated Amount</TableHead>
            <TableHead>Ask For Refund</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {myDonations.map((donation) => (
            <TableRow key={donation._id}>
              <TableCell>
                <img
                  className="w-12 h-12 object-cover rounded-xl"
                  src={donation.petImage}
                  alt={donation.petName}
                />
              </TableCell>
              <TableCell> {donation.petName}</TableCell>
              <TableCell>${donation.donationAmount}</TableCell>
              <TableCell>
                <Button onClick={() => handleRefund(donation.campaignId)}>
                  Refund
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default MyDonations;
