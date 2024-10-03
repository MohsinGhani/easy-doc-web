import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../../components/ui/accordion";
import Faqs from "../../public/data/FaqsSection.json"; 
import { cn } from "@/lib/utils";

const AccordianSection = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="text-center pt-32">
        <h1 className="font-poppins text-[18px] font-medium leading-[27px] text-primary">
          FAQ’S
        </h1> 
        <h1 className="text-[20px] font-semibold leading-[45.36px] tracking-[0.02em] text-[#121212] pt-3 md:text-[36px]">
          Frequently Asked Questions
        </h1>
        <p className="text-[18px] font-normal leading-[30.6px] text-[#5C5C5B] pt-3 md:text-[24px]">
          You only have to know one thing that you can learn anything <br />
          anywhere to do you discover yourself.
        </p>
      </div>
      <div className="pt-12 flex justify-center md:w-[50%] ">
        <div className="flex flex-col gap-14 md:max-w-[700px] w-[80%] md:w-full ">
          <Accordion type="single" collapsible className="space-y-6">
            {Faqs.map(({ id, question, answer }) => (
              <AccordionItem
                key={id}
                value={id.toString()}
                className={cn(
                  "bg-white rounded-xl shadow-lg p-6 transition-all duration-300",
                  "border-2", 
                  "border-[#E4E4E7]", 
                  "data-[state=open]:border-primary" 
                )}
              >
<AccordionTrigger className="text-left font-normal text-[#121212] text-[14px] leading-[20px] md:text-[16px] md:leading-[28px]">
  {question}
</AccordionTrigger>


                <AccordionContent className="text-left text-[16px] text-[#5C5C5B] leading-[20px]">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default AccordianSection;
