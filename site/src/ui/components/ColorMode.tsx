'use client'
import { useTheme } from '../theme-context'
import { LazyMotion, Variants, domAnimation, m } from 'framer-motion'

export const ColorMode = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme()

  if (!theme) {
    return null
  }

  const icon = theme === 'light' ? 'sun' : 'moon'

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className={className}
    >
      <SunMoon state={icon} />
    </button>
  )
}

const SunMoon = ({ state }: { state: 'sun' | 'moon' }) => {
  const sunRaysParent: Variants = {
    sun: {
      transition: { staggerChildren: 0.05 },
    },
    moon: {
      transition: { staggerChildren: 0 },
    },
  }
  const sunRay: Variants = {
    sun: {
      pathLength: [0, 1],
      strokeLinecap: 'round',
    },
    moon: {
      pathLength: [0.65, 0],
      strokeLinecap: 'butt',
    },
    pressed: (isSun: boolean) => ({
      pathLength: isSun ? 0.65 : 0,
      strokeLinecap: isSun ? 'round' : 'butt',
    }),
  }
  const mainCircle: Variants = {
    sun: {
      r: 5,
    },
    moon: {
      r: 7,
    },
  }
  const maskCircle: Variants = {
    sun: { cx: 32, cy: 11, r: 9 },
    moon: { cx: 10, cy: 11, r: 9, transition: { type: 'spring', bounce: 0.4 } },
    pressed: (isSun: boolean) => ({ r: isSun ? 9 : 7 }),
  }
  return (
    <LazyMotion features={domAnimation}>
      <m.svg
        width="24"
        height="24"
        viewBox="0 0 32 32"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        animate={state}
        initial={false}
        className="focus:outline-none"
        whileTap="pressed"
      >
        <mask id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <m.circle
            initial={false}
            variants={maskCircle}
            cx="10"
            cy="11"
            r="9"
            fill="black"
          />
        </mask>
        <m.g initial={false} variants={sunRaysParent}>
          <m.path
            initial={false}
            custom={state === 'sun'}
            variants={sunRay}
            d="M16 7V5V3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <m.path
            initial={false}
            custom={state === 'sun'}
            variants={sunRay}
            d="M22.364 9.63605L23.7782 8.22183L25.1924 6.80762"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <m.path
            initial={false}
            custom={state === 'sun'}
            variants={sunRay}
            d="M25 16H27H29"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <m.path
            initial={false}
            custom={state === 'sun'}
            variants={sunRay}
            d="M22.364 22.364L23.7782 23.7782L25.1924 25.1924"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <m.path
            initial={false}
            custom={state === 'sun'}
            variants={sunRay}
            d="M16 25V27V29"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <m.path
            initial={false}
            custom={state === 'sun'}
            variants={sunRay}
            d="M9.63605 22.364L8.22183 23.7782L6.80762 25.1924"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <m.path
            initial={false}
            custom={state === 'sun'}
            variants={sunRay}
            d="M7 16H5H3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <m.path
            initial={false}
            custom={state === 'sun'}
            variants={sunRay}
            style={{ pathOffset: 1 }}
            d="M9.63604 9.63604L8.22183 8.22183L6.80762 6.80762"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </m.g>
        <m.circle
          initial={false}
          variants={mainCircle}
          cx="16"
          cy="16"
          stroke="currentColor"
          strokeWidth="2"
          fill="currentColor"
          mask="url(#moon-mask)"
        />
      </m.svg>
    </LazyMotion>
  )
}
