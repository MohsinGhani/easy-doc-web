// import React from 'react';
import reviewsData from '../../public/data/patientreview.json'; 
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; 
import { CommentRatings } from '../ui/rating';

const Patientsreviewcards = () => {
  return (
    <div className="w-full md:mt-8  relative">
      <Carousel className="w-full relative">
        <div className="absolute right-10 md:-top-24 hidden md:block "> 
          <CarouselPrevious className="text-primary border border-primary -ml-16 text-2xl w-14 h-14 flex items-center justify-center rounded-full" />
          <CarouselNext className="text-primary border border-primary text-2xl w-14 h-14 mr-9 flex items-center justify-center rounded-full" />
        </div>
        <CarouselContent className="-ml-1 flex gap-36 lg:gap-40  md:w-full w-[70%]">
          {reviewsData.map((review, index) => (
          <CarouselItem key={index} className="p-1 md:basis-1/4 lg:basis-1/4 ">
              <div className="bg-white p-8 w-[140%] rounded-lg border border-[#E4E4E7]">
                <p className="text-lg text-gray-700 mb-4">{review.description}</p>

                <div className="flex items-center mb-4">
                   <CommentRatings
                   rating={5} 
                   totalStars={5} 
                   size={24} 
                   variant="yellow" 
                   disabled={true}
                 />
                 
                  
                 <h3 className="text-lg font-bold pl-4 text-gray-900">{review.name}</h3>

                </div>

              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Patientsreviewcards;