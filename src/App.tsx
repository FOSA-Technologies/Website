import { useT } from './i18n/LanguageContext'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import TrustMarquee from './sections/TrustMarquee'
import Problem from './sections/Problem'
import Solutions from './sections/Solutions'
import Industries from './sections/Industries'
import ProductsSection from './sections/ProductsSection'
import ProductShowcase from './sections/ProductShowcase'
import Features from './sections/Features'
import AIQuoteSection from './sections/AIQuoteSection'
import TestimonialsSection from './sections/TestimonialsSection'
import BrandStatement from './sections/BrandStatement'
import BookingSection from './sections/BookingSection'
import NewsletterSection from './sections/NewsletterSection'
import FinalCta from './sections/FinalCta'
import Footer from './sections/Footer'

export default function App() {
  const t = useT()
  return (
    <>
      <a href="#contenu" className="skip-link">
        {t.common.skipLink}
      </a>
      <Navbar />
      <main id="contenu">
        {/* Confiance → Découverte → Solutions → Produits → Devis → Témoignages → Rendez-vous */}
        <Hero />
        <TrustMarquee />
        <Problem />
        <Solutions />
        <Industries />
        <ProductsSection />
        <ProductShowcase />
        <Features />
        <AIQuoteSection />
        <TestimonialsSection />
        <BrandStatement />
        <BookingSection />
        <NewsletterSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
