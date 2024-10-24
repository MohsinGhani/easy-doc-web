"use client";

import SearchInput from "@/components/SearchInput";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dribbble,
  Facebook,
  Linkedin,
  Mail,
  MessageCircleDashed,
  PhoneOutgoing,
  Slack,
  Twitter,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { FAQS } from "@/constants";

const Faqs = () => {
  const [faqs, setFaqs] = useState(FAQS);
  const [value, setValue] = useState("");

  useEffect(() => {
    const filteredFaqs = faqs.filter((faq) =>
      faq.question.toLowerCase().includes(value.toLowerCase())
    );
    setFaqs(filteredFaqs);
    console.log("🚀 ~ useEffect ~ value:", value);
  }, [value]);

  return (
    <div className="max-w-[720px] mx-auto">
      <div className="flex items-center flex-col gap-6 text-center">
        <h2 className="text-2xl font-medium mb-5">Support And Contact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
          <Card className="w-full h-40 px-9 pt-4 pb-5 justify-center items-center inline-flex sm:col-span-1 col-span-2">
            <CardContent className="flex items-center justify-center flex-col gap-3">
              <div className="w-20 h-20 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                <Mail className="text-white" />
              </div>
              <span>Example@email.com</span>
            </CardContent>
          </Card>
          <Card className="w-full h-40 px-9 pt-4 pb-5 justify-center items-center inline-flex sm:col-span-1 col-span-2">
            <CardContent className="flex items-center justify-center flex-col gap-3">
              <div className="w-20 h-20 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                <PhoneOutgoing className="text-white" />
              </div>
              <span>+123 456 789</span>
            </CardContent>
          </Card>
          <Card className="w-full h-40 px-9 pt-4 pb-5 justify-center items-center inline-flex sm:col-span-1 col-span-2">
            <CardContent className="flex items-center justify-center flex-col gap-3">
              <div className="w-20 h-20 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                <PhoneOutgoing className="text-white" />
              </div>
              <span>+123 456 789</span>
            </CardContent>
          </Card>
        </div>
        <div className="text-center text-black text-xs font-normal uppercase leading-tight tracking-wide">
          Socials
        </div>

        <div className="w-full h-12 pt-6 justify-center items-start lg:gap-10 sm:gap-6 gap-4 inline-flex">
          <Facebook />
          <MessageCircleDashed />
          <Slack />
          <Dribbble />
          <Twitter />
          <Linkedin />
        </div>
      </div>

      <div className="flex items-center flex-col gap-6 mt-16">
        <h2 className="text-2xl font-medium mb-5 text-center">
          Frequently Asked Questions
        </h2>
        <SearchInput className="w-full" setValue={setValue} value={value} />
        <Accordion type="single" collapsible className="w-full space-y-6">
          {faqs.map(
            ({
              id,
              question,
              answer,
            }: {
              id: number;
              question: string;
              answer: string;
            }) => {
              return (
                <AccordionItem
                  key={id}
                  value={id.toString()}
                  className="bg-[#ffffff] rounded-xl shadow"
                >
                  <CardContent>
                    <AccordionTrigger>{question}</AccordionTrigger>
                    <AccordionContent>{answer}</AccordionContent>
                  </CardContent>
                </AccordionItem>
              );
            }
          )}
        </Accordion>
      </div>
    </div>
  );
};

export default Faqs;
