import { Button, buttonVariants } from "@/components/ui/button";
import { Facebook, Youtube, Twitter } from "lucide-react";
import Link from "next/link";
import LogoText from "../LogoText";
import { cn } from "@/lib/utils";

export default function PatientFooter() {
  return (
    <footer className="mx-auto max-w-[1440px] pt-8 w-full">
      <div className="bg-slate-50 sm:px-8 lg:px-[150px] px-4 lg:py-[100px] py-4 grid gap-10 lg:grid-cols-2 grid-cols-1">
        <div className="space-y-6">
          <LogoText />
          <p className="text-sm text-muted-foreground max-w-md">
            Amet quis rhoncus turpis phasellus ut dui. Volutpat turpis tortor
            blandit eget nibh ac lacus vitae purus. Sagittis tortor fermentum.
          </p>
          <div className="flex space-x-[10px] md:self-start self-end">
            <a className={cn(buttonVariants({ size: "icon" }))} target="_blank" href="#">
              <Twitter className="h-4 w-4 fill-white" />
            </a>
            <a className={cn(buttonVariants({ size: "icon" }))} target="_blank" href="#">
              <Youtube className="h-4 w-4 fill-white text-primary" />
            </a>
            <a className={cn(buttonVariants({ size: "icon" }))} target="_blank" href="#">
              <Facebook className="h-4 w-4 fill-white" />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-3 lg:gap-[104px] md:gap-10 gap-4 text-sm">
          <div>
            <h2 className="font-semibold mb-2">Navigation</h2>
            <ul className="space-y-1">
              <li>
                <Link href="#">Home</Link>
              </li>
              <li>
                <Link href="#">About Us</Link>
              </li>
              <li>
                <Link href="#">Services</Link>
              </li>
              <li>
                <Link href="#">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Services</h2>
            <ul className="space-y-1">
              <li>
                <Link href="#">Teeth Whitening</Link>
              </li>
              <li>
                <Link href="#">Dental Filling</Link>
              </li>
              <li>
                <Link href="#">Teeth Checkup</Link>
              </li>
              <li>
                <Link href="#">Teeth Implants</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Resources</h2>
            <ul className="space-y-1">
              <li>
                <Link href="#">Customer Stories</Link>
              </li>
              <li>
                <Link href="#">Help Center</Link>
              </li>
              <li>
                <Link href="#">Documentation</Link>
              </li>
              <li>
                <Link href="#">Blog & Guide</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="sm:px-8 lg:px-[150px] px-4 py-4 text-center text-sm bg-primary text-primary-foreground">
        <p>Copyright &copy; 2024 EasyDoc | Design by IndieTech</p>
        <div className="mt-2 space-x-4">
          <Link href="#" className="hover:underline">
            Terms of Use
          </Link>
          <Link href="#" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
