import React from 'react';
import reviewsData from '../../public/data/patientreview.json'; 
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; 

const Patientsreviewcards = () => {
  return (
    <div className="w-full mt-8 relative">
      <Carousel className="w-full relative">
        <div className="absolute right-10 -top-24 w-2">
          <CarouselPrevious className="text-[#4D77FF] border border-[#4D77FF] -ml-16 text-2xl w-14 h-14 flex items-center justify-center rounded-full" />
          <CarouselNext className="text-[#4D77FF] border border-[#4D77FF] text-2xl w-14 h-14 mr-9 flex items-center justify-center rounded-full" />
        </div>

        <CarouselContent className="-ml-1 flex gap-36">
          {reviewsData.map((review, index) => (
            <CarouselItem key={index} className="p-1 md:basis-1/4 lg:basis-1/4 ">
              <div className="bg-white p-8 w-[140%] rounded-lg  border border-[#E4E4E7]">
                <p className="text-lg text-gray-700 mb-4">{review.description}</p>

                <div className="flex items-center mb-4">
                  {[...Array(review.stars)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674h4.911c.969 0 1.371 1.24.588 1.81l-3.974 2.876 1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.974-2.875-3.975 2.875c-.782.57-1.837-.197-1.538-1.118l1.518-4.674-3.974-2.876c-.782-.57-.38-1.81.588-1.81h4.911l1.518-4.674z" />
                    </svg>
                  ))}
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
