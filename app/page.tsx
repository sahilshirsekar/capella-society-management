import { NavigationMenuDemo } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  const navbar = [];

  return (
    <main>
      <div className="flex justify-between ">
        {/* <Image></Image> */}
        <NavigationMenuDemo />
        <div className="items-end m-5 ">
          <Button className="px-10" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2 p-40">
        <div className="text-blue-600 text-6xl font-bold">Be Smart In Managing Housing Society Online</div>
        <div>We help to provide services like instant maintenance bill generation, smart notification through mobile apps, pay maintenance bills by CC / DC / NB, Alert reminder on outstanding dues, Instant notices & circulars, fully integrated accounting system with automated trial balance</div>
        </div>
        <div className="w-1/2">
          <img src="./landing/image.png" alt="hero"></img>
        </div>
      </div>
    </main>
  );
}
