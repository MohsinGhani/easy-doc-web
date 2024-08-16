// import { Navbar } from "@/components/navbar/Navbar"; // Importing the Navbar component from the specified path

/**
 * The DemoLayout function is a default layout component.
 * It takes a prop named children, which is a React node.
 * It returns a div element containing the Navbar component and the children prop.
 * This layout is used to wrap the entire application's pages.
 *
 * @param {Object} props - An object containing the children prop.
 * @param {React.ReactNode} props.children - The content to be rendered inside the layout.
 * @return {JSX.Element} A div element containing the Navbar component and the children prop.
 */
export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Rendering the Navbar component */}
      {/* <Navbar /> */}
      {/* Rendering the children prop */}
      <main className="max-w-[1440px] mx-auto">{children}</main>
    </div>
  );
}
