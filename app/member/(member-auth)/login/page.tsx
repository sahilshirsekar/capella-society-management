import LoginForm from "@/components/login-form";

export default function LoginPage() {
  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
    //   <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
    //     <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>
    //     <LoginForm />
    //   </div>
    // </div>
    <div className="grid min-h-svh lg:grid-cols-2">
    <div className="flex flex-col gap-4 p-6 md:p-10">
      <div className="flex justify-center gap-2 md:justify-start">
        <a href="#" className="flex items-center gap-2 font-medium">
          <div className="flex h-20 w-32 items-center justify-center rounded-md  mx-10 text-primary-foreground">
            <img src="/landing/logo.png" alt="logo" className="w-full" />
          </div>
        </a>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Resident Login</h2>
          <LoginForm />{" "}
        </div>
      </div>
    </div>
    <div className="relative hidden lg:block ">
      <div className="flex h-full w-full items-center justify-center rounded-none mx-10 text-primary-foreground">
        <img src="/landing/logo.png" alt="logo" className="w-full  pr-40" />
      </div>
    </div>
  </div>
  )
}

