'use client'

/**
 * CountUp Animation Component
 * 
 * Source: reactbits MCP (count-up)
 * Use: Animating financial numbers, KPIs, portfolio values
 * 
 * UX Decision: Animated numbers draw attention and create engagement.
 * For financial dashboards, this provides visual feedback that data is live.
 */

import { useInView, useMotionValue, useSpring } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'

interface CountUpProps {
  /** Target value to count to */
  to: number
  /** Starting value (default: 0) */
  from?: number
  /** Animation direction */
  direction?: 'up' | 'down'
  /** Delay before animation starts (seconds) */
  delay?: number
  /** Animation duration (seconds) */
  duration?: number
  /** Additional CSS classes */
  className?: string
  /** Start animation condition */
  startWhen?: boolean
  /** Thousand separator (e.g., ',') */
  separator?: string
  /** Prefix (e.g., '$') */
  prefix?: string
  /** Suffix (e.g., '%') */
  suffix?: string
  /** Callback when animation starts */
  onStart?: () => void
  /** Callback when animation ends */
  onEnd?: () => void
}

export function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = ',',
  prefix = '',
  suffix = '',
  onStart,
  onEnd
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === 'down' ? to : from)

  const damping = 20 + 40 * (1 / duration)
  const stiffness = 100 * (1 / duration)

  const springValue = useSpring(motionValue, {
    damping,
    stiffness
  })

  const isInView = useInView(ref, { once: true, margin: '0px' })

  const getDecimalPlaces = (num: number): number => {
    const str = num.toString()
    if (str.includes('.')) {
      const decimals = str.split('.')[1]
      if (parseInt(decimals) !== 0) {
        return decimals.length
      }
    }
    return 0
  }

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to))

  const formatValue = useCallback(
    (latest: number) => {
      const hasDecimals = maxDecimals > 0

      const options: Intl.NumberFormatOptions = {
        useGrouping: !!separator,
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0
      }

      const formattedNumber = Intl.NumberFormat('en-US', options).format(latest)
      const withSeparator = separator ? formattedNumber.replace(/,/g, separator) : formattedNumber

      return `${prefix}${withSeparator}${suffix}`
    },
    [maxDecimals, separator, prefix, suffix]
  )

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(direction === 'down' ? to : from)
    }
  }, [from, to, direction, formatValue])

  useEffect(() => {
    if (isInView && startWhen) {
      if (typeof onStart === 'function') {
        onStart()
      }

      const timeoutId = setTimeout(() => {
        motionValue.set(direction === 'down' ? from : to)
      }, delay * 1000)

      const durationTimeoutId = setTimeout(
        () => {
          if (typeof onEnd === 'function') {
            onEnd()
          }
        },
        delay * 1000 + duration * 1000
      )

      return () => {
        clearTimeout(timeoutId)
        clearTimeout(durationTimeoutId)
      }
    }
  }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest: number) => {
      if (ref.current) {
        ref.current.textContent = formatValue(latest)
      }
    })

    return () => unsubscribe()
  }, [springValue, formatValue])

  return <span className={className} ref={ref} />
}
