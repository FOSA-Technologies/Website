import { useEffect, useState } from 'react'
import Logo from './Logo'
import Button from './Button'
import { Diamond } from './SectionHeading'
import { CONTACT_MAILTO, NAV_LINKS } from '../lib/content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Fermeture du menu mobile : Échap + verrouillage du scroll. */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-line bg-white/90 shadow-[0_1px_0_rgb(11_20_36/0.03)] backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex h-[76px] max-w-[1200px] items-center justify-between px-5 sm:px-6 lg:px-8"
        aria-label="Navigation principale"
      >
        <a href="#" aria-label="FOSA — retour en haut de page" className="shrink-0">
          <Logo />
        </a>

        {/* Navigation desktop */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-[14.5px] font-medium text-[#42506a] transition-colors hover:text-navy-900"
              >
                <Diamond className="absolute -left-[18px] top-1/2 size-1.5 -translate-y-1/2 text-fosa-500 opacity-0 transition-opacity group-hover:opacity-100" />
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button href={CONTACT_MAILTO} variant="secondary" size="md">
            Nous contacter
          </Button>
        </div>

        {/* Burger mobile */}
        <button
          type="button"
          className="relative flex size-11 items-center justify-center rounded-lg lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`absolute h-[2px] w-5 rounded-full bg-navy-900 transition-transform duration-300 ${
              open ? 'rotate-45' : '-translate-y-[3.5px]'
            }`}
          />
          <span
            className={`absolute h-[2px] w-5 rounded-full bg-navy-900 transition-transform duration-300 ${
              open ? '-rotate-45' : 'translate-y-[3.5px]'
            }`}
          />
        </button>
      </nav>

      {/* Panneau mobile */}
      {open ? (
        <div
          id="menu-mobile"
          className="border-t border-line bg-white px-5 pb-8 pt-4 shadow-[0_24px_48px_-24px_rgb(11_20_36/0.25)] lg:hidden"
        >
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 border-b border-line/70 py-4 text-[16px] font-medium text-navy-900"
                >
                  <Diamond className="size-1.5 text-fosa-500" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href={CONTACT_MAILTO} variant="primary" size="lg" className="mt-6 w-full">
            Nous contacter
          </Button>
        </div>
      ) : null}
    </header>
  )
}
