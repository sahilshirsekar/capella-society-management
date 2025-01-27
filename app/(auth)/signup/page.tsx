import SignUpForm from "@/components/form/signup";

export default function(){
  return (
  //  <div className='w-full'>
  //     <SignUpForm />
  //   </div>
    <div className="grid min-h-svh lg:grid-cols-2">
          <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex justify-center gap-2 md:justify-start">
              <a href="#" className="flex items-center gap-2 font-medium">
                <div className="flex h-20 w-32 items-center justify-center rounded-md bg-primary mx-10 text-primary-foreground">
                <img src="./landing/logo.png" alt="logo" className="w-full"/>
                </div>
                </a>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <div className="w-full max-w-xs">
                <SignUpForm />
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block bg-primary">
          <div className="flex h-full w-full items-center justify-center rounded-none bg-primary mx-10 text-primary-foreground">
                <img src="./landing/logo.png" alt="logo" className="w-full  pr-10"/>
                </div>
          </div>
        </div>
  )
}