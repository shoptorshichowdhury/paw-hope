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
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useInfiniteQuery, useQuery } from "react-query";
import PublicSkeletonCard from "../Shared/LoadingSkeleton/PublicSkeletonCard";
import { useInView } from "react-intersection-observer";

const PetListing = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  const getPetListing = async (page) => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/pets?search=${search}&filter=${filter}&sort=${sort}&_page=${page.pageParam}`
    );
    return data;
  };

  //get all donationCampaigns
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["getPetListing", search, filter, sort],
      queryFn: getPetListing,
      staleTime: 10000,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 0 ? null : allPages.length + 1;
      },
    });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, filter, search, sort]);

  const allPets = data?.pages?.flatMap((page) => page) || [];

  return (
    <section>
      {/* page banner seciton */}
      <PageBanner
        title={`Find Your Perfect Companion`}
        subTitle={`Explore our list of lovable pets waiting to join your family. Give
              them the forever home they deserve.`}
      />

      {/* ----pet listing section---- */}

      <div className="w-11/12 lg:max-w-6xl mx-auto my-12">
        {/* search bar & category select & sort by price */}
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-start gap-5 lg:gap-0">
          {/* search bar */}
          <div className="grid w-full lg:max-w-sm items-center gap-2">
            <label htmlFor="text" className="font-medium">
              Search By Pet Name
            </label>
            <div className="flex items-center relative">
              <Input
                className="w-full rounded-xl border-primaryBlue/50"
                type="text"
                name="search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                placeholder="Search"
              ></Input>
              <FaSearch className="text-gray-500 absolute right-4"></FaSearch>
            </div>
          </div>

          {/* category & price */}
          <div className="flex flex-col md:flex-row gap-5 items-center">
            {/* category select */}
            <div className="space-y-2">
              <label className="font-medium">Sort By Pet Category</label>
              <Select onValueChange={(value) => setFilter(value)}>
                <SelectTrigger className="w-[200px] bg-primaryBlue/50 rounded-xl">
                  <SelectValue placeholder="Select Pet Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Pets</SelectLabel>
                    <SelectItem value="dog">Dog</SelectItem>
                    <SelectItem value="cat">Cat</SelectItem>
                    <SelectItem value="rabbit">Rabbit</SelectItem>
                    <SelectItem value="bird">Bird</SelectItem>
                    <SelectItem value="fish">Fish</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* sort by price */}
            <div className="space-y-2">
              <label className="font-medium">Sort by Price</label>
              <Select onValueChange={(value) => setSort(value)}>
                <SelectTrigger className="w-[200px] bg-primaryBlue/50 rounded-xl">
                  <SelectValue placeholder="Sort by Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Price</SelectLabel>
                    <SelectItem value="asc">Ascending Order</SelectItem>
                    <SelectItem value="dsc">Descending Order</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* main pet container */}
        <div className="my-10 md:my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 min-h-60">
          {isLoading && <PublicSkeletonCard cards={8}></PublicSkeletonCard>}
          {allPets &&
            allPets.map((pet) => (
              <AdoptPetCard key={pet._id} pet={pet}></AdoptPetCard>
            ))}

          {hasNextPage && <div ref={ref} className="h-4 w-full"></div>}
        </div>
      </div>
    </section>
  );
};

export default PetListing;
