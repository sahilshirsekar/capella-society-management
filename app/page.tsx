import { NavigationMenuDemo } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import ButtonWithModal from "@/components/ui/button-with-modal";
import NavbarNew from "@/components/ui/navbar-new";
import Features from "@/components/features";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <main>
      <NavbarNew />
      <Hero/>
      {/* <!-- Features Section --> */}
      <Features/>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Capella. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
