import languages from "@/public/data/languages.json";
import countries from "@/public/data/countries.json";
import specialities from "@/public/data/specialities.json";
import allergies from "@/public/data/allergies.json";
import medications from "@/public/data/medications.json";

export const identityPoolId =
  process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID || "";

export const userPoolClientId =
  process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "";

export const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "";
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

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
  {
    value: "university of california berkeley",
    label: "University of California Berkeley",
  },
  { value: "university of cambridge", label: "University of Cambridge" },
  { value: "university college london", label: "University College London" },
  {
    value: "university of washington seattle",
    label: "University of Washington Seattle",
  },
];

// Degrees to be selected by the doctor
export const degrees = [
  { value: "mbbs", label: "MBBS" },
  { value: "b pharmacy", label: "B Pharmacy" },
  { value: "bsc psychology", label: "BSc Psychology" },
  { value: "bsc biomedical science", label: "BSc Biomedical Science" },
  {
    value: "b.sc. medical laboratory technology (bmlt)",
    label: "B.Sc. Medical Laboratory Technology (BMLT)",
  },
  {
    value: "b.sc. nutrition and dietetics",
    label: "B.Sc. Nutrition and Dietetics",
  },
  { value: "agricultural sciences", label: "Agricultural Sciences" },
  { value: "paramedical courses", label: "Paramedical Courses" },
  {
    value: "bachelor of physiotherapy",
    label: "Bachelor of Physiotherapy",
  },
];

// Fields of studies to be selected by the doctor
export const fields = [
  { value: "cardiology", label: "Cardiology" },
  { value: "dermatology", label: "Dermatology" },
  {
    value: "doctor of physical therapy (dpt)",
    label: "Doctor of Physical Therapy (DPT)",
  },
  {
    value: "bachelor of dental surgery (bds)",
    label: "Bachelor of Dental Surgery (BDS)",
  },
  {
    value: "medical laboratory technology",
    label: "Medical Laboratory Technology",
  },
  { value: "biotechnology", label: "Biotechnology" },
  { value: "nanotechnology", label: "Nanotechnology" },
  { value: "microbiology", label: "Microbiology" },
  { value: "psychology", label: "Psychology" },
  {
    value: "biomedical engineering",
    label: "Biomedical Engineering",
  },
  { value: "nursing", label: "Nursing" },
  { value: "biogenetics", label: "Biogenetics" },
  {
    value: "bhms (bachelor of homeopathic medicine & surgery)",
    label: "BHMS (Bachelor of Homeopathic Medicine & Surgery)",
  },
  { value: "intensive care", label: "Intensive Care" },
  { value: "biochemistry", label: "Biochemistry" },
];

export const COUNTRIES = countries.map((c) => ({
  label: `${c.flag} ${c.name}`,
  value: c.code,
}));

export const CITIES = [
  {
    label: "Lahore",
    value: "lahore",
  },
  {
    label: "Karachi",
    value: "karachi",
  },
  {
    label: "Islamabad",
    value: "islamabad",
  },
];

export const EMPLOYEMENT_TYPES = [
  {
    label: "Full Time",
    value: "full_time",
  },
  {
    label: "Part Time",
    value: "part_time",
  },
  {
    label: "Contract",
    value: "contract",
  },
];

export const LANGUAGES = languages.map((lang) => ({
  label: lang.name,
  value: lang.name.toLowerCase(),
}));

export const GRADES = [
  { label: "A +", value: "a +" },
  { label: "A", value: "a" },
  { label: "B", value: "b" },
  { label: "C", value: "c" },
  { label: "D", value: "d" },
  { label: "NO GRADE", value: "no grade" },
];

export const GENDERS = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Other",
    value: "other",
  },
];

export const SPECIALITIES = specialities;

export const BLOOD_GROUPS = [
  {
    label: "A+",
    value: "A positive",
  },
  {
    label: "A-",
    value: "A negative",
  },
  {
    label: "B+",
    value: "B positive",
  },
  {
    label: "B-",
    value: "B negative",
  },
  {
    label: "AB+",
    value: "AB positive",
  },
  {
    label: "AB-",
    value: "AB negative",
  },
  {
    label: "O+",
    value: "O positive",
  },
  {
    label: "O-",
    value: "O negative",
  },
];

export const ALLERGIES = allergies;
export const MEDICATIONS = medications;
