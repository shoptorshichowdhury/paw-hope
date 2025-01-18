import AdoptPetCard from "@/components/common/AdoptPetCard/AdoptPetCard";
import PageBanner from "@/components/common/PageBanner/PageBanner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { useQuery } from "react-query";

const PetListing = () => {
  const { data: allPets = [] } = useQuery({
    queryKey: ["allPets"],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/pets`);
      return data;
    },
  });

  return (
    <section>
      {/* page banner seciton */}
      <PageBanner
        title={`Find Your Perfect Companion`}
        subTitle={`Explore our list of lovable pets waiting to join your family. Give
              them the forever home they deserve.`}
      />

      {/* ----pet listing section---- */}

      <div className="w-11/12 mx-auto my-12">
        {/* search bar & category select */}
        <div className="flex flex-col md:flex-row justify-evenly items-start md:items-end gap-4 md:gap-0">
          {/* search bar */}
          <div className="grid w-full max-w-sm items-center gap-2">
            <label htmlFor="text" className="font-medium">
              Search By Pet Name
            </label>
            <div className="flex items-center relative">
              <Input
                className="w-full rounded-full border-primaryBlue/50"
                type="text"
                placeholder="Search"
              ></Input>
              <FaSearch className="text-gray-500 absolute right-4"></FaSearch>
            </div>
          </div>

          {/* category select */}
          <div className="space-y-2">
            <label className="font-medium">Search By Pet Category</label>
            <Select>
              <SelectTrigger className="w-[200px] bg-primaryBlue/50 rounded-full">
                <SelectValue placeholder="Select Pet Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Pets</SelectLabel>
                  <SelectItem value="apple">Dog</SelectItem>
                  <SelectItem value="banana">Cat</SelectItem>
                  <SelectItem value="blueberry">Rabbit</SelectItem>
                  <SelectItem value="grapes">Bird</SelectItem>
                  <SelectItem value="pineapple">Fish</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* main pet container */}
        <div className="my-10 md:my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {/* <AdoptPetCard></AdoptPetCard> */}
          {allPets.map((pet) => (
            <AdoptPetCard key={pet._id} pet={pet}></AdoptPetCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PetListing;
