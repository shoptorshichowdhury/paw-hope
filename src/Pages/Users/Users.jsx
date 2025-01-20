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
import Swal from "sweetalert2";

const Users = () => {
  const axiosSecure = useAxiosSecure();

  //get all user data
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure("/users");
      return data;
    },
  });

  //make admin handler
  const handleMakeAdmin = async (user) => {
    try {
      const { data } = await axiosSecure.patch(`/users/role/${user?.email}`);
      if (data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user?.name} become admin successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      refetch();
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
            <TableHead>Profile Photo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Make Admin</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, idx) => (
            <TableRow key={user._id}>
              <TableCell> {idx + 1}</TableCell>
              <TableCell>
                <img
                  className="w-12 h-12 object-cover rounded-xl"
                  src={user?.image}
                  alt={user?.name}
                />
              </TableCell>
              <TableCell> {user?.name}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>
                {user?.role === "admin" ? (
                  "Admin"
                ) : (
                  <Button
                    className="bg-primaryPink hover:bg-primaryPink/90"
                    onClick={() => handleMakeAdmin(user)}
                  >
                    Make Admin
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default Users;
