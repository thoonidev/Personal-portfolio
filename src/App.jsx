import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Technologies from './components/Technologies';
import Explorations from './components/Explorations';
import Contact from './components/Contact';
import Footer from './components/Footer';
import useScrollReveal from './hooks/useScrollReveal';

export default function App() {
  useScrollReveal();

  return (
    <>
      <a className="skip-link" href="#main">Saltar al contenido</a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Technologies />
        <Projects />
        <Explorations />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
