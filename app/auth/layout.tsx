import { Navbar } from "@/components/navbar/Navbar";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar className="" />
      <section className="pb-16">{children}</section>
    </>
  );
}
