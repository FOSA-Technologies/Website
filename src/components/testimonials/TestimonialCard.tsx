import type { Testimonial } from '../../data/testimonials'

/** Initiales du client, affichées quand aucune photo n'est fournie. */
function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

function Avatar({ testimonial }: { testimonial: Testimonial }) {
  if (testimonial.avatar) {
    return (
      <img
        src={testimonial.avatar}
        alt=""
        loading="lazy"
        width={44}
        height={44}
        className="size-11 rounded-[10px] object-cover"
      />
    )
  }
  return (
    <span className="relative flex size-11 shrink-0 items-center justify-center rounded-[10px] bg-navy-900 text-[13px] font-bold text-white">
      {initials(testimonial.name)}
      <span className="absolute -right-0.5 -top-0.5 size-2 rotate-45 bg-fosa-500" aria-hidden="true" />
    </span>
  )
}

/** Citation client : sobre, avec la marque géométrique FOSA. */
export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-xl border border-line bg-white p-7 transition-all duration-300 hover:border-fosa-300 hover:shadow-card">
      <svg
        viewBox="0 0 24 24"
        className="size-7 text-fosa-500/25"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M5.5 6.5h5.5v6.5H7.2c-.1 2.3 1.5 4 3.6 4.4v2.1c-3.6-.5-6.3-3.2-6.3-6.9zM13 6.5h5.5V13h-3.8c-.1 2.3 1.5 4 3.6 4.4v2.1c-3.6-.5-6.3-3.2-6.3-6.9z" />
      </svg>
      <blockquote className="mt-3 text-[15px] leading-relaxed text-navy-900/85">
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3.5 border-t border-line/70 pt-5">
        <Avatar testimonial={testimonial} />
        <div className="min-w-0">
          <p className="truncate text-[14.5px] font-semibold text-navy-900">{testimonial.name}</p>
          <p className="truncate text-[13px] text-ink">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
      </figcaption>
    </figure>
  )
}
