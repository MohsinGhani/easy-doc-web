// Environment variables for the Cognito Identity Pool ID
export const identityPoolId =
  process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID || "";

// Environment variables for the Cognito User Pool Client ID
export const userPoolClientId =
  process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "";

// Environment variables for the Cognito User Pool ID
export const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "";

// Navbar Links
export const navLinks = [
  {
    label: "Home",
    location: "/",
  },
  {
    label: "About",
    location: "/about",
  },
  {
    label: "Services",
    location: "/services",
  },
  {
    label: "How we work",
    location: "/how-we-work",
  },
  {
    label: "Doctors",
    location: "/doctors",
  },
  {
    label: "Specialists",
    location: "/specialists",
  },
];

// Navbar Links for logged In User
export const navLinksForAuth = [
  {
    label: "Home",
    location: "/",
  },
  {
    label: "Notifications",
    location: "/notifications",
  },
  {
    label: "Profile",
    location: "/profile",
  },
  {
    label: "Appointments",
    location: "/appointments",
  },
  {
    label: "Settings",
    location: "/settings",
  },
  {
    label: "FAQ’s & Support",
    location: "/faqs",
  },
  {
    label: "Doctors",
    location: "/doctors",
  },
  {
    label: "Specialists",
    location: "/specialists",
  },
];

export const faqs = [
  {
    question: "How can I get access to my patients’ medical records?",
    answer:
      "Yes. You can get access to your patients’ medical records using your Uvodo account.",
    id: 1,
  },
  {
    question: "Can I use my existing domain with Uvodo?",
    answer:
      "Yes, you can connect your existing domain. Uvodo also provides a forever free uvo.do domain suffix to all sellers upon creating an account.",
    id: 2,
  },
  {
    question:
      "Can I sell my products with Uvodo without creating an online store?",
    answer: "Yes. It adheres to the WAI-ARIA design pattern.",
    id: 3,
  },
  {
    question: "Is there a setup fee for using Uvodo?",
    answer: "Yes. It adheres to the WAI-ARIA design pattern.",
    id: 4,
  },
  {
    question: "How do I get started with Uvodo?",
    answer: "Yes. It adheres to the WAI-ARIA design pattern.",
    id: 5,
  },
];

// Institutes to be selected by the doctor
export const institutes = [
  { value: "oxford university", label: "Oxford University" },
  { value: "harvard university", label: "Harvard University" },
  { value: "stanford university", label: "Stanford University" },
  { value: "university of california berkeley", label: "University of California Berkeley" },
  { value: "university of cambridge", label: "University of Cambridge" },
  { value: "university college london", label: "University College London" },
  { value: "university of washington seattle", label: "University of Washington Seattle" },
];

// Degrees to be selected by the doctor
export const degrees = [
  { value: "mbbs", label: "MBBS" },
  { value: "b pharmacy", label: "B Pharmacy" },
  { value: "bsc psychology", label: "BSc Psychology" },
  { value: "bsc biomedical science", label: "BSc Biomedical Science" },
  {
    value: "b.sc. medical laboratory technology (bmlt)",
    label: "B.Sc. Medical Laboratory Technology (BMLT)"
  },
  {
    value: "b.sc. nutrition and dietetics",
    label: "B.Sc. Nutrition and Dietetics"
  },
  { value: "agricultural sciences", label: "Agricultural Sciences" },
  { value: "paramedical courses", label: "Paramedical Courses" },
  {
    value: "bachelor of physiotherapy",
    label: "Bachelor of Physiotherapy"
  }
];

// Fields of studies to be selected by the doctor
export const fields = [
  { value: "cardiology", label: "Cardiology" },
  { value: "dermatology", label: "Dermatology" },
  {
    value: "doctor of physical therapy (dpt)",
    label: "Doctor of Physical Therapy (DPT)"
  },
  {
    value: "bachelor of dental surgery (bds)",
    label: "Bachelor of Dental Surgery (BDS)"
  },
  {
    value: "medical laboratory technology",
    label: "Medical Laboratory Technology"
  },
  { value: "biotechnology", label: "Biotechnology" },
  { value: "nanotechnology", label: "Nanotechnology" },
  { value: "microbiology", label: "Microbiology" },
  { value: "psychology", label: "Psychology" },
  {
    value: "biomedical engineering",
    label: "Biomedical Engineering"
  },
  { value: "nursing", label: "Nursing" },
  { value: "biogenetics", label: "Biogenetics" },
  {
    value: "bhms (bachelor of homeopathic medicine & surgery)",
    label: "BHMS (Bachelor of Homeopathic Medicine & Surgery)"
  },
  { value: "intensive care", label: "Intensive Care" },
  { value: "biochemistry", label: "Biochemistry" }
];
