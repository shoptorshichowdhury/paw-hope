import SectionTitle from "@/components/common/SectionTitle/SectionTitle";
import petsImg from "../../../assets/banner/hero.jpg";

const AboutUs = () => {
  return (
    <section className="mt-12 mb-12 w-11/12 mx-auto">
      <div className="my-5">
        <SectionTitle subheading={`About Us`} heading={`What we do`} />
      </div>
      <div className="flex items-start">
        {/* text section */}
        <div className="w-1/2">
          <h3>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor
            ratione odit nam sunt quam exercitationem, veniam necessitatibus
            reprehenderit omnis qui iste dolorum, minima laborum expedita rem,
            aspernatur cupiditate laboriosam dolores.
          </p>
        </div>
        {/* image section */}
        <div className="md:w-1/2">
          <img className="w-full h-full object-cover rounded-xl" src={petsImg} alt="" />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
