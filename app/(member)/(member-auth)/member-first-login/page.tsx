import FirstLoginForm from "@/components/first-login-form";

export default function FirstLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Complete Your Profile</h2>
        <FirstLoginForm />
      </div>
    </div>
  )
}

