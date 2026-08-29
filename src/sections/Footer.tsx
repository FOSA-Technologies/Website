import Logo from '../components/Logo'
import { Diamond } from '../components/SectionHeading'
import { FOOTER_COMPANY, FOOTER_RESOURCES, FOOTER_SOLUTIONS, SOCIAL_LINKS } from '../lib/content'

function SocialIcon({ label }: { label: string }) {
  const paths: Record<string, string> = {
    LinkedIn:
      'M4.98 3.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM.2 8h4.6v14.8H.2zM8.2 8h4.4v2h.06c.62-1.17 2.12-2.4 4.36-2.4 4.66 0 5.52 3.07 5.52 7.06V22.8h-4.6v-7.2c0-1.72-.03-3.93-2.4-3.93-2.4 0-2.77 1.87-2.77 3.8v7.33H8.2z',
    Facebook:
      'M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5h1.65V4.6c-.3-.04-1.3-.13-2.45-.13-2.4 0-4.05 1.47-4.05 4.17v2.26H7.5V14h2.7v8z',
    Instagram:
      'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z',
  }
  return (
    <svg viewBox="0 0 24 24" className="size-[17px]" fill="currentColor" aria-hidden="true" focusable="false">
      <path d={paths[label]} />
    </svg>
  )
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <nav aria-label={title}>
      <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
        <Diamond className="size-1.5 shrink-0 text-fosa-500" />
        {title}
      </h3>
      <ul className="mt-4 flex flex-col gap-3">{children}</ul>
    </nav>
  )
}

export default function Footer() {
  return (
    <footer className="bg-navy-900">
      {/* Liseré orange : signature de la marque */}
      <div className="h-px bg-gradient-to-r from-fosa-500/70 via-fosa-500/25 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-[1200px] px-5 pb-9 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Marque */}
          <div className="lg:col-span-5">
            <a href="#" aria-label="FOSA — retour en haut de page" className="inline-block">
              <Logo dark size="lg" />
            </a>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/55">
              Digitalisez. Simplifiez. Propulsez votre entreprise.
            </p>
            <ul className="mt-7 flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`FOSA sur ${social.label}`}
                    className="flex size-10 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-colors duration-200 hover:border-fosa-400/40 hover:text-fosa-400"
                  >
                    <SocialIcon label={social.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Liens */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <FooterColumn title="Solutions">
              {FOOTER_SOLUTIONS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[14.5px] text-white/55 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn title="Entreprise">
              {FOOTER_COMPANY.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[14.5px] text-white/55 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn title="Ressources">
              {FOOTER_RESOURCES.map((item) => (
                <li key={item.label}>
                  {'href' in item ? (
                    <a href={item.href} className="text-[14.5px] text-white/55 transition-colors hover:text-white">
                      {item.label}
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-[14.5px] text-white/40">
                      {item.label}
                      <span className="rounded-[4px] border border-fosa-400/30 px-1.5 py-[3px] text-[10px] font-semibold uppercase tracking-[0.08em] text-fosa-400">
                        Bientôt
                      </span>
                    </span>
                  )}
                </li>
              ))}
            </FooterColumn>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/[0.07] pt-7 sm:flex-row">
          <p className="text-[13.5px] text-white/40">© 2026 FOSA. Tous droits réservés.</p>
          <p className="text-[13.5px] text-white/40">
            Des outils digitaux pour les entreprises du monde entier.
          </p>
        </div>
      </div>
    </footer>
  )
}
