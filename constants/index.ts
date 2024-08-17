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

// Sidebar Links for logged In Doctor's
export const sideNavLinksForDoctor = [
  {
    label: "Overview",
    location: "/profile",
  },
  {
    label: "Patient's Requests",
    location: "/requests",
  },
  {
    label: "Appointments",
    location: "/appointments",
  },
  {
    label: "Available Timings",
    location: "/available-timings",
  },
  {
    label: "My Patients",
    location: "/my-patients",
  },
  {
    label: "Specialities & Services",
    location: "/specialities-services",
  },
  {
    label: "Patient's Reviews",
    location: "/reviews",
  },
  {
    label: "Messages",
    location: "/messages",
  },
  {
    label: "Payout Settings",
    location: "/payout-settings",
  },
  {
    label: "Blogs",
    location: "/blogs",
  },
  // {
  //   label: "FAQ’s & Support",
  //   location: "/faqs",
  // },
  // {
  //   label: "Doctors",
  //   location: "/doctors",
  // },
  // {
  //   label: "Specialists",
  //   location: "/specialists",
  // },
];
