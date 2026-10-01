import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import Solutions from "@/components/Solutions";
import Products from "@/components/Products";
import Sinapse from "@/components/Sinapse";
import ROICalculator from "@/components/ROICalculator";
import Diagnostic from "@/components/Diagnostic";
import Testimonials from "@/components/Testimonials";
import DNA from "@/components/DNA";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <TrustBadges />
        <Solutions />
        <Products />
        <Sinapse />
        <ROICalculator />
        <Diagnostic />
        <Testimonials />
        <DNA />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
