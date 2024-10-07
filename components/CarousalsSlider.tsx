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
    { id: 1,
      image: "/assets/images/landingpageimg.svg",
      text: "You only have to know one thing that you can learn anything anywhere to do you discover yourself.",
      author: "Robert Mathew",
    },
    { id: 2,
      image: "/assets/images/landingpageimg.svg",
      text: "You only have to know one thing that you can learn anything anywhere to do you discover yourself.",
      author: "Robert Mathew",
    }, { id: 3,
      image: "/assets/images/landingpageimg.svg",
      text: "You only have to know one thing that you can learn anything anywhere to do you discover yourself.",
      author: "Robert Mathew",
    },
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className={cn("w-full max-w-sm", className)}
    >
      <CarouselContent
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
        {contentData.map((item, index) => (
          <CarouselItem key={index} className="w-full">
            <div className="p-4">
              <Card className="border-none shadow-none">
                <CardContent className="flex flex-col p-6">
                  <Image
                    className="object-cover"
                    src={item.image}
                    width={30}
                    height={40}
                    alt="carousel-image"
                  />
                  <div className="text-[16px] md:text-[18px] font-normal leading-[24px] md:leading-[29px] pt-4 text-left text-[#5C5C5B]">
                    <p>{item.text}</p>
                  </div>
                  <div className="flex mt-3">
                    <div className="border-t-2 mt-3 border-[#140F07] w-10"></div>
                    <div className="pl-2 text-[#140F07] font-bold text-[14px] md:text-[16px]">
                      {item.author}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="flex justify-center mt-2">
        {contentData.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 mx-1 rounded-full cursor-pointer ${
              currentIndex === index ? "bg-primary" : "bg-gray-300"
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </Carousel>
)
};

export default CarousalsSlidder;