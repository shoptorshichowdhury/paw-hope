import SectionTitle from "@/components/common/SectionTitle/SectionTitle";
import petsImg from "../../../assets/banner/hero.jpg";
import pawImg1 from "../../../assets/home/about-us/about-icons/about-paw-big.png";
import pawImg2 from "../../../assets/home/about-us/about-icons/about-paw-small.png";
import { FaHome } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="mt-12">
      {/* section title */}
      <div className="my-3 md:my-5 lg:my-10  flex justify-center">
        <SectionTitle
          subheading={`About Us`}
          heading={`Who We Are and Why We Care`}
        />
      </div>

      <div className="flex flex-col lg:flex-row items-end gap-5 md:gap-10 py-8">
        {/* text section */}
        <div className="lg:w-1/2 space-y-3">
          <FaHome className="text-4xl text-primaryBlue"></FaHome>
          <h3 className="text-lg md:text-2xl lg:text-4xl font-semibold">
            A Home for Every Pet, A Friend for Every Heart
          </h3>
          <p className="text-sm md:text-base">
            At Paw Hope, we connect pets in need with loving homes. Our mission
            is to make a positive impact by facilitating adoptions, promoting
            responsible pet care, and supporting pets through donations.
          </p>
          <p className="text-xl font-medium">We aim to -</p>
          <div className="lg:w-11/12 space-y-2">
            <li className="px-4 py-3 bg-primaryBlue/10 list-disc border border-primaryBlue/30 rounded-xl">
              <span className="font-medium">Facilitate Adoptions: </span>
              Helping pets find their perfect families.
            </li>
            <li className="px-4 py-3 bg-primaryBlue/10 list-disc border border-primaryBlue/30 rounded-xl">
              <span className="font-medium">Promote Animal Welfare: </span>
              Advocating for better lives for pets in need.
            </li>
            <li className="px-4 py-3 bg-primaryBlue/10 list-disc border border-primaryBlue/30 rounded-xl">
              <span className="font-medium">Support through Donations: </span>
              Providing care and resources for pets in need.
            </li>
          </div>
        </div>
        {/* image section */}
        <div className="lg:w-1/2 relative">
          <div>
            <img
              className="w-full h-full object-cover rounded-xl"
              src={petsImg}
              alt="pets"
            />
          </div>
          <div className="w-14 h-1/4 md:w-28 md:h-28 absolute -top-3 md:-top-10 -right-2 -rotate-45">
            <img
              className="w-full h-full object-cover"
              src={pawImg1}
              alt="paw-image"
            />
          </div>
          <div className="w-8 h-8 md:w-14 md:h-14 absolute -bottom-3 md:-bottom-5 -left-2 md:-left-4 lg:-left-8 rotate-12">
            <img
              className="w-full h-full object-cover"
              src={pawImg2}
              alt="paw-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
