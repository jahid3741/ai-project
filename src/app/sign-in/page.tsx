import { SignIn } from "@clerk/nextjs";
import { Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* LEFT COLUMN: Brand/Marketing (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-primary flex-col justify-between p-12 text-primary-foreground relative overflow-hidden">
        {/* Subtle Background Texture & Glows */}
        <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/1080?random=5')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-white/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-white/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <Link
            href="/"
            className="text-3xl font-extrabold tracking-tight flex items-center gap-2"
          >
            Genova AI
          </Link>
        </div>

        <div className="relative z-10 max-w-md animate-in slide-in-from-left-8 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-bold mb-6 backdrop-blur-sm border border-white/20 shadow-sm">
            <Sparkles className="h-4 w-4" /> Welcome Back
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-8 leading-tight">
            Resume your journey to the perfect tech job.
          </h1>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-1.5 rounded-full">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <p className="text-lg text-white/90 font-medium">
                Access your AI mock interviews
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-1.5 rounded-full">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <p className="text-lg text-white/90 font-medium">
                Generate ATS-friendly resumes
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-1.5 rounded-full">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <p className="text-lg text-white/90 font-medium">
                Review your system design feedback
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-white/60 font-medium">
            © {new Date().getFullYear()} Genova AI. All rights reserved.
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN: Clerk Sign In (Centered) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        {/* Mobile Logo (Only visible on small screens when the left side is hidden) */}
        <div className="absolute top-8 left-8 lg:hidden">
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight text-primary"
          >
            Genova AI
          </Link>
        </div>

        <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500 delay-150 fill-mode-both">
          {/* We use Clerk's 'appearance' prop to hijack their CSS and make it look like ShadCN! */}
          <SignIn
            routing="hash"
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "shadow-2xl sm:shadow-2xl border border-border/50 bg-card w-full rounded-2xl overflow-hidden",
                headerTitle:
                  "text-3xl font-extrabold tracking-tight text-foreground",
                headerSubtitle: "text-base text-muted-foreground mt-2",
                socialButtonsBlockButton:
                  "h-12 border-border/50 text-foreground font-bold shadow-sm hover:bg-muted transition-colors",
                socialButtonsBlockButtonText: "font-semibold",
                dividerLine: "bg-border",
                dividerText: "text-muted-foreground font-medium",
                formFieldLabel:
                  "text-foreground font-bold uppercase tracking-wider text-xs",
                formFieldInput:
                  "h-12 border-border bg-background shadow-sm rounded-lg text-foreground focus:ring-primary focus:border-primary text-base",
                formButtonPrimary:
                  "h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-md transition-all text-base",
                footerActionText: "text-muted-foreground font-medium",
                footerActionLink:
                  "text-primary font-bold hover:text-primary/80",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
