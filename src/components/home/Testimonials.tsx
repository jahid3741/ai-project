"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Senior Frontend Engineer",
    company: "Google",
    content: "The AI Interview feature completely transformed my prep for technical rounds. The system design questions were incredibly accurate to the real thing.",
    avatar: "SJ"
  },
  {
    name: "David Chen",
    role: "Full Stack Developer",
    company: "Microsoft",
    content: "I struggled with getting past the ATS screens. The ATS Checker highlighted exactly what I was missing. Landed my dream role 3 weeks later.",
    avatar: "DC"
  },
  {
    name: "Elena Rodriguez",
    role: "Backend Engineer",
    company: "Amazon",
    content: "Having an AI Career Coach available 24/7 meant I could refine my leadership principles answers at 2 AM before my final loop.",
    avatar: "ER"
  },
  {
    name: "Michael Chang",
    role: "Software Engineer",
    company: "Stripe",
    content: "The Mock Assessment environment feels identical to real coding challenges. It helped me manage my time and anxiety perfectly.",
    avatar: "MC"
  },
  {
    name: "Jessica Walsh",
    role: "React Native Developer",
    company: "Shopify",
    content: "As a self-taught dev, the Portfolio Review gave me the actionable, harsh-but-fair feedback I needed to stand out to top-tier recruiters.",
    avatar: "JW"
  },
  {
    name: "Alex Thompson",
    role: "Data Scientist",
    company: "Spotify",
    content: "The Resume Builder’s auto-suggestions are incredibly context-aware for tech roles. It translated my academic work into industry-standard bullet points.",
    avatar: "AT"
  }
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Loved by developers worldwide</h2>
          <p className="mt-4 text-lg text-muted-foreground">Join thousands of engineers landing roles at top tech companies.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((test, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full bg-card/50 hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    {test.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold">{test.name}</h4>
                    <p className="text-sm text-muted-foreground">{test.role} at <span className="text-foreground font-medium">{test.company}</span></p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed italic">"{test.content}"</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}