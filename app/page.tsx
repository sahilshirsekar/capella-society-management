import NavbarNew from "@/components/ui/navbar-new";
import Features from "@/components/features";
import Hero from "@/components/hero";
import LandingPage from "@/components/landing-page";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <SessionProvider>
      <main>
        <LandingPage />
      </main>
    </SessionProvider>
  );
}
