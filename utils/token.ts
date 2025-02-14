import { useRouter } from "next/navigation";

export const handleRefreshToken = async () => {
  const router = useRouter();

  try {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      router.push("/login");
      return null;
    }

    const response = await fetch("/api/refresh-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Refresh token invalid or expired");
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken; // Return new token
  } catch (error) {
    console.error("Error refreshing token:", error);
    router.push("/login");
    return null;
  }
};
