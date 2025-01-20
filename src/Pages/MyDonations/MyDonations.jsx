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
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";

const MyDonations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  //get all donation data
  const {
    data: myDonations = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myDonations", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-donations/${user?.email}`);
      return data;
    },
  });

  //handleRefund
  const handleRefund = async (id, amount, campaignId) => {
    try {
      const { data } = await axiosSecure.delete(`/refund-donation/${id}`);
      if (data.deletedCount) {
        //send request to update donated amount
        await axiosSecure.patch(
          `/donation-campaign/donatedAmount/${campaignId}`,
          {
            donationAmount: amount,
            status: "decrease",
          }
        );
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Refund successfull!",
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
                <Button
                  onClick={() =>
                    handleRefund(
                      donation._id,
                      donation.donationAmount,
                      donation.campaignId
                    )
                  }
                >
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
