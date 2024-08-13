"use client";

// Importing the LandingPage component from the components/home directory
import LandingPage from "@/components/home/LandingPage";
import { useAppSelector } from "@/lib/hooks";

// This is the Home component. It's the main page of our application.
// It's defined as a default export, which means it can be imported and used
// in other parts of the application without having to use curly braces.
export default function Home() {
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);
  // This function returns the LandingPage component.
  // The LandingPage component is the main page of our application.
  // It's the component that will be rendered when the user visits the home page.
  return (
    <div>
      {isLoggedIn ? (
        <div className="flex flex-col items-center">
          <h1 className="text-center text-3xl text-primary">
            Welcome, {user?.email}
          </h1>
          <h6 className="text-center text-muted-foreground">
            Your role is, {user?.role}
          </h6>
        </div>
      ) : (
        <LandingPage />
      )}
    </div>
  );
}
