"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const userStr = localStorage.getItem("user")
    const isFirstLogin = localStorage.getItem("isFirstLogin")

    if (userStr) {
      setUser(JSON.parse(userStr))
      if (isFirstLogin === "true") {
        router.push("/member-first-login")
      }
    } else {
      router.push("/login")
    }
  }, [router])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome to your Dashboard</h2>
        <div className="mt-2 text-center text-sm text-gray-600">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </div>
  )
}

