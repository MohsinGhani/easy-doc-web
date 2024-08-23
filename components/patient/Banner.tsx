import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

interface BannerProps {
  data: {
    title: string;
    description: string;
    location: { name: string; path: string }[];
  };
}

const Banner: React.FC<BannerProps> = ({ data }) => {
  return (
    <div
      className={cn(
        "relative sm:min-h-[300px] h-auto w-full bg-white overflow-hidden rounded-lg shadow-md transition-all duration-500 ease-in-out mb-4 sm:mb-6"
      )}
    >
      {/* Background circles - Hidden on small screens */}
      <div className="absolute inset-0 overflow-hidden hidden sm:block">
        <div className="absolute -left-4 -top-4 w-24 h-24 rounded-full bg-blue-100 opacity-50" />
        <div className="absolute right-1/4 top-1/3 w-32 h-32 rounded-full bg-blue-100 opacity-50" />
        <div className="absolute left-1/3 bottom-1/4 w-40 h-40 rounded-full bg-blue-100 opacity-50" />
        <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-blue-100 opacity-50" />
      </div>

      {/* Separator */}
      <Separator className="block sm:hidden mb-2" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-4 sm:py-8 sm:px-6 lg:px-8 flex flex-col items-center justify-center transition-all duration-500 ease-in-out">
        {/* Breadcrumb */}
        <nav className="text-sm font-medium mb-2 sm:mb-6">
          <ol className="list-none p-0 inline-flex">
            {data.location.map((loc, index) => {
              const isLastItem = index === data.location.length - 1;
              return (
                <li key={index} className="flex items-center">
                  {isLastItem ? (
                    <span className="text-gray-500">{loc.name}</span>
                  ) : (
                    <Link
                      href={loc.path}
                      className="text-gray-500 hover:text-gray-700 transition-colors duration-300 ease-in-out"
                    >
                      {loc.name}
                    </Link>
                  )}
                  {index < data.location.length - 1 && (
                    <svg
                      className="fill-current w-3 h-3 mx-3 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                    </svg>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Title - Hidden on small screens */}
        <h1 className="hidden sm:block text-3xl sm:text-4xl md:text-5xl font-bold text-center text-blue-600 mb-4">
          {data.title}
        </h1>

        {/* Description - Hidden on small screens */}
        <p className="hidden sm:block text-base sm:text-lg md:text-xl text-center text-gray-600 max-w-2xl mx-auto">
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default Banner;
