import { Link } from "react-router-dom";

const CategoryCard = ({ image, title }) => {
  return (
    <Link to={`/petListing`}>
      <div className="border-2 border-primaryBlue flex flex-col items-center gap-3 py-5 bg-primaryBlue/10 hover:bg-primaryBlue/35 rounded-2xl transition-all duration-300 hover:-translate-y-2 will-change-transform">
        <div>
          <img src={image} alt={title} />
        </div>
        <p className="text-lg md:text-xl lg:text-2xl">{title}</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
