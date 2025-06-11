"use client";

import { useRef, useState, useEffect } from "react";
import {
  ChevronDown,
  Download,
  ArrowRight,
  MessageCircle,
  Video,
  Users,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

export default function Navbar() {
  const logoRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<(HTMLButtonElement | null)[]>([]);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const navRef = useRef<HTMLElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const setLinkRef = (el: HTMLButtonElement | null, index: number) => {
    linksRef.current[index] = el;
  };

  const setButtonRef = (el: HTMLButtonElement | null, index: number) => {
    buttonsRef.current[index] = el;
  };

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }

    linksRef.current.forEach((link, index) => {
      if (link) {
        gsap.fromTo(
          link,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.2 + index * 0.1,
          }
        );
      }
    });

    buttonsRef.current.forEach((btn, index) => {
      if (btn) {
        gsap.fromTo(
          btn,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.5 + index * 0.15,
          }
        );
      }
    });
  }, []);

  const navItems = [
    { name: "Privacy", href: "/pages/privacy" },
    { name: "Apps", href: "/pages/apps" }
  ];

  const featureItems = [
    {
      name: "Messaging",
      icon: MessageCircle,
      description: "Send text, photos, and documents",
      gradient: "from-green-400 to-green-600",
    },
    {
      name: "Voice & Video",
      icon: Video,
      description: "High-quality calls worldwide",
      gradient: "from-blue-400 to-blue-600",
    },
    {
      name: "Groups",
      icon: Users,
      description: "Connect with up to 1024 people",
      gradient: "from-purple-400 to-purple-600",
    },
  ];

  return (
    <>
      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Backdrop for dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsDropdownOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 transition-all duration-300 ${
          isScrolled 
            ? "bg-black/90 backdrop-blur-md shadow-lg" 
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg">
            <div
              className="flex items-center gap-3 cursor-pointer"
              ref={logoRef}
              tabIndex={0}
              aria-label="Connect Logo"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white select-none">Connect</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Features Dropdown */}
            <DropdownMenu onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-1.5 text-white hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg px-3 py-2 font-medium"
                  ref={(el) => setLinkRef(el, 0)}
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                >
                  Features
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/95 backdrop-blur-md text-white border border-gray-800 shadow-2xl rounded-2xl p-4 w-80 mt-2 z-50">
                <h3 className="text-lg font-semibold mb-4 text-green-400">Features</h3>
                <div className="space-y-3">
                  {featureItems.map((item) => (
                    <DropdownMenuItem
                      key={item.name}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition-all cursor-pointer group border-0 focus:bg-white/10"
                      role="menuitem"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-white">
                            {item.name}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300">{item.description}</p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Navigation Links */}
            {navItems.map((item, i) => (
              <Link key={item.name} href={item.href}>
                <button
                  className="text-white hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg px-3 py-2 font-medium"
                  ref={(el) => setLinkRef(el, i + 1)}
                  type="button"
                >
                  {item.name}
                </button>
              </Link>
            ))}
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/pages/auth">
              <button
                className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all hover:from-green-500 hover:to-green-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-lg"
                ref={(el) => setButtonRef(el, 0)}
                aria-label="Log in"
                type="button"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            type="button"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-t border-gray-800 shadow-2xl">
            <div className="px-6 py-4 space-y-4">
              {/* Mobile Features */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-green-400">Features</h3>
                {featureItems.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="text-sm text-gray-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-800 pt-4 space-y-3">
                {navItems.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <button
                      className="block w-full text-left text-white hover:text-green-400 transition-colors px-3 py-2 rounded-lg font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </button>
                  </Link>
                ))}
              </div>

              <div className="border-t border-gray-800 pt-4">
                <Link href="/pages/auth">
                  <button
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-full font-semibold transition-all hover:from-green-500 hover:to-green-700 shadow-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}