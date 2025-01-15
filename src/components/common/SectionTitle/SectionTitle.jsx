const SectionTitle = ({ heading, subheading }) => {
  return (
    <div>
      <p className="flex justify-center items-center gap-2">
        <div className="w-6 md:w-10 h-1 bg-primaryBlue rounded-xl"></div>{" "}
        <span className="text-base md:text-lg">{subheading}</span>
      </p>
      <h3 className="text-lg md:text-2xl lg:text-3xl font-medium">{heading}</h3>
    </div>
  );
};

export default SectionTitle;
