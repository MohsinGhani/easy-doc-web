import PanelLayout from "@/components/layout/panel-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PanelLayout>{children}</PanelLayout>;
}
