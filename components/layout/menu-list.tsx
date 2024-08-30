import {
  LucideIcon,
  HomeIcon,
  CopyCheck,
  ChartPie,
  HandCoinsIcon,
  Settings,
  LifeBuoy,
  MessageCircleMore,
} from "lucide-react";
import { PatientReview, PayoutIcon, Receipt, ServiceIcon } from "../icons";

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: JSX.Element;
};

export function getMenuList(pathname: string) {
  return [
    {
      href: "/dashboard",
      label: "Overview",
      active: pathname === "/dashboard",
      icon: <HomeIcon size={18} />,
    },
    {
      href: "/patients-requests",
      label: "Patient’s Requests",
      active: pathname === "/patients-requests",
      icon: <Receipt className="size-4 stroke-black stroke-2" />,
    },
    {
      href: "/appointments",
      label: "Appointment",
      active: pathname === "/appointments",
      icon: <CopyCheck size={18} />,
    },
    {
      href: "/available-timings",
      label: "Available Timings",
      active: pathname === "/available-timings",
      icon: <ChartPie size={18} />,
    },
    {
      href: "/specialities-and-services",
      label: "Specialties & Services",
      active: pathname === "/specs-and-services",
      icon: <ServiceIcon className="size-4 stroke-black stroke-2" />,
    },
    {
      href: "/patients-reviews",
      label: "Patient’s Reviews",
      active: pathname === "/patients-reviews",
      icon: <PatientReview className="size-4 stroke-black stroke-2" />,
    },
    {
      href: "/messages",
      label: "Messages",
      active: pathname === "/messages",
      icon: <MessageCircleMore size={18} />,
    },
    {
      href: "/payout-settings",
      label: "Payout Settings",
      active: pathname === "/payout-settings",
      icon: <PayoutIcon className="size-4 stroke-black stroke-2" />,
    },
    {
      href: "/faqs-and-support",
      label: "FAQ’s & Support",
      active: pathname === "/faqs-and-support",
      icon: <LifeBuoy size={18} />,
    },
    {
      href: "/settings",
      label: "Profile Settings",
      active: pathname === "/settings",
      icon: <Settings size={18} />,
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
