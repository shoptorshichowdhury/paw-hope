import PageBanner from "@/components/common/PageBanner/PageBanner";

const PetListing = () => {
  return (
    <section>
      {/* page banner seciton */}
      <PageBanner
        title={`Find Your Perfect Companion`}
        subTitle={`Explore our list of lovable pets waiting to join your family. Give
              them the forever home they deserve.`}
      />

      {/* ----pet listing section---- */}

      <div className="w-11/12 mx-auto">
        {/* search bar & category select */}
        <div>
            
        </div>

        {/* main pet container */}
        <div></div>
      </div>
    </section>
  );
};

export default PetListing;
