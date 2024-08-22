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
