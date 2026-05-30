import { useRef, useEffect, useCallback } from 'react'
import anime from 'animejs'

/**
 * A reusable hook that wraps anime.js for React.
 * Returns a ref to attach to a DOM element and helper functions.
 */
export function useAnime() {
  const ref = useRef<HTMLDivElement>(null)
  const animationsRef = useRef<anime.AnimeInstance[]>([])

  // Clean up all running animations on unmount
  useEffect(() => {
    return () => {
      animationsRef.current.forEach((anim) => {
        anim.pause()
      })
      animationsRef.current = []
    }
  }, [])

  const animate = useCallback(
    (params: anime.AnimeParams): anime.AnimeInstance => {
      const instance = anime(params)
      animationsRef.current.push(instance)
      return instance
    },
    []
  )

  const timeline = useCallback(
    (params?: anime.AnimeParams): anime.AnimeTimelineInstance => {
      const tl = anime.timeline(params)
      animationsRef.current.push(tl as unknown as anime.AnimeInstance)
      return tl
    },
    []
  )

  return { ref, animate, timeline }
}

/**
 * Run an anime.js animation on mount with auto-cleanup.
 */
export function useAnimeOnMount(
  getParams: () => anime.AnimeParams,
  deps: unknown[] = []
) {
  useEffect(() => {
    const instance = anime(getParams())
    return () => {
      instance.pause()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
