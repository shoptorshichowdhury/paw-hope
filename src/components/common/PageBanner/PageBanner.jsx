import pawimg from "../../../assets/home/about-us/about-icons/about-paw-small.png";

const PageBanner = ({ title, subTitle }) => {
  return (
    <section>
      <div className="h-[250px] md:h-[300px] flex justify-center items-center bg-gradient-to-tr from-primaryBlue/70 to-primaryBlue/10 relative">
        <div className="w-11/12 mx-auto">
          <div className="space-y-3">
            <h3 className="text-lg md:text-2xl lg:text-5xl font-medium text-center">
              {title}
            </h3>
            <p className="text-center text-sm lg:text-base">{subTitle}</p>
          </div>
          <div className="absolute -rotate-45 top-[18%] left-[20%] hidden md:block">
            <img src={pawimg} alt="paw-image" />
          </div>
          <div className="absolute rotate-45 bottom-[15%] right-[20%] hidden md:block">
            <img src={pawimg} alt="paw-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
