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

export default function Cardscarousel({
  className,
}: CarousalsSlidderProps) {

  const contentData = [
    {
      id: 1,
      image: "/assets/images/Ellipse 109.png",
      title: "Primary Health Care",
      description:
        "EasyDoc is a free, health app that goes beyond matching you with doctors. It actively helps you find the right doctor based on your medical and personal needs and connects you with your needs and connects you with ",
    }, {
      id: 2,
      image: "/assets/images/Ellipse 109.png",
      title: "Primary Health Care",
      description:
        "EasyDoc is a free, health app that goes beyond matching you with doctors. It actively helps you find the right doctor based on your medical and personal needs and connects you with your needs and connects you with ",
    }, {
      id: 3,
      image: "/assets/images/Ellipse 109.png",
      title: "Primary Health Care",
      description:
        "EasyDoc is a free, health app that goes beyond matching you with doctors. It actively helps you find the right doctor based on your medical and personal needs and connects you with your needs and connects you with ",
    }, {
      id: 4,
      image: "/assets/images/Ellipse 109.png",
      title: "Primary Health Care",
      description:
        "EasyDoc is a free, health app that goes beyond matching you with doctors. It actively helps you find the right doctor based on your medical and personal needs and connects you with your needs and connects you with ",
    }, {
      id: 5,
      image: "/assets/images/Ellipse 109.png",
      title: "Primary Health Care",
      description:
        "EasyDoc is a free, health app that goes beyond matching you with doctors. It actively helps you find the right doctor based on your medical and personal needs and connects you with your needs and connects you with ",
    }, {
      id: 6,
      image: "/assets/images/Ellipse 109.png",
      title: "Primary Health Care",
      description:
        "EasyDoc is a free, health app that goes beyond matching you with doctors. It actively helps you find the right doctor based on your medical and personal needs and connects you with your needs and connects you with ",
    }, {
      id: 7,
      image: "/assets/images/Ellipse 109.png",
      title: "Primary Health Care",
      description:
        "EasyDoc is a free, health app that goes beyond matching you with doctors. It actively helps you find the right doctor based on your medical and personal needs and connects you with your needs and connects you with ",
    }, {
      id: 8,
      image: "/assets/images/Ellipse 109.png",
      title: "Primary Health Care",
      description:
        "EasyDoc is a free, health app that goes beyond matching you with doctors. It actively helps you find the right doctor based on your medical and personal needs and connects you with your needs and connects you with ",
    },
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={cn("w-full flex flex-col items-center justify-center pt-9", className)}>
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent
          style={{
            transition: "transform 0.5s ease-in-out",
            transform: `translateX(-${currentIndex * 50}%)`,
          }}
        >
          {contentData.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4 flex justify-center">
              <div className="lg:p-0 p-4">
                <Card className="w-full h-96 flex items-center justify-center mb-4">
                  <CardContent className="flex flex-col items-center justify-center text-center">
                    <Image 
                      className="object-cover"
                      src={item.image}
                      width={80}
                      height={80}
                      alt="carousel-image"
                    />
                    <div className="xl:text-[18px] font-[600] lg:text-[12px] leading-[30px] tracking-[1.5%] pt-4 text-[#121212]">
                      <p>{item.title}</p>
                    </div>
                    <div className="flex mt-3 items-center">
                      <div className="px-2 text-[#5C5C5B] lg:text-[12px] xl:text-[16px] font-[400] text-[16px] leading-[20px] tracking-[0.02em]">
                        {item.description}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center mt-2">
        {contentData.map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-2 h-2 mx-1 rounded-full cursor-pointer",
              currentIndex === index ? "bg-primary" : "bg-gray-300"
            )}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
