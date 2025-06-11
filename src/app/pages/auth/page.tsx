"use client";

import React, { useState, useEffect } from "react";
import { account } from "@/lib/appwrite";
import { useRouter, useSearchParams } from "next/navigation";
import { ID, OAuthProvider } from "appwrite";

export default function Auth() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<
    "login" | "signup" | "verifyEmailSent" | "done"
  >("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user came from email verification
    const verified = searchParams.get("verified");
    if (verified === "true") {
      setError("");
      // Show a success message or automatically redirect
      setTimeout(() => {
        setStep("login");
      }, 100);
    }
  }, [searchParams]);

  const handleSignup = async (e: any) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      // First, make sure no existing session
      try {
        await account.deleteSession('current');
        console.log("Existing session deleted");
      } catch (e) {
        console.log("No existing session to delete");
      }
      
      // Create the user account
      const response = await account.create(ID.unique(), email, password, name);
      console.log("Account created:", response);
      
      // Create a fresh session (login the user temporarily)
      await account.createEmailPasswordSession(email, password);
      console.log("New session created");
      
      // Now send verification email (user must be authenticated)
      await account.createVerification(`${window.location.origin}/pages/auth/verify`);
      console.log("Verification email sent");
      
      // IMPORTANT: Delete the session after sending verification email
      // User should not be logged in until they verify their email
      await account.deleteSession('current');
      console.log("Session deleted - user logged out until verification");
      
      setStep("verifyEmailSent");
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message);
      
      // Make sure to logout user even if there's an error
      try {
        await account.deleteSession('current');
      } catch (logoutError) {
        console.log("No session to delete");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      // Clear any existing session first
      try {
        await account.deleteSession('current');
        console.log("Cleared existing session");
      } catch (e) {
        console.log("No existing session to clear");
      }
      
      // Create email/password session
      await account.createEmailPasswordSession(email, password);
      console.log("New session created");
      
      // Get user details
      const user = await account.get();
      console.log("User details:", user);
      
      // Check if email is verified
      if (!user.emailVerification) {
        console.log("Email not verified, sending verification email");
        
        // Send verification email (user is already authenticated)
        try {
          await account.createVerification(`${window.location.origin}/pages/auth/verify`);
          console.log("Verification email sent");
          
          // Logout user until they verify
          await account.deleteSession('current');
          console.log("User logged out until verification");
          
          setStep("verifyEmailSent");
          return;
        } catch (verifyError: any) {
          console.error("Verification email error:", verifyError);
          await account.deleteSession('current'); // Logout on error
          setError("Failed to send verification email. Please try again.");
          return;
        }
      }
      
      // Email is verified, proceed to dashboard
      setUser(user);
      setStep("done");
      
      setTimeout(() => {
        router.push("/pages/dashboard");
      }, 1000);
      
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOauth = async () => {
    setError("");
    try {
      await account.createOAuth2Session(
        OAuthProvider.Google,
        `${window.location.origin}/pages/dashboard`, // success redirect
        `${window.location.origin}/pages/fail` // failure redirect
      );
    } catch (err: any) {
      console.error("OAuth error:", err);
      setError("OAuth login failed. Please try again.");
    }
  };

  const handleResendVerification = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      // If no email provided, ask for it
      if (!email) {
        setError("Please enter your email address first.");
        return;
      }
      
      // Try to create verification (user might already be logged in)
      try {
        await account.createVerification(`${window.location.origin}/pages/auth/verify`);
        alert("Verification email sent! Please check your inbox.");
      } catch (verifyError: any) {
        // If user is not authenticated, try to login first
        if (verifyError.code === 401) {
          const userPassword = prompt("Please enter your password to resend verification:");
          if (userPassword) {
            await account.createEmailPasswordSession(email, userPassword);
            await account.createVerification(`${window.location.origin}/pages/auth/verify`);
            alert("Verification email sent! Please check your inbox.");
          } else {
            setError("Password required to resend verification email.");
          }
        } else {
          throw verifyError;
        }
      }
    } catch (err: any) {
      console.error("Resend verification error:", err);
      setError("Failed to send verification email. Please try again or contact support.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-sm w-full bg-white p-6 rounded-xl shadow-md space-y-6">
        {step === "login" && (
          <>
            <h2 className="text-xl font-semibold text-center">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
            
            <button
              onClick={() => setStep("signup")}
              className="w-full text-blue-500 hover:text-blue-600"
              disabled={isLoading}
            >
              Create an account
            </button>

            {/* Resend verification link */}
            <button
              onClick={handleResendVerification}
              className="w-full text-sm text-gray-500 hover:text-gray-600"
              disabled={isLoading}
            >
              Resend verification email
            </button>

            {/* Divider */}
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <div className="h-px bg-gray-300 w-full" />
              <span className="text-sm">or</span>
              <div className="h-px bg-gray-300 w-full" />
            </div>

            {/* Google OAuth Button */}
            <button
              className="w-full flex items-center justify-center gap-2 bg-white border py-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
              onClick={handleOauth}
              disabled={isLoading}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
                className="w-5 h-5"
              />
              <span className="text-sm font-medium text-gray-700">
                Continue with Google
              </span>
            </button>
          </>
        )}

        {step === "signup" && (
          <>
            <h2 className="text-xl font-semibold text-center">Create Account</h2>
            <form onSubmit={handleSignup} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
              <input
                type="password"
                placeholder="Password (min. 8 characters)"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                disabled={isLoading}
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
            
            <button
              onClick={() => setStep("login")}
              className="w-full text-blue-500 hover:text-blue-600"
              disabled={isLoading}
            >
              Back to Login
            </button>

            {/* Divider */}
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <div className="h-px bg-gray-300 w-full" />
              <span className="text-sm">or</span>
              <div className="h-px bg-gray-300 w-full" />
            </div>

            {/* Google OAuth Button */}
            <button
              className="w-full flex items-center justify-center gap-2 bg-white border py-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
              onClick={handleOauth}
              disabled={isLoading}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
                className="w-5 h-5"
              />
              <span className="text-sm font-medium text-gray-700">
                Continue with Google
              </span>
            </button>
          </>
        )}

        {step === "verifyEmailSent" && (
          <div className="text-center space-y-4">
            <div className="text-6xl">📧</div>
            <h2 className="text-xl text-blue-600 font-semibold">
              Check Your Email
            </h2>
            <p className="text-sm text-gray-600">
              We've sent a verification link to <br />
              <b className="text-gray-800">{email}</b>
            </p>
            <p className="text-xs text-gray-500">
              Click the link in the email to verify your account, then return here to log in.
            </p>
            <div className="pt-4 space-y-2">
              <button
                onClick={handleResendVerification}
                className="w-full text-sm text-blue-600 hover:text-blue-700 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Resend verification email"}
              </button>
              <button
                onClick={() => setStep("login")}
                className="w-full text-sm text-gray-500 hover:text-gray-600"
              >
                Back to Login
              </button>
            </div>
          </div>
        )}

        {step === "done" && (
          <div className="text-center space-y-4">
            <div className="text-6xl">✅</div>
            <h2 className="text-green-600 font-semibold">
              Welcome Back!
            </h2>
            {user && (
              <p className="text-sm text-gray-700">
                Hello, <b>{user.name || user.email}</b>
              </p>
            )}
            <p className="text-sm text-gray-500">
              Redirecting to dashboard...
            </p>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}