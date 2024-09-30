import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface CarousalsSlidderProps {
  className?: string;
}

const CarousalsSlidder: React.FC<CarousalsSlidderProps> = ({ className }) => {
  const contentData = [
    {
      image: "/assets/images/Ellipse 109.png",
      tittle: "Primary Health Care",
      description:
        "EasyDoc is a free, health app that goes beyond matching you with doctors. It actively helps you find the right doctor based on your medical and personal needs.",
    },
    {
      image: "/assets/images/Ellipse 109.png",
      tittle: "Primary Health Care",
      description:
        "EasyDoc is a free, health app that goes beyond matching you with doctors. It actively helps you find the right doctor based on your medical and personal needs.",
    },
    {
      image: "/assets/images/Ellipse 109.png",
      tittle: "Primary Health Care",
      description:
        "EasyDoc is a free, health app that goes beyond matching you with doctors. It actively helps you find the right doctor based on your medical and personal needs.",
    },{
      image: "/assets/images/Ellipse 109.png",
      tittle: "Primary Health Care",
      description:
        "EasyDoc is a free, health app that goes beyond matching you with doctors. It actively helps you find the right doctor based on your medical and personal needs.",
    },
    {
      image: "/assets/images/Ellipse 109.png",
      tittle: "Primary Health Care",
      description:
        "EasyDoc is a free, health app that goes beyond matching you with doctors. It actively helps you find the right doctor based on your medical and personal needs.",
    },
    {
      image: "/assets/images/Ellipse 109.png",
      tittle: "Primary Health Care",
      description:
        "EasyDoc is a free, health app that goes beyond matching you with doctors. It actively helps you find the right doctor based on your medical and personal needs.",
    },
    {
      image: "/assets/images/Ellipse 109.png",
      tittle: "Primary Health Care",
      description:
        "EasyDoc is a free, health app that goes beyond matching you with doctors. It actively helps you find the right doctor based on your medical and personal needs.",
    },
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const itemsPerView = 4; // Display 4 items at a time

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const getTransformStyle = () => {
    return {
      transform: `translateX(-${(currentIndex / contentData.length) * 100}%)`,
      transition: "transform 0.5s ease-in-out",
    };
  };

  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <div className="relative w-full overflow-hidden">
        <div className="flex w-full" style={getTransformStyle()}>
          {contentData.map((item, index) => (
            <div key={index} className="w-1/4 p-1 flex-shrink-0"> {/* 4 cards fit in full width */}
              <Card className="w-[93%] bg-[#FFFF] h-96 flex items-center justify-center mt-10 mb-10 mx-auto">
                <CardContent className="flex flex-col items-center justify-center">
                  <Image
                    className="object-cover"
                    src={item.image}
                    width={90}
                    height={60}
                    alt="carousel-image"
                  />
                  <div className="text-[18px] font-[600] leading-[40px] tracking-[1.5%] pt-4 text-center text-[#121212]">
                    <p>{item.tittle}</p>
                  </div>

                  <div className="flex mt-3 items-center">
                    <div className="pl-2 text-[#5C5C5B] font-[400] text-[16px] leading-[20px] tracking-[0.02em] text-center">
                      {item.description}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Dot Navigation */}
      <div className="flex justify-center mt-4">
        {contentData.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 mx-1 rounded-full cursor-pointer ${
              currentIndex === index ? "bg-primary" : "bg-gray-300"
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CarousalsSlidder;
