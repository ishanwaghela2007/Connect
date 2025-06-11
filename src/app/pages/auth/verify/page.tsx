"use client";

import React, { useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Get the userId and secret from URL parameters
        const userId = searchParams.get("userId");
        const secret = searchParams.get("secret");

        if (!userId || !secret) {
          setStatus("error");
          setMessage("Invalid verification link. Missing required parameters.");
          return;
        }

        // Verify the email using Appwrite
        await account.updateVerification(userId, secret);
        
        setStatus("success");
        setMessage("Email verified successfully! You can now log in to your account.");
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          router.push("/pages/auth?verified=true");
        }, 3000);

      } catch (error: any) {
        setStatus("error");
        setMessage(error.message || "Email verification failed. The link may be expired or invalid.");
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  const handleResendVerification = async () => {
    try {
      await account.createVerification(`${window.location.origin}/pages/auth/verify`);
      setMessage("A new verification email has been sent. Please check your inbox.");
    } catch (error: any) {
      setMessage("Failed to resend verification email. Please try logging in again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center space-y-6">
        {status === "verifying" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <h2 className="text-xl font-semibold text-gray-800">
              Verifying Your Email...
            </h2>
            <p className="text-gray-600">
              Please wait while we verify your email address.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-6xl">✅</div>
            <h2 className="text-xl font-semibold text-green-600">
              Email Verified Successfully!
            </h2>
            <p className="text-gray-600">{message}</p>
            <p className="text-sm text-gray-500">
              Redirecting you to login page in a few seconds...
            </p>
            <button
              onClick={() => router.push("/pages/auth")}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Go to Login
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-6xl">❌</div>
            <h2 className="text-xl font-semibold text-red-600">
              Verification Failed
            </h2>
            <p className="text-gray-600">{message}</p>
            <div className="space-y-3">
              <button
                onClick={handleResendVerification}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Resend Verification Email
              </button>
              <button
                onClick={() => router.push("/pages/auth")}
                className="w-full text-blue-600 py-2 px-4 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              >
                Back to Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}