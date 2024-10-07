import { useState, useEffect } from "react";
import { ArrowRightIcon } from "lucide-react";

export default function WorkingProcessPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  );
}

function MobileView() {
  return (
    <div className="bg-blue-50 p-4 md:p-8 lg:p-12 pt-10 mt-10 ">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-blue-600 font-semibold mb-2">HOW WE WORK</h2>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Our Working Process</h1>
        <p className="text-gray-600 mb-8 max-w-2xl">
          You only have to know one thing that you can learn anything anywhere to do you discover yourself.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProcessStepmobile
            number={1}
            title="Select Service"
            description="Party we years to order allow asked of. We so opinion friends me message as delight."
          />
          <ProcessStepmobile
            number={2}
            title="Book Appointment"
            description="His defective nor convinced residence own. Connection has put impossible own apartments boisterous."
          />
          <ProcessStepmobile
            number={3}
            title="Complete Payment"
            description="From they fine john he give of rich he. They age and draw mrs like. Improving end distrusts may instantly."
          />
          <ProcessStepmobile
            number={4}
            title="Get Reports"
            description="From they fine john he give of rich he. They age and draw mrs like. Improving end distrusts may instantly."
          />
        </div>
      </div>
    </div>
  );
}

function ProcessStepmobile({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="relative flex gap-5">
      <div className="bg-white p-6 rounded-lg shadow-md h-full">
        <div className="text-blue-600 font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
      {number < 4 && (
        <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
          <ArrowRightIcon className="text-blue-500 w-8 h-8" />
        </div>
      )}
      <div className="absolute -top-4 -left-4 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
        {number}
      </div>
    </div>
  );
}

function DesktopView() {
  return (
    <div
      className="bg-gradient-to-br bg-cover bg-center p-8 min-h-auto"
      style={{ backgroundImage: 'url("/assets/images/WorkingprocessRectangle.png")' }}
    >
      <div className="bg-opacity-80 max-w-6xl mx-auto p-8 rounded-lg">
        <h2 className="text-blue-600 font-semibold mb-2">HOW WE WORK</h2>
        <h1 className="text-3xl font-bold mb-4">Our Working Process</h1>
        <p className="text-gray-600 mb-12 max-w-2xl">
          You only have to know one thing that you can <br /> learn anything anywhere to do you discover <br /> yourself.
        </p>

        <div className="relative">
  <svg
    className="absolute top-8 w-full h-[300px]"
    viewBox="0 0 1000 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 150 Q 250 50, 500 150 T 1000 150"
      stroke="#3B82F6"
      strokeWidth="4"
      fill="none"
    />

    <g>
      <rect x="-1" y="120" width="38" height="38" fill="white" rx="10" ry="10" />
      <circle cx="19" cy="140" r="8" fill="#3B82F6" />
      
      <rect x="200" y="80" width="38" height="38" fill="white" rx="10" ry="10" />
      <circle cx="220" cy="100" r="8" fill="#3B82F6" />
      
      <rect x="430" y="117" width="38" height="38" fill="white" rx="10" ry="10" />
      <circle cx="449" cy="135" r="8" fill="#3B82F6" />
      
      <rect x="648" y="170" width="38" height="38" fill="white" rx="10" ry="10" />
      <circle cx="667" cy="190" r="8" fill="#3B82F6" />
      
      <rect x="873" y="160" width="44" height="44" fill="white" rx="10" ry="10" />
      <circle cx="896" cy="182" r="8" fill="#3B82F6" />
    </g>
  </svg>
</div>



        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
          <ProcessStep
            title="Select Service"
            description="Party we years to order allow asked of. We so opinion friends me message as delight."
            className="ml-4 md:-ml-8"
            position="top"
          />
          <ProcessStep
            title="Book Appointment"
            description="His defective nor convinced residence own. Connection has put impossible own apartments boisterous."
            className="transform translate-y-8 lg:translate-y-8"
            position="bottom"
          />
          <ProcessStep
            title="Complete Payment"
            description="From they fine john he give of rich he. They age and draw mrs like. Improving end distrusts may instantly."
            className="-top-16"
            position="top"
          />
          <ProcessStep
            title="Get"
            description="From they fine john he give of rich he. They age and draw mrs like. Improving end distrusts may instantly."
            className="transform translate-y-24 lg:translate-y-24"
            position="bottom"
          />
          <ProcessStep
            title="Get Reports"
            description="From they fine john he give of rich he. They age and draw mrs like. Improving end distrusts may instantly."
            className=""
            position="top"
          />
        </div>
      </div>
    </div>
  );

  function ProcessStep({
    title,
    description,
    className,
    position,
  }: {
    title: string;
    description: string;
    className: string;
    position: 'top' | 'bottom';
  }) {
    return (
      <div className={`${position === 'bottom' ? 'md:mt-32' : ''} mb-8`}>
        <div className={`${className} p-6 rounded-lg md:w-[150%]`}>
          <div className="text-[#000000] font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    )
  }
};