import React from 'react'
import Cardscarousel from '../ui/cardscarousel';

const MedicalServices = () => {
  return (
    
    <div className="relative w-full ">
        <div className='w-full flex flex-col justify-center items-center pt-10 px-4'>
  <div className="font-poppins font-medium text-[18px] leading-[27px] text-center text-primary">
    WHAT WE PROVIDE
  </div>
  <div className="font-outfit text-[28px] md:text-[36px] font-semibold leading-[34px] md:leading-[45.36px] tracking-[0.02em] text-center">
    Our Medical Services
  </div>
  <div className="font-outfit text-[16px] md:text-[20px] font-normal leading-[24px] md:leading-[35.36px] tracking-[0.02em] text-center text-[#5C5C5B]">
    You only have to know one thing that you can learn anything <br />
    anywhere to do you discover your
  </div>
</div>

        <div>
    <div 
      className="absolute top-24 right-0  w-[600px] h-[500px] bg-no-repeat bg-right bg-cover hidden md:block"
      style={{ backgroundImage: 'url("/assets/images/landingpage-bg.png")' }}
    >
    </div>
    <Cardscarousel/>
    </div>
    </div>
  
  )
}

export default MedicalServices;