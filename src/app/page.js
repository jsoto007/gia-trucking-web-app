
import Hero from "../app/home/Hero"
import About from "./about/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
