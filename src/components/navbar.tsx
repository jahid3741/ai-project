"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useUser, useClerk } from "@clerk/nextjs";
import { Menu, Moon, Sun, X, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { setTheme, theme } = useTheme();
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const loggedOutLinks = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const loggedInLinks = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "AI Tools", href: "/ai-tools" },
    { name: "Profile", href: "/profile" },
    { name: "Settings", href: "/settings" },
  ];

  const links = isSignedIn ? loggedInLinks : loggedOutLinks;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand / Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AppLogo
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side Actions */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle dark mode"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {!isLoaded ? (
              <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
            ) : isSignedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full ring-2 ring-transparent hover:ring-primary/50 transition-all"
                  >
                    {user?.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt="User avatar"
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.fullName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.primaryEmailAddress?.emailAddress}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                    onClick={() => signOut()}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/sign-in">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/sign-up">Register</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Actions (Theme Toggle & Hamburger) */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Auth Section */}
            {!isLoaded ? null : isSignedIn ? (
              <div className="mt-4 border-t pt-4">
                <div className="flex items-center px-3 mb-4">
                  {user?.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      alt="Avatar"
                      className="h-10 w-10 rounded-full object-cover mr-3"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3">
                      <User className="h-5 w-5" />
                    </div>
                  )}
                  <div>
                    <div className="text-base font-medium">
                      {user?.fullName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {user?.primaryEmailAddress?.emailAddress}
                    </div>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  className="w-full justify-start px-3"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signOut();
                  }}
                >
                  Log out
                </Button>
              </div>
            ) : (
              <div className="mt-4 flex flex-col gap-2 border-t pt-4 px-3">
                <Button
                  variant="outline"
                  className="w-full justify-center"
                  asChild
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href="/sign-in">Login</Link>
                </Button>
                <Button
                  className="w-full justify-center"
                  asChild
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href="/sign-up">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
