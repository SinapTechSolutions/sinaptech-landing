import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import Solutions from "@/components/Solutions";
import Sinapse from "@/components/Sinapse";
import Products from "@/components/Products";
import ROICalculator from "@/components/ROICalculator";
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
        <Sinapse />
        <Products />
        <ROICalculator />
        <DNA />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}