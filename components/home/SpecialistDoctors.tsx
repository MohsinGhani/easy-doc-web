import DoctorCard from '../patient/DoctorCard';
import doctorsData from '../../public/data/specialdoctors.json'; 
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; 

interface SpecialistDoctorsProps {
  profileText: string;
  headingText: string;
  descriptionText: string | JSX.Element; 

}

const SpecialistDoctors: React.FC<SpecialistDoctorsProps> = ({ profileText, headingText, descriptionText }) => {
  return ( 
    <div className=" w-full relative">
      <div className="pt-32 flex justify-between items-start">
        <div >
          <p className="font-poppins text-lg font-bold leading-[27px] text-primary">{profileText}</p>
          <h1 className=" text-[36px] font-semibold leading-[45.36px] tracking-[0.02em] text-[#121212]">
{headingText}
          </h1>
          <p className=" text-[20px] font-normal leading-[33.6px] text-[#5C5C5B]">
{descriptionText} 
</p>
        </div>
      </div>
      <div  >
      <Carousel className="w-full mt-8">
        <div className="absolute right-10 md:-top-24 w-2 hidden md:block ">
        <CarouselPrevious className="text-primary border border-primary -ml-16 text-2xl w-14 h-14 flex items-center justify-center rounded-full " />
        <CarouselNext className="text-primary border-primary  text-2xl w-14 h-14 mr-9   flex items-center justify-center rounded-full " />
        </div>
        <CarouselContent className="xl-ml-1 flex "> 
        {doctorsData.map((doctor) => (
  <CarouselItem key={doctor.userId} className="p-1 md:basis-1/3 lg:basis-1/3 xl:basis-1/4">
    <DoctorCard doctor={doctor as unknown as User} />
  </CarouselItem>
))}
        </CarouselContent>
      </Carousel>
      </div>
      </div>
)}

export default SpecialistDoctors;