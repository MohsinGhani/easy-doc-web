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
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/profile",
          label: "Overview",
          active: pathname === "/profile",
          icon: HomeIcon,
          submenus: [],
        },
        {
          href: "/patients-requests",
          label: "Patient’s Requests",
          active: pathname === "/patients-requests",
          icon: HomeIcon,
          submenus: [],
        },
        {
          href: "/appointments",
          label: "Appointment",
          active: pathname === "/appointments",
          icon: CopyCheck,
          submenus: [],
        },
        {
          href: "/available-timings",
          label: "Available Timings",
          active: pathname === "/available-timings",
          icon: ChartPie,
          submenus: [],
        },
        {
          href: "/my-patients",
          label: "My Patients",
          active: pathname === "/my-patients",
          icon: Users2,
          submenus: [],
        },
        {
          href: "/specialities-and-services",
          label: "Specialties & Services",
          active: pathname === "/specs-and-services",
          icon: HandCoins,
          submenus: [],
        },
        {
          href: "/patient-reviews",
          label: "Patient’s Reviews",
          active: pathname === "/patient-reviews",
          icon: HandCoinsIcon,
          submenus: [],
        },
        {
          href: "/messages",
          label: "Messages",
          active: pathname === "/messages",
          icon: MessageCircleMore,
          submenus: [],
        },
        {
          href: "/payout-settings",
          label: "Payout Settings",
          active: pathname === "/payout-settings",
          icon: MessageCircleMoreIcon,
          submenus: [],
        },
        {
          href: "/blogs",
          label: "Blogs",
          active: pathname === "/blogs",
          icon: HomeIcon,
          submenus: [],
        },
      ],
    },
  ];
}
