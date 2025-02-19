import { Button } from "@/components/ui/button";
import pawlogo from "../../../assets/home/about-us/about-icons/about-paw-big.png";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import {
  ArrowUpRight,
  CalendarFold,
  DollarSign,
  MapPin,
  MoveUpRight,
  SquareArrowOutUpRight,
} from "lucide-react";

const AdoptPetCard = ({ pet }) => {
  const {
    photo,
    name,
    age,
    category,
    location,
    shortDescription,
    longDescription,
    price,
    _id,
  } = pet || {};

  return (
    <div className="bg-white dark:bg-[#2C3E50] rounded-xl shadow-md overflow-hidden">
      <div className="h-[230px] p-2 overflow-hidden">
        <img
          className="w-full h-full object-cover bg-top md:bg-center rounded-lg hover:scale-110 will-change-transform transition-all duration-300 overflow-hidden"
          src={photo}
          alt={name && name}
        />
      </div>
      <div className="p-3 space-y-2 relative">
        <h4 className="text-lg font-medium">{name}</h4>
        <p className="text-sm flex items-center gap-1 font-normal">
          <CalendarFold size={16} />
          <span className="font-medium">Age:</span> {age}
        </p>
        <p className="text-sm flex flex-wrap items-center gap-1 font-normal">
          <MapPin size={16} />
          <span className="font-medium">Location:</span>{" "}
          {location && location.substring(0, 10)}..
        </p>
        <p className="text-sm flex items-center gap-1 font-normal">
          <DollarSign size={16} />
          <span className="font-medium">Rehoming Fee:</span> {price}
        </p>
        <div className="flex items-center pt-2 pl-2">
          <Link
            className="text-sm underline font-medium"
            to={`/petDetails/${_id}`}
          >
            View Details
          </Link>
          <MoveUpRight size={16} />
        </div>

        {/* paw logo */}
        <div className="w-20 absolute -bottom-3 -right-3 -rotate-45 opacity-15">
          <img src={pawlogo} alt="paw-logo" />
        </div>
      </div>
    </div>
  );
};

export default AdoptPetCard;
