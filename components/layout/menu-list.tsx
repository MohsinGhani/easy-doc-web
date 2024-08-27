import {
  LucideIcon,
  HomeIcon,
  CopyCheck,
  ChartPie,
  Users2,
  HandCoins,
  HandCoinsIcon,
  MessageCircleMore,
  MessageCircleMoreIcon,
  Settings,
  LifeBuoy,
} from "lucide-react";

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
};

export function getMenuList(pathname: string) {
  return [
    {
      href: "/dashboard",
      label: "Overview",
      active: pathname === "/dashboard",
      icon: HomeIcon,
    },
    {
      href: "/patients-requests",
      label: "Patient’s Requests",
      active: pathname === "/patients-requests",
      icon: HomeIcon,
    },
    {
      href: "/appointments",
      label: "Appointment",
      active: pathname === "/appointments",
      icon: CopyCheck,
    },
    {
      href: "/available-timings",
      label: "Available Timings",
      active: pathname === "/available-timings",
      icon: ChartPie,
    },
    // {
    //   href: "/my-patients",
    //   label: "My Patients",
    //   active: pathname === "/my-patients",
    //   icon: Users2,
    // },
    {
      href: "/specialities-and-services",
      label: "Specialties & Services",
      active: pathname === "/specs-and-services",
      icon: HandCoins,
    },
    {
      href: "/patients-reviews",
      label: "Patient’s Reviews",
      active: pathname === "/patients-reviews",
      icon: HandCoinsIcon,
    },
    {
      href: "/messages",
      label: "Messages",
      active: pathname === "/messages",
      icon: MessageCircleMore,
    },
    {
      href: "/payout-settings",
      label: "Payout Settings",
      active: pathname === "/payout-settings",
      icon: MessageCircleMoreIcon,
    },
    // {
    //   href: "/blogs",
    //   label: "Blogs",
    //   active: pathname === "/blogs",
    //   icon: HomeIcon,
    // },
    {
      href: "/faqs-and-support",
      label: "FAQ’s & Support",
      active: pathname === "/faqs-and-support",
      icon: LifeBuoy,
    },
    {
      href: "/settings",
      label: "Profile Settings",
      active: pathname === "/settings",
      icon: Settings,
    },
  ];
}

export function getFilteredMenuList(
  pathname: string,
  searchValue: string
): Menu[] {
  const originalMenuList = getMenuList(pathname);

  return originalMenuList.filter((menu) =>
    menu.label.toLowerCase().includes(searchValue.toLowerCase())
  );
}
