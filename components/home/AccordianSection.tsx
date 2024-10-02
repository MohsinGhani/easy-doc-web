import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../../components/ui/accordion"; 

const AccordianSection = () => {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center -top-40'>
      <div className='text-center'>
        <h1 className="font-poppins text-[18px] font-medium leading-[27px] text-primary ">
          FAQ’S
        </h1>
        <h1 className="text-[20px] font-semibold leading-[45.36px] tracking-[0.02em] text-[#121212] pt-3 md:text-[36] ">
          Frequently Asked Questions
        </h1>
        <p className="text-[18px] font-normal leading-[33.6px] text-[#5C5C5B] pt-3 md:text-[24px]">
          You only have to know one thing that you can learn anything <br /> 
          anywhere to do you discover yourself.
        </p>
      </div>
      <div className='pt-12 flex justify-center'>
        <div className='flex flex-col gap-6 md:max-w-[700px] w-[80%] md:w-full'>
          <Accordion type="single" className="space-y-2 p-4 rounded-lg shadow-lg border border-primary">
            <AccordionItem value="item-1">
              <AccordionTrigger className="flex justify-between items-center p-4">
                <span className="text-gray-800">
                  <p className="text-[16px] text-[#121212] font-medium leading-[28px] text-left">
                    What is Webflow and why is it the best website builder?
                  </p>
                </span>
              </AccordionTrigger>
              <AccordionContent className="p-4 text-gray-700">
                <p className="text-[16px] font-normal leading-[20px] text-left">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt <br />
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                  quis nostrud exercitation <br />
                  ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="space-y-2 p-4 rounded-lg shadow-lg border border-primary">
            <AccordionItem value="item-2">
              <AccordionTrigger className="flex justify-between items-center p-4">
                <span className="text-gray-800">
                  <p className="text-[16px] text-[#121212] font-medium leading-[28px] text-left">
                    What is your favorite template from BRIX Templates?
                  </p>
                </span>
              </AccordionTrigger>
              <AccordionContent className="p-4 text-gray-700">
                <p className="text-[16px] font-normal leading-[20px] text-left">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt <br />
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                  quis nostrud exercitation <br />
                  ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="space-y-2 p-4 rounded-lg shadow-lg border border-primary">
            <AccordionItem value="item-3">
              <AccordionTrigger className="flex justify-between items-center p-4">
                <span className="text-gray-800">
                  <p className="text-[16px] text-[#121212] font-medium leading-[28px] text-left">
                    How do you clone a Webflow Template from the Showcase?
                  </p>
                </span>
              </AccordionTrigger>
              <AccordionContent className="p-4 text-gray-700">
                <p className="text-[16px] font-normal leading-[20px] text-left">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt <br />
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                  quis nostrud exercitation <br />
                  ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="space-y-2 p-4 rounded-lg shadow-lg border border-primary">
            <AccordionItem value="item-4">
              <AccordionTrigger className="flex justify-between items-center p-4">
                <span className="text-gray-800">
                  <p className="text-[16px] text-[#121212] font-medium leading-[28px] text-left">
                    Why is BRIX Templates the best Webflow agency out there?
                  </p>
                </span>
              </AccordionTrigger>
              <AccordionContent className="p-4 text-gray-700">
                <p className="text-[16px] font-normal leading-[20px] text-left">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt <br />
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                  quis nostrud exercitation <br />
                  ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default AccordianSection;