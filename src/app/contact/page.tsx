import { Metadata } from "next"
import Link from "next/link"
import { Mail, MapPin, Clock, HelpCircle } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ContactForm } from "./ContactForm" // Imports the interactive form we just made

export const metadata: Metadata = {
  title: 'Contact — Genova',
  description: 'Get in touch with the Genova AI team.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      
      {/* Header Section */}
      <section className="bg-muted/30 py-16 sm:py-24 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 animate-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-muted-foreground">
            Have questions? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* 2-Column Layout */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column - Contact Form */}
          <div className="animate-in slide-in-from-left-8 duration-700">
            <h2 className="text-2xl font-bold mb-8">Send us a message</h2>
            <div className="p-8 rounded-2xl border border-border/50 bg-muted/10 shadow-sm">
              <ContactForm />
            </div>
          </div>

          {/* Right Column - Info Cards */}
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-700">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="flex flex-col h-full border-border/50 hover:border-primary/50 transition-colors shadow-sm rounded-xl">
                <CardHeader>
                  <Mail className="h-6 w-6 text-primary mb-3" />
                  <CardTitle className="text-lg">Email</CardTitle>
                  <CardDescription className="text-base mt-1 text-foreground/80 font-medium">hello@genova.ai</CardDescription>
                </CardHeader>
              </Card>

              <Card className="flex flex-col h-full border-border/50 hover:border-primary/50 transition-colors shadow-sm rounded-xl">
                <CardHeader>
                  <MapPin className="h-6 w-6 text-primary mb-3" />
                  <CardTitle className="text-lg">Location</CardTitle>
                  <CardDescription className="text-base mt-1 text-foreground/80 font-medium">Dhaka, Bangladesh</CardDescription>
                </CardHeader>
              </Card>

              <Card className="flex flex-col h-full border-border/50 hover:border-primary/50 transition-colors shadow-sm rounded-xl">
                <CardHeader>
                  <div className="flex gap-4 mb-3 text-primary">
                    <a href="https://github.com" target="_blank" rel="noreferrer"><FaGithub className="h-5 w-5 hover:text-primary/70 cursor-pointer transition-colors" /></a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin className="h-5 w-5 hover:text-primary/70 cursor-pointer transition-colors" /></a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter className="h-5 w-5 hover:text-primary/70 cursor-pointer transition-colors" /></a>
                  </div>
                  <CardTitle className="text-lg">Social</CardTitle>
                  <CardDescription className="text-base mt-1">Follow us for updates</CardDescription>
                </CardHeader>
              </Card>

              <Card className="flex flex-col h-full border-border/50 hover:border-primary/50 transition-colors shadow-sm rounded-xl">
                <CardHeader>
                  <Clock className="h-6 w-6 text-primary mb-3" />
                  <CardTitle className="text-lg">Response Time</CardTitle>
                  <CardDescription className="text-base mt-1">We reply within 24 hours</CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Map Placeholder */}
            <div className="h-64 rounded-2xl bg-muted border border-border/50 flex flex-col items-center justify-center text-muted-foreground shadow-inner mt-8 relative overflow-hidden group">
              <MapPin className="h-10 w-10 mb-3 text-primary/50 group-hover:scale-110 group-hover:text-primary transition-all duration-500" />
              <span className="font-bold text-lg text-foreground/80">Based in Dhaka, Bangladesh</span>
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>

            {/* FAQ Link Section */}
            <div className="mt-8 rounded-2xl bg-primary/5 border border-primary/10 p-6 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="bg-background p-2.5 rounded-full shadow-sm">
                  <HelpCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Have quick questions?</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">Check our FAQ for quick answers.</p>
                </div>
              </div>
              <Button variant="outline" asChild className="hover:text-primary hover:border-primary/50 font-bold">
                <Link href="/#faq">View FAQ</Link>
              </Button>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}