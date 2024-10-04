import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface CarousalsSlidderProps {
  className?: string;
}

const CarousalsSlidder: React.FC<CarousalsSlidderProps> = ({ className }) => {
  const contentData = [
    {
      image: "/assets/images/landingpageimg.svg",
      text: "You only have to know one thing that you can learn anything anywhere to do you discover yourself.",
      author: "Robert Mathew",
    },
    {
      image: "/assets/images/landingpageimg.svg",
      text: "You only have to know one thing that you can learn anything anywhere to do you discover yourself.",
      author: "Robert Mathew",
    },
    {
      image: "/assets/images/landingpageimg.svg",
      text: "You only have to know one thing that you can learn anything anywhere to do you discover yourself.",
      author: "Robert Mathew",
    },
    // Add more objects for additional slides if needed
  ];

  return (
    <Carousel
      opts={{
        align: "start",
        // You can customize the carousel behavior further if needed
      }}
      className={cn("w-full max-w-sm", className)}
    >
      <CarouselContent>
        {contentData.map((item, index) => (
          <CarouselItem key={index} className="w-full">
            <div className="p-4">
              <Card>
                <CardContent className="flex flex-col  p-6">
                  <Image
                    className="  object-cover"
                    src={item.image}
                    width={30}
                    height={40}
                    alt="carousel-image"
                  />
                  <div className="  text-[16px] md:text-[18px] font-normal leading-[24px] md:leading-[29px] pt-4 text-left text-[#5C5C5B]">
                    <p>{item.text}</p>
                  </div>
                  <div className="flex mt-3">
                    <div className="border-t-2 mt-3 border-[#140F07] w-10"></div>
                    <div className="pl-2   text-[#140F07] font-bold text-[14px] md:text-[16px]">
                      {item.author}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-2">
        {contentData.map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 mx-1 bg-primary rounded-full cursor-pointer"
          />
        ))}
      </div>
    </Carousel>
  );
};

export default CarousalsSlidder;
