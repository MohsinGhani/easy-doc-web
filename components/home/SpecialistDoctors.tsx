import React from 'react'
import DoctorsList from '../patient/DoctorsList'

const SpecialistDoctors = () => {
  return (
    <div className='h-screen w-full'>
      <div className='pt-32'>
      <p className="font-poppins text-lg font-bold leading-[27px] text-primary">
  FEATURED PROFILE
</p>
<h1 className="font-outfit text-[36px] font-semibold leading-[45.36px] tracking-[0.02em]  text-[#121212]">
  OUR SPECIALIST DOCTORS
</h1>
<p className="font-outfit text-[20px] font-semibold leading-[33.6px] text-[#5C5C5B]">
  You only have to know one thing that you can learn anything <br/> anywhere to do you discover yourself.
</p>
      </div>
    <DoctorsList />
    </div>
)
}

export default SpecialistDoctors