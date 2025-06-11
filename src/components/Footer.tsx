"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MessageCircle,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  Shield,
  Users,
  Video,
  Globe,
  Heart,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const router = useRouter();
  const footerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<HTMLDivElement | null>(null);
  const socialRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  // Animate footer elements on scroll
  useGSAP(() => {
    if (contentRef.current) {
      gsap.from(contentRef.current.children, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, []);

  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Messaging", href: "/pages/messaging" },
      { name: "Voice & Video", href: "/pages/calls" },
      { name: "Groups", href: "/pages/groups" },
      { name: "File Sharing", href: "/pages/files" },
    ],
    company: [
      { name: "About Us", href: "/pages/about" },
      { name: "Careers", href: "/pages/careers" },
      { name: "Press", href: "/pages/press" },
      { name: "Blog", href: "/pages/blog" },
      { name: "Contact", href: "/pages/contact" },
    ],
    support: [
      { name: "Help Center", href: "/pages/help" },
      { name: "Community", href: "/pages/community" },
      { name: "Status", href: "/pages/status" },
      { name: "API Docs", href: "/pages/api" },
      { name: "Downloads", href: "/pages/downloads" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/pages/privacy" },
      { name: "Terms of Service", href: "/pages/terms" },
      { name: "Security", href: "/pages/security" },
      { name: "Cookies", href: "/pages/cookies" },
    ],
  };

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/connect" },
    { name: "GitHub", icon: Github, href: "https://github.com/connect" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/connect" },
  ];

  const stats = [
    { number: "10M+", label: "Active Users" },
    { number: "50+", label: "Countries" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <footer
      ref={footerRef}
      className="bg-black text-white font-sketchy relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_40%,rgba(34,197,94,0.1),transparent_50%)]" />
      </div>

      <div ref={contentRef} className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          {/* CTA Section */}
          <div
            ref={ctaRef}
            className="text-center mb-16 pb-16 border-b border-gray-800"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Connect?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join millions of users who trust Connect for their daily communication needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => router.push("/pages/auth")}
                className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-600 text-white px-8 py-3 rounded-full font-semibold transition-all hover:from-green-500 hover:to-green-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-lg"
              >
                Get Started Free <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => router.push("/pages/downloads")}
                className="flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold transition-all hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white"
              >
                <Download className="w-5 h-5" />
                Download App
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Links Grid */}
          <div
            ref={linksRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {/* Product */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">
                Product
              </h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">
                Support
              </h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">
                Legal
              </h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-8 mb-16 p-8 bg-gray-900/50 rounded-2xl border border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold">Email Us</p>
                <p className="text-gray-300">support@connect.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold">Call Us</p>
                <p className="text-gray-300">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold">Visit Us</p>
                <p className="text-gray-300">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 bg-gray-900/30">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Logo & Copyright */}
              <div ref={logoRef} className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white">Connect</span>
                </Link>
                <div className="text-gray-300 text-sm">
                  © 2025 Connect. All rights reserved.
                </div>
              </div>

              {/* Social Links */}
              <div ref={socialRef} className="flex items-center gap-6">
                <span className="text-gray-300 text-sm hidden md:block">
                  Follow us:
                </span>
                <div className="flex items-center gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-green-400 hover:to-green-600 rounded-full flex items-center justify-center transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400"
                      aria-label={social.name}
                    >
                      <social.icon className="w-5 h-5 text-white" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Made with Love */}
            <div className="text-center pt-6 border-t border-gray-800 mt-8">
              <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
                Made with <Heart className="w-4 h-4 text-red-400 fill-current" /> by the Connect Team
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}