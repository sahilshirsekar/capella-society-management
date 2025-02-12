import FirstLoginForm from "@/components/first-login-form";
import Image from "next/image";
import logo from "../../public/logo.png"

export default function FirstLoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-coljustify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-20 w-32 items-center justify-center rounded-md  mx-10 text-primary-foreground">
              {/* <Image src={logo} alt="Logo" className="w-full" /> */}
              <img src="/landing/logo.png" alt="logo" className="w-full  " />
            </div>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Complete Your Profile
            </h2>
            <FirstLoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block ">
        <div className="flex h-full w-full items-center justify-center rounded-none mx-10 text-primary-foreground">
          <img src="/landing/logo.png" alt="logo" className="w-full  pr-40" />
          {/* <Image src={logo} alt="Logo" className="w-full" ></Image> */}
        </div>

      </div>
    </div>
  );
}
