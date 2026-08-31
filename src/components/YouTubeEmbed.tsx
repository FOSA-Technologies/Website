import { useState } from 'react'
import { YOUTUBE_VIDEO_URL, getYouTubeId, getYouTubeThumbnail } from '../lib/video'

function PlayGlyph() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="size-6 translate-x-[2px] text-navy-900"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6.5 4.2 16 10l-9.5 5.8z" />
    </svg>
  )
}

/** Cadre biseauté + losanges, dans le langage géométrique FOSA. */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div
        className="cut-corner-br absolute -bottom-4 -right-4 left-6 top-6 border border-fosa-400/20 bg-navy-800/50 sm:-right-6"
        aria-hidden="true"
      />
      <div
        className="cut-corner-sm absolute -left-3 -top-3 z-0 size-20 border-2 border-fosa-500/30 sm:-left-5 sm:size-28"
        aria-hidden="true"
      />
      <div className="absolute -bottom-2.5 left-10 size-2 rotate-45 bg-fosa-500" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

/**
 * Vidéo YouTube à chargement différé : seule la miniature est téléchargée ;
 * l'iframe (youtube-nocookie) n'est créée qu'au clic. Si aucune vidéo n'est
 * configurée, un visuel d'attente élégant prend sa place.
 */
export default function YouTubeEmbed() {
  const videoId = getYouTubeId(YOUTUBE_VIDEO_URL)
  const [playing, setPlaying] = useState(false)

  /* ——— Visuel d'attente (URL pas encore configurée) ——— */
  if (!videoId) {
    return (
      <Frame>
        <div className="cut-corner relative flex aspect-video w-full flex-col items-center justify-center gap-5 overflow-hidden bg-navy-800 px-8 text-center">
          <div
            className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(70%_70%_at_50%_40%,black,transparent)]"
            aria-hidden="true"
          />
          <div
            className="absolute -right-10 -top-10 size-32 rotate-45 border border-white/[0.06]"
            aria-hidden="true"
          />
          <span
            className="relative flex size-16 items-center justify-center rounded-full border border-fosa-400/40 bg-fosa-500/10"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 20 20"
              className="size-6 translate-x-[2px] text-fosa-400"
              fill="currentColor"
              focusable="false"
            >
              <path d="M6.5 4.2 16 10l-9.5 5.8z" />
            </svg>
          </span>
          <p className="relative max-w-sm text-[15.5px] font-semibold text-white">
            Notre vidéo de présentation arrive bientôt.
          </p>
          <p className="relative -mt-2 text-[13px] text-white/50">
            Découvrez la plateforme FOSA en images d’ici peu.
          </p>
        </div>
      </Frame>
    )
  }

  /* ——— Lecture en cours : iframe minimale (autoplay déclenché par l'utilisateur) ——— */
  if (playing) {
    return (
      <Frame>
        <div className="cut-corner aspect-video w-full overflow-hidden bg-navy-900">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title="Vidéo de présentation FOSA"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      </Frame>
    )
  }

  /* ——— Facade : miniature + bouton play, l'iframe ne charge qu'au clic ——— */
  return (
    <Frame>
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label="Lancer la vidéo de présentation FOSA"
        className="group relative block aspect-video w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fosa-400"
      >
        <img
          src={getYouTubeThumbnail(videoId)}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span
          className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/10 to-transparent"
          aria-hidden="true"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span
            className="flex size-16 items-center justify-center rounded-full bg-fosa-500 shadow-[0_16px_40px_-12px_rgb(0_0_0/0.6)] transition-transform duration-200 group-hover:scale-110"
            aria-hidden="true"
          >
            <PlayGlyph />
          </span>
        </span>
        <span className="absolute bottom-4 left-5 text-left">
          <span className="block text-[13px] font-bold uppercase tracking-[0.14em] text-fosa-400">
            La plateforme en vidéo
          </span>
          <span className="mt-0.5 block text-[14.5px] font-semibold text-white">
            Regarder la présentation
          </span>
        </span>
      </button>
    </Frame>
  )
}
