import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Problem from './sections/Problem'
import Solutions from './sections/Solutions'
import Industries from './sections/Industries'
import ProductShowcase from './sections/ProductShowcase'
import Features from './sections/Features'
import BrandStatement from './sections/BrandStatement'
import FinalCta from './sections/FinalCta'
import Footer from './sections/Footer'

export default function App() {
  return (
    <>
      <a href="#contenu" className="skip-link">
        Aller au contenu principal
      </a>
      <Navbar />
      <main id="contenu">
        <Hero />
        <Problem />
        <Solutions />
        <Industries />
        <ProductShowcase />
        <Features />
        <BrandStatement />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
