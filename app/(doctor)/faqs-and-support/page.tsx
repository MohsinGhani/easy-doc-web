"use client";

import { ContentLayout } from "@/components/layout/content-layout";
import SearchInput from "@/components/SearchInput";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dribbble,
  Facebook,
  Linkedin,
  Mail,
  MessageCircleDashed,
  Phone,
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

export default function FaqsAndSupportPage() {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "What is Lorem Ipsum?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 2,
      question: "What is Our Goal?",
      answer: "Our Goal is to simplify the healthcare experience for everyone.",
    },
    {
      id: 3,
      question: "Are we on Social Media?",
      answer: "Of course! We are on social media.",
    },
  ]);
  const [value, setValue] = useState("");

  useEffect(() => {
    const filteredFaqs = faqs.filter((faq) =>
      faq.question.toLowerCase().includes(value.toLowerCase())
    );
    setFaqs(filteredFaqs);
    console.log("🚀 ~ useEffect ~ value:", value);
  }, [value]);

  return (
    <ContentLayout title="Doctor | Support And Contact">
      <div className="max-w-[720px] mx-auto">
        <div className="flex items-center flex-col gap-6 text-center">
          <h2 className="text-2xl font-medium mb-5">Support And Contact</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
            <Card className="w-full h-40 px-9 pt-4 pb-5 justify-center items-center inline-flex">
              <div className="grow shrink basis-0 self-stretch flex-col justify-start items-center gap-4 inline-flex">
                <div className="w-20 h-20 relative">
                  <div className="w-20 h-20 left-0 top-0 absolute bg-gradient-to-b from-blue-500 to-blue-700 rounded-full" />
                  <div className="w-9 h-9 left-[23px] top-[22px] absolute flex items-center justify-center">
                    <Mail className="text-white" />
                  </div>
                </div>
                <div className="self-stretch text-black text-base font-medium leading-7">
                  Example@email.com
                </div>
              </div>
            </Card>
            <Card className="w-full h-40 px-9 pt-4 pb-5 justify-center items-center inline-flex">
              <div className="grow shrink basis-0 self-stretch flex-col justify-start items-center gap-4 inline-flex">
                <div className="w-20 h-20 relative">
                  <div className="w-20 h-20 left-0 top-0 absolute bg-gradient-to-b from-blue-500 to-blue-700 rounded-full" />
                  <div className="w-9 h-9 left-[23px] top-[22px] absolute flex items-center justify-center">
                    <Phone className="text-white" />
                  </div>
                </div>
                <div className="self-stretch text-black text-base font-medium leading-7">
                  +123 456 789{" "}
                </div>
              </div>
            </Card>
            <Card className="w-full h-40 px-9 pt-4 pb-5 justify-center items-center inline-flex sm:col-span-1 col-span-2">
              <div className="grow shrink basis-0 self-stretch flex-col justify-start items-center gap-4 inline-flex">
                <div className="w-20 h-20 relative">
                  <div className="w-20 h-20 left-0 top-0 absolute bg-gradient-to-b from-blue-500 to-blue-700 rounded-full" />
                  <div className="w-9 h-9 left-[23px] top-[22px] absolute flex items-center justify-center">
                    <PhoneOutgoing className="text-white" />
                  </div>
                </div>
                <div className="self-stretch text-black text-base font-medium leading-7">
                  +123 456 789{" "}
                </div>
              </div>
            </Card>
          </div>
          <div className="text-center text-black text-xs font-normal uppercase leading-tight tracking-wide">
            Socials
          </div>

          <div className="h-12 pt-6 justify-center items-start gap-10 inline-flex">
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
    </ContentLayout>
  );
}
