import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center items-center space-y-4 md:space-y-8 lg:space-y-10">
        <p className="text-lg md:text-2xl lg:text-5xl font-medium">
          Page Not Found
        </p>
        <p className="text-lg md:text-xl lg:text-3xl text-red-700 font-bold">
          Error: 404
        </p>
        <div>
          <Link to="/">
            <Button>Go Back Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
