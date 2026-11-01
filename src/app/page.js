import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { About, Credentials, Faq, Process, Services, Statement } from "@/components/Sections";
import Quote from "@/components/Quote";
import Footer from "@/components/Footer";
import { RevealObserver } from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Statement />
        <Services />
        <Process />
        <About />
        <Credentials />
        <Faq />
        <Quote />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
