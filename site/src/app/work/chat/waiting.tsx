'use client'
import * as React from 'react'
import { LazyMotion, Variants, domAnimation, m } from 'framer-motion'

export const Waiting = ({ className }: { className?: string }) => {
  const parent: Variants = {
    bounce: {
      transition: { staggerChildren: 0.1 },
    },
  }
  const dots: Variants = {
    bounce: {
      y: [0, -5, 0, 0],
      transition: {
        repeat: Infinity,
        bounce: 0.25,
        duration: 1,
        times: [0, 0.3, 0.7, 1],
      },
    },
  }
  return (
    <LazyMotion features={domAnimation}>
      <div className={`inline-block ${className ?? ''}`}>
        <m.div
          variants={parent}
          animate="bounce"
          className="flex flex-row items-center gap-1"
        >
          {[0, 1, 2].map((i) => (
            <m.div
              key={i}
              variants={dots}
              className="h-2 w-2 rounded-xl bg-gray-300 dark:bg-gray-700"
            />
          ))}
        </m.div>
      </div>
    </LazyMotion>
  )
}
