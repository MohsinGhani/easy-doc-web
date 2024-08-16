export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* <Navbar /> */}
      <main className="max-w-[1440px] mx-auto">{children}</main>
    </div>
  );
}
