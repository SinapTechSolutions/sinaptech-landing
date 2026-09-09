import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Solutions from "@/components/Solutions";
import Sinapse from "@/components/Sinapse";
import Products from "@/components/Products";
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
        <Solutions />
        <Sinapse />
        <Products />
        <DNA />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}