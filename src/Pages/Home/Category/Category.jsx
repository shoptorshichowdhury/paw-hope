import CategoryCard from "@/components/common/CategoryCard/CategoryCard";

import dog from "../../../assets/home/dogs/icons8-dog-50.png";
import cat from "../../../assets/home/cats/icons8-cat-50.png";
import rabbit from "../../../assets/home/rabbits/icons8-rabbit-50.png";
import bird from "../../../assets/home/birds/icons8-bird-50.png";
import SectionTitle from "@/components/common/SectionTitle/SectionTitle";

const Category = () => {
  return (
    <section className="mt-12">
      <div className="my-5 md:my-8 lg:my-10 flex justify-center items-center">
        <SectionTitle
          heading={`Choose Desire Category`}
          subheading={`Category`}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-8">
        <CategoryCard image={dog} title={`Dog`} />
        <CategoryCard image={cat} title={`Cat`} />
        <CategoryCard image={rabbit} title={`Rabbit`} />
        <CategoryCard image={bird} title={`Bird`} />
      </div>
    </section>
  );
};

export default Category;
