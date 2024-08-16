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
