import React from 'react'
import Patientsreviewcards from './Patientsreviewcards';

interface SpecialistDoctorsProps {
  profileText: string;
  headingText: string;
  descriptionText: string | JSX.Element;
}


const PatientsAboutusSection : React.FC<SpecialistDoctorsProps> = ({ profileText, headingText, descriptionText }) => {
  return (
    <div className='w-full h-screen relative'>
      <div className="pt-32 flex justify-between items-start">
        <div className=''>
          <p className="font-poppins text-lg font-bold leading-[27px] text-primary ">{profileText}</p>
          <h1 className=" text-[36px] font-semibold leading-[45.36px] tracking-[0.02em] text-[#121212]">
{headingText}
          </h1>
          <p className=" text-[20px] font-normal leading-[33.6px] text-[#5C5C5B]">
{descriptionText} 

</p>
</div>
</div>
<div>
<Patientsreviewcards/>
</div>
</div>
)
}

export default PatientsAboutusSection;