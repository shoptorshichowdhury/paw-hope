import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import client1 from "../../../assets/home/testimonial/testimonial1.jpg";
import client2 from "../../../assets/home/testimonial/testimonial2.jpg";
import client3 from "../../../assets/home/testimonial/testimonial3.jpg";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SectionTitle from "@/components/common/SectionTitle/SectionTitle";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonial = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <section className="mt-12 lg:mt-20 w-11/12 mx-auto">
      <div className="my-3 md:my-5 lg:my-10  flex justify-center">
        <SectionTitle
          subheading={`Testimonial`}
          heading={`What's Our Client Say`}
        />
      </div>

      {/* carousal section */}
      <div className="flex justify-center relative">
        <div className="absolute z-20 md:left-[15%] lg:left-[20%] hidden md:block">
          <FaQuoteLeft className="md:text-3xl lg:text-5xl text-primaryBlue"></FaQuoteLeft>
        </div>
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-sm lg:max-w-md"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {/* review 1 */}
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-6 bg-[#FFF5E1] dark:bg-[#2C3E50] rounded-xl space-y-3 md:space-y-8">
                    <span className="text-center text-base md:text-xl lg:text-2xl">
                      "Adopting my dog through Paw Hope was the best decision I
                      ever made. He's brought so much joy to my life!"
                    </span>
                    <div className="flex gap-5">
                      <div className="w-10 h-10 md:w-12 md:h-12">
                        <img
                          className="w-full h-full object-cover rounded-full object-center"
                          src={client1}
                          alt="client"
                        />
                      </div>
                      <span>
                        <p className="font-medium">Emily Carter</p>
                        <p className="text-sm">Pet owener</p>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            {/* review 2  */}
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-6 bg-[#FFF5E1] dark:bg-[#2C3E50] rounded-xl space-y-3 md:space-y-8">
                    <span className="text-center text-base md:text-xl lg:text-2xl">
                      "Thanks to Paw Hope, I found my perfect companion. The
                      process was so easy, and I couldn’t be happier!"
                    </span>
                    <div className="flex gap-5">
                      <div className="w-10 h-10 md:w-12 md:h-12">
                        <img
                          className="w-full h-full object-cover rounded-full object-center"
                          src={client2}
                          alt="client"
                        />
                      </div>
                      <span>
                        <p className="font-medium">Jason Miller</p>
                        <p className="text-sm">Pet owener</p>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            {/* review 3  */}
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-6 bg-[#FFF5E1] dark:bg-[#2C3E50] rounded-xl space-y-3 md:space-y-8">
                    <span className="text-center text-base md:text-xl lg:text-2xl">
                      "I’m so grateful for Paw Hope. My new cat has filled my
                      home with love and laughter!"
                    </span>
                    <div className="flex gap-5">
                      <div className="w-10 h-10 md:w-12 md:h-12">
                        <img
                          className="w-full h-full object-cover rounded-full object-center"
                          src={client3}
                          alt="client"
                        />
                      </div>
                      <span>
                        <p className="font-medium">Sarah Johnson</p>
                        <p className="text-sm">Pet owener</p>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonial;
