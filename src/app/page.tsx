"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

import Scene from "@/components/scenes/scene";
import Scene2 from "@/components/scenes/scene2";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";


dynamic(() => import("@/components/scenes/scene"), { ssr: false });
dynamic(() => import("@/components/scenes/scene2"), { ssr: false });
dynamic(() => import("@/components/Navbar"), { ssr: false });
dynamic(() => import("@/components/Footer"), { ssr: false });

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
  const router = useRouter();

  const section2Ref = useRef<HTMLElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const section1ContentRef = useRef<HTMLDivElement | null>(null);
  const section2ContentRef = useRef<HTMLDivElement | null>(null);
  const scrollIndicatorRef = useRef<SVGSVGElement | null>(null);
  const section3ContentRef = useRef<HTMLDivElement | null>(null);

  // ✅ Ensure ScrollTrigger recalculates positions when page is restored
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  // ✅ Ensure ScrollTrigger recalculates positions when page is restored
  useGSAP(
    () => {
      ScrollTrigger.refresh();
    },
    { dependencies: [] }
  );

  // ✅ Scroll Progress Bar Animation
  useGSAP(
    () => {
      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }
    },
    { scope: progressBarRef }
  );

  // ✅ Section 1 Fade-In
  useGSAP(
    () => {
      if (section1ContentRef.current) {
        gsap.from(section1ContentRef.current.children, {
          opacity: 0,
          y: 40,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section1ContentRef.current,
            start: "top center",
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    { scope: section1ContentRef }
  );

  // ✅ Section 2 Fade-In
  useGSAP(
    () => {
      if (section2ContentRef.current) {
        gsap.from(section2ContentRef.current.children, {
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section2ContentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    { scope: section2ContentRef }
  );

  // ✅ Scroll Indicator Animation
  useGSAP(
    () => {
      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          y: 10,
          repeat: -1,
          yoyo: true,
          duration: 1,
          ease: "power1.inOut",
        });
      }
    },
    { scope: scrollIndicatorRef }
  );

  // ✅ Section 3 Fade-In
  useGSAP(
    () => {
      if (section3ContentRef.current) {
        gsap.from(section3ContentRef.current.children, {
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section3ContentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    { scope: section3ContentRef }
  );

  const handleGetStarted = () => router.push("/pages/auth");
  const handlePrivacy = () => router.push("/pages/privacy");

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 h-1 bg-green-500 z-[100]"
      />

      {/* Section 1 */}
      <section>
        <main className="relative h-screen bg-black text-white font-sketchy overflow-hidden">
          <Navbar />
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <Scene />
          </div>
          <div
            ref={section1ContentRef}
            className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center"
          >
            <h1 className="text-5xl font-bold text-white">
              Welcome to Connect
            </h1>
            <p className="text-xl mt-2 text-white">
              Where messages are delivered fast and securely
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-white text-black font-bold py-2 px-4 rounded-4xl mt-4"
            >
              Get Started
            </button>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
            <svg
              ref={scrollIndicatorRef}
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </main>
      </section>

      {/* Section 2 */}
      <section
        ref={section2Ref}
        className="bg-gray-100 relative h-screen text-white font-sketchy overflow-hidden"
      >
        <main>
          <Scene2 />
          <div
            ref={section2ContentRef}
            className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center"
          >
            <h1 className="text-5xl font-bold text-black">Privacy Policy</h1>
            <p className="text-xl mt-2 text-black max-w-xl mx-auto">
              We care about your data and ensure your privacy is protected at
              all times. Learn more about how we manage your information
              responsibly.
            </p>
            <button
              onClick={handlePrivacy}
              className="bg-white text-black font-bold py-2 px-4 rounded-4xl mt-4"
            >
              Learn More
            </button>
          </div>
        </main>
      </section>

      {/* Section 3 - ✅ Added Scene3 background */}
      <section className="bg-gray-100 relative h-screen text-white font-sketchy overflow-hidden border-t-2 border-black">
        <main>
          <div
            ref={section3ContentRef}
            className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center"
          >
            <h1 className="text-5xl font-bold text-black">Explore Our Apps</h1>
            <p className="text-xl mt-2 text-black max-w-xl mx-auto">
              Discover powerful tools designed to make your communication
              seamless. From real-time chat to secure file sharing — we've got
              it all.
            </p>
            <button
              onClick={() => router.push("/pages/apps")} 
              className="bg-white text-black font-bold py-2 px-4 rounded-4xl mt-4"
            >
              Learn More
            </button>
          </div>
        </main>
      </section>
      <Footer/>
    </>
  );
}