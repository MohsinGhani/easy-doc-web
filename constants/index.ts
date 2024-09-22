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

// Navbar Links
export const NAV_LINKS = [
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
export const NAV_LINKS_FOR_AUTH = [
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

export const FAQS = [
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
export const INSTITUTES = [
  "Oxford University",
  "Harvard University",
  "Stanford University",
  "University of California Berkeley",
  "University of Cambridge",
  "University College London",
  "University of Washington Seattle",
].map((elem) => ({
  label: elem,
  value: elem,
}));

// Degrees to be selected by the doctor
export const DEGREES = [
  "MBBS",
  "B Pharmacy",
  "BSc Psychology",
  "BSc Biomedical Science",
  "B.Sc. Medical Laboratory Technology (BMLT)",
  "B.Sc. Nutrition and Dietetics",
  "Agricultural Sciences",
  "Paramedical Courses",
  "Bachelor of Physiotherapy",
].map((elem) => ({
  label: elem,
  value: elem,
}));

// Fields of studies to be selected by the doctor
export const FIELDS = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Oncology",
  "Doctor of Physical Therapy (DPT)",
  "Bachelor of Dental Surgery (BDS)",
  "Medical Laboratory Technology",
  "Biotechnology",
  "Nanotechnology",
  "Microbiology",
  "Psychology",
  "Biomedical Engineering",
  "Nursing",
  "Biogenetics",
  "BHMS (Bachelor of Homeopathic Medicine & Surgery)",
  "Intensive Care",
  "Biochemistry",
].map((field) => ({
  label: field,
  value: field,
}));

export const COUNTRIES = countries.map((c) => ({
  label: `${c.flag} ${c.name}`,
  value: c.code,
}));

export const EMPLOYEMENT_TYPES = ["Full Time", "Part Time", "Contract"].map(
  (elem) => ({
    label: elem,
    value: elem,
  })
);

export const LANGUAGES = languages.map((lang) => ({
  label: lang.name,
  value: lang.name.toLowerCase(),
}));

export const GRADES = ["A +", "A", "B", "C", "D", "NO GRADE"].map((grade) => ({
  label: grade,
  value: grade,
}));

export const GENDERS = ["Male", "Female", "Other"].map((elem) => ({
  label: elem,
  value: elem,
}));

export const SPECIALITIES = specialities;

export const BLOOD_GROUPS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
].map((elem) => ({
  label: elem,
  value: elem,
}));

export const ALLERGIES = allergies.map((elem) => ({
  label: elem,
  value: elem,
}));

export const MEDICATIONS = medications.map((elem) => ({
  label: elem,
  value: elem,
}));

export const CONSULTATION_TYPES = ["Self", "Other"].map((elem) => ({
  label: elem,
  value: elem,
}));
