import DonationPetCard from "@/components/common/DonationPetCard/DonationPetCard";
import PageBanner from "@/components/common/PageBanner/PageBanner";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import PublicSkeletonCard from "../Shared/LoadingSkeleton/PublicSkeletonCard";

const DonationCampaigns = () => {
  const getDonations = async (page) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/donation-campaigns?_page=${
        page.pageParam
      }`
    );
    return data;
  };

  //get all donationCampaigns
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["donationCampaigns"],
      queryFn: getDonations,
      staleTime: 10000,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 0 ? null : allPages.length + 1;
      },
    });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  const campaigns = data?.pages?.flatMap((page) => page) || [];


  return (
    <section>
      {/* page banner section */}
      <PageBanner
        title={`Make a Difference with Your Donation`}
        subTitle={`Every contribution helps provide care and shelter for pets in need. Donate and make a difference today!`}
      />

      {/* donation campaign container */}
      <section className="w-11/12 lg:max-w-6xl mx-auto">
      <div className="my-10 md:my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 min-h-60">
        {isLoading && <PublicSkeletonCard cards={8}></PublicSkeletonCard>}
        {campaigns &&
          campaigns.map((campaign) => (
            <DonationPetCard key={campaign._id} campaign={campaign} />
          ))}

        {hasNextPage && <div ref={ref} className="h-4 w-full"></div>}
      </div>
      </section>
    </section>
  );
};

export default DonationCampaigns;
