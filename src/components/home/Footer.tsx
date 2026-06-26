"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter, FaDiscord } from "react-icons/fa6";

const footerLinks = {
  products: [
    { name: "AI Interview", href: "/ai-tools/tool/mock-interview" },
    { name: "Resume Builder", href: "/ai-tools/tool/bullet-enhancer" },
    { name: "ATS Checker", href: "/ai-tools/tool/ats-matcher" },
    { name: "Mock Assessment", href: "/ai-tools/tool/system-design" },
  ],

  resources: [
    { name: "Blog", href: "https://blog.bytebytego.com/" },
    {
      name: "Career Guides",
      href: "https://www.freecodecamp.org/news/systems-design-for-interviews/",
    },
    {
      name: "Interview Questions",
      href: "https://leetcode.com/explore/interview/",
    },
    { name: "Help Center", href: "#" },
  ],

  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 gap-8 mb-16 md:grid-cols-4 lg:grid-cols-5">
          {/* Logo */}
          <div className="col-span-2">
            <Link href="/" className="inline-block">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Revenio
              </h2>
            </Link>

            <p className="mt-4 max-w-sm text-muted-foreground leading-7">
              AI-powered interview preparation platform for developers. Practice
              mock interviews, optimize your ATS resume, and land your dream
              tech job.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-5 mt-6">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-muted-foreground transition hover:text-primary"
              >
                <FaXTwitter size={20} />
              </a>

              <a
                href="https://github.com/jahid3741"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground transition hover:text-primary"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="https://www.linkedin.com/in/md-jahidul-islam-3741"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground transition hover:text-primary"
              >
                <FaLinkedin size={20} />
              </a>

              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="text-muted-foreground transition hover:text-primary"
              >
                <FaDiscord size={20} />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-4 font-semibold">Products</h3>

            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 font-semibold">Resources</h3>

            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-semibold">Legal</h3>

            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Revenio. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-all hover:bg-primary hover:text-primary-foreground"
          >
            Back to Top
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
