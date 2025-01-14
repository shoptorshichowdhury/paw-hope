import { Link } from "react-router-dom";
import footerLogo from "../../../../src/assets/icons/bigIcon.png";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primaryPink py-4 md:py-8">
      <div className="w-11/12 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-0">
        <div className="space-y-3">
          <div className="flex items-end gap-2">
            <div className="w-7 h-7 md:w-20 md:h-20">
              <img
                className="w-full h-full object-cover"
                src={footerLogo}
                alt="logo"
              />
            </div>
            <span className="text-lg md:text-5xl font-semibold text-primaryBlue">
              Paw
              <span className="text-[#FFF5E1] font-scriptStatic lowercase text-2xl md:text-6xl font-semibold">
                Hope
              </span>
            </span>
          </div>
          <div>&copy; 2024 All rights reserved</div>
        </div>
        {/* social icons */}
        <div className="space-y-3">
          <h3>Contact with us</h3>
          <div className="flex items-center gap-3 md:gap-5">
            <Link>
              <FaFacebook className="text-lg md:text-2xl text-[#FFF5E1]" />
            </Link>
            <Link>
              <FaLinkedin className="text-lg md:text-2xl text-[#FFF5E1]" />
            </Link>
            <Link>
              <FaInstagram className="text-lg md:text-2xl text-[#FFF5E1]" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
