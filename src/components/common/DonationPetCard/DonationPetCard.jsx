import { Button } from "@/components/ui/button";
import dogImg from "../../../assets/pet-details/dog.jpg";
import pawlogo from "../../../assets/home/about-us/about-icons/about-paw-big.png";
import { Link } from "react-router-dom";

const DonationPetCard = ({ campaign }) => {
  const {
    petName,
    petImage,
    maxAmount,
    lastDate,
    shortDescription,
    longDescription,
    donatedAmount,
    askerInfo,
    _id
  } = campaign || {};

  return (
    <div className="bg-white dark:bg-[#2C3E50] rounded-3xl shadow-md overflow-hidden">
      <div className="h-[350px] p-2 overflow-hidden">
        <img
          className="w-full h-full object-cover rounded-2xl hover:scale-110 will-change-transform transition-all duration-300 overflow-hidden"
          src={petImage}
          alt="pet-image"
        />
      </div>
      <div className="px-5 py-5 space-y-2 md:space-y-3 relative">
        <h4 className="text-lg md:text-xl font-medium">{petName}</h4>
        <p>
          <span className="font-semibold">Max Donation Amount:</span> ${maxAmount}
        </p>
        <p>
          <span className="font-semibold">Donated Amount:</span> ${donatedAmount}
        </p>
        <div>
          <Link to={`/donationDetails/${_id}`}>
            <Button variant={`cardBtn`}>View Details</Button>
          </Link>
        </div>

        {/* paw logo */}
        <div className="absolute -bottom-3 -right-3 -rotate-45 opacity-25">
          <img src={pawlogo} alt="paw-logo" />
        </div>
      </div>
    </div>
  );
};

export default DonationPetCard;
