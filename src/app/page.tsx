import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Solutions from "@/components/Solutions";
import Sinapse from "@/components/Sinapse";
import DNA from "@/components/DNA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Solutions />
        <Sinapse />
        <DNA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
