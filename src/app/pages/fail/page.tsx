"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthFail() {
  const router = useRouter();

  useEffect(() => {
    // Optional: Auto-redirect after 5 seconds
    const timeout = setTimeout(() => {
      router.push("/auth");
    }, 5000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-md text-center space-y-4">
        <h1 className="text-2xl font-bold text-red-600">❌ Authentication Failed</h1>
        <p className="text-gray-700">
          Something went wrong while trying to authenticate your account.
        </p>
        <p className="text-sm text-gray-500">
          You’ll be redirected shortly, or you can
          <button
            onClick={() => router.push("/auth")}
            className="text-blue-600 ml-1 underline"
          >
            go back manually
          </button>.
        </p>
      </div>
    </div>
  );
}
