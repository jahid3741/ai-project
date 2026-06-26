import Features from "@/components/features";
import Hero from "@/components/hero";
import BlogPreview from "@/components/home/BlogPreview";
import Categories from "@/components/home/categories";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/home/Footer";
import Newsletter from "@/components/home/Newsletter";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Categories />
        <Statistics />
        <Testimonials />
        <BlogPreview />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
