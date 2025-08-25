"use client";
import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

interface AppItem {
  name: string;
  description: string;
  url: string;
  image: string;
}

const apps: AppItem[] = [
  {
    name: "WhatsApp",
    description: "A real-time chat app with end-to-end encryption.",
    url: "https://www.whatsapp.com/",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
  },
  {
    name: "Instagram",
    description: "A social platform to share photos, stories, and reels.",
    url: "https://www.instagram.com/",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg",
  },
  {
    name: "Facebook",
    description: "Connect with friends and communities worldwide.",
    url: "https://www.facebook.com/",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
  },
];

const AppsPage: React.FC = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".app-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-10">
      <h1 className="text-5xl font-bold mb-12 text-center">Our Apps</h1>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {apps.map((app, index) => (
          <a
            key={index}
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="app-card block bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="p-6 flex flex-col items-center text-center">
              <Image
                src={app.image}
                alt={app.name}
                width={80}
                height={80}
                className="mb-4"
              />
              <h2 className="text-2xl font-semibold mb-2">{app.name}</h2>
              <p className="text-gray-300 text-sm">{app.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default AppsPage;
