import { Wand2, Lightbulb, ShieldCheck, Headset } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Real, meaningful feature descriptions
const features = [
  {
    title: "AI Content Generator",
    description:
      "Instantly draft high-quality blog posts, social media captions, and professional emails with our advanced language models.",
    icon: Wand2,
  },
  {
    title: "Smart Recommendations",
    description:
      "Analyze your audience data in real-time to discover personalized strategies that boost engagement and drive conversions.",
    icon: Lightbulb,
  },
  {
    title: "Secure Dashboard",
    description:
      "Manage your entire workflow in a centralized, encrypted workspace that prioritizes your privacy and data protection.",
    icon: ShieldCheck,
  },
  {
    title: "24/7 Support",
    description:
      "Get round-the-clock assistance from our dedicated team of experts, ensuring your creative process never hits a roadblock.",
    icon: Headset,
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Choose Us
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience a new standard of productivity with tools designed to
            empower your creativity and scale your workflow effortlessly.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              // 'rounded-xl', 'h-full', and 'flex flex-col' ensure identical heights and clean stretching
              className="h-full flex flex-col rounded-xl border bg-card/50 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardHeader className="pb-4">
                {/* Icon Container wrapped in Primary Color styling */}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>

              {/* CardContent is flex-1 to push any subsequent content to the bottom if needed, aligning text perfectly */}
              <CardContent className="flex-1">
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
