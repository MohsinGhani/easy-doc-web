import React from 'react';
import Patientreviewcards from './Patientsreviewcards'

interface SpecialistDoctorsProps {
  profileText: string;
  headingText: string;
  descriptionText: string | JSX.Element;
}

const PatientsAboutusSection: React.FC<SpecialistDoctorsProps> = ({ profileText, headingText, descriptionText }) => {
  return (
    <div className='w-full h-auto lg:h-screen relative px-4 md:px-8 lg:px-16'>
      <div className="pt-16 md:pt-24 lg:pt-32 flex flex-col lg:flex-row justify-between items-start">
        <div className='lg:w-[50%]'>
          <p className="font-poppins text-base md:text-lg font-bold leading-[22px] md:leading-[27px] text-primary">
            {profileText}
          </p>
          <h1 className="text-[28px] md:text-[36px] font-semibold leading-[35px] md:leading-[45.36px] tracking-[0.02em] text-[#121212] mt-4">
            {headingText}
          </h1>
          <p className="text-[18px] md:text-[20px] font-normal leading-[30px] md:leading-[33.6px] text-[#5C5C5B] mt-4">
            {descriptionText}
          </p>
        </div>
      </div>
      <div className="mt-8 lg:mt-12">
        <Patientreviewcards/>
      </div>
    </div>
  );
};

export default PatientsAboutusSection;
