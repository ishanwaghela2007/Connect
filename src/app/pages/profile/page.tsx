// app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { account } from "@/lib/appwrite";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await account.deleteSession("current");
    window.location.href = "/pages/auth"; // redirect to login page
  };

  if (!user) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-[400px] text-center">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>

        <img
          src={`https://ui-avatars.com/api/?name=${user.name}`}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />

        <p className="text-lg font-semibold">{user.name}</p>
        <p className="text-gray-600">{user.email}</p>

        <button
          onClick={handleLogout}
          className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
