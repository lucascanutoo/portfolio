"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from "motion/react"

interface Position {
  /** The x coordinate of the lens */
  x: number
  /** The y coordinate of the lens */
  y: number
}

interface LensProps {
  /** The children of the lens */
  children: React.ReactNode
  /** The zoom factor of the lens */
  zoomFactor?: number
  /** The size of the lens */
  lensSize?: number
  /** The position of the lens */
  position?: Position
  /** The default position of the lens */
  defaultPosition?: Position
  /** Whether the lens is static */
  isStatic?: boolean
  /** The duration of the animation */
  duration?: number
  /** The color of the lens */
  lensColor?: string
  /** The aria label of the lens */
  ariaLabel?: string
}

export function Lens({
  children,
  zoomFactor = 1.3,
  lensSize = 170,
  isStatic = false,
  position = { x: 0, y: 0 },
  defaultPosition,
  duration = 0.1,
  lensColor = "black",
  ariaLabel = "Zoom Area",
}: LensProps) {
  if (zoomFactor < 1) {
    throw new Error("zoomFactor must be greater than 1")
  }
  if (lensSize < 0) {
    throw new Error("lensSize must be greater than 0")
  }

  const [isHovering, setIsHovering] = useState(false)
  const initialPosition = defaultPosition ?? position
  const mouseX = useMotionValue(initialPosition.x)
  const mouseY = useMotionValue(initialPosition.y)
  const frameRef = useRef<number | null>(null)
  const pendingPositionRef = useRef<Position | null>(null)

  useEffect(() => {
    if (isStatic) {
      mouseX.set(position.x)
      mouseY.set(position.y)
    } else if (defaultPosition && !isHovering) {
      mouseX.set(defaultPosition.x)
      mouseY.set(defaultPosition.y)
    }
  }, [defaultPosition, isHovering, isStatic, mouseX, mouseY, position])

  useEffect(() => () => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isStatic) return

    const rect = e.currentTarget.getBoundingClientRect()
    pendingPositionRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }

    if (frameRef.current !== null) return

    frameRef.current = requestAnimationFrame(() => {
      const nextPosition = pendingPositionRef.current
      if (nextPosition) {
        mouseX.set(nextPosition.x)
        mouseY.set(nextPosition.y)
      }
      frameRef.current = null
    })
  }, [isStatic, mouseX, mouseY])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") setIsHovering(false)
  }, [])

  const maskImage = useMotionTemplate`radial-gradient(circle ${
    lensSize / 2
  }px at ${mouseX}px ${mouseY}px, ${lensColor} 100%, transparent 100%)`
  const transformOrigin = useMotionTemplate`${mouseX}px ${mouseY}px`

  const LensContent = useMemo(() => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.58 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration }}
        className="absolute inset-0 overflow-hidden"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
          transformOrigin,
          zIndex: 50,
          willChange: "mask-image, opacity, transform",
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            transform: `scale(${zoomFactor})`,
            transformOrigin,
            willChange: "transform",
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    )
  }, [children, duration, maskImage, transformOrigin, zoomFactor])

  return (
    <div
      className="relative z-20 overflow-hidden"
      onMouseEnter={(e) => {
        setIsHovering(true)
        handleMouseMove(e)
      }}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {children}
      {isStatic || defaultPosition ? (
        LensContent
      ) : (
        <AnimatePresence mode="popLayout">
          {isHovering && LensContent}
        </AnimatePresence>
      )}
    </div>
  )
}
