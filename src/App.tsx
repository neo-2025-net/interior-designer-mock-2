import { LangProvider } from './context/LangContext';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <LangProvider>
      <div className="relative min-h-screen bg-cream text-charcoal overflow-x-hidden">
        <CustomCursor />
        <Navbar />
        <main>
          <Hero />
          <Portfolio />
          <About />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
}

export default App;
