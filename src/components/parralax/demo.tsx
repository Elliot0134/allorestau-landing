"use client"

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react"
import { useAnimationFrame } from "motion/react"

import { cn } from "@/lib/utils"
import { useMousePositionRef } from "@/hooks/use-mouse-position-ref"

interface FloatingContextType {
  registerElement: (id: string, element: HTMLDivElement, depth: number) => void
  unregisterElement: (id: string) => void
}

const FloatingContext = createContext<FloatingContextType | null>(null)

interface FloatingProps {
  children: ReactNode
  className?: string
  sensitivity?: number
  easingFactor?: number
}

const Floating = ({
  children,
  className,
  sensitivity = 1,
  easingFactor = 0.05,
  ...props
}: FloatingProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const elementsMap = useRef(
    new Map<
      string,
      {
        element: HTMLDivElement
        depth: number
        currentPosition: { x: number; y: number }
      }
    >()
  )
  const mousePositionRef = useMousePositionRef(containerRef)

  const registerElement = useCallback(
    (id: string, element: HTMLDivElement, depth: number) => {
      elementsMap.current.set(id, {
        element,
        depth,
        currentPosition: { x: 0, y: 0 },
      })
    },
    []
  )

  const unregisterElement = useCallback((id: string) => {
    elementsMap.current.delete(id)
  }, [])

  useAnimationFrame(() => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()

    // Check if container is visible in viewport
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Check if mouse is within container bounds (with some margin for better UX)
    const mouseInContainer =
      mousePositionRef.current.x >= -50 &&
      mousePositionRef.current.x <= rect.width + 50 &&
      mousePositionRef.current.y >= -50 &&
      mousePositionRef.current.y <= rect.height + 50

    elementsMap.current.forEach((data) => {
      // If container is not visible, reset to center position
      if (!isVisible) {
        const resetSpeed = 0.15 // Faster reset when scrolled away
        data.currentPosition.x += (0 - data.currentPosition.x) * resetSpeed
        data.currentPosition.y += (0 - data.currentPosition.y) * resetSpeed
        data.element.style.transform = `translate3d(${data.currentPosition.x}px, ${data.currentPosition.y}px, 0)`
        return
      }

      // If visible but mouse not in container, gently return to center
      if (!mouseInContainer) {
        const returnSpeed = 0.08 // Gentle return to center
        data.currentPosition.x += (0 - data.currentPosition.x) * returnSpeed
        data.currentPosition.y += (0 - data.currentPosition.y) * returnSpeed
        data.element.style.transform = `translate3d(${data.currentPosition.x}px, ${data.currentPosition.y}px, 0)`
        return
      }

      // Calculate distance from center in pixels
      const distanceX = mousePositionRef.current.x - centerX
      const distanceY = mousePositionRef.current.y - centerY

      // Apply depth and sensitivity
      const strength = (data.depth * sensitivity) / 20

      // Calculate new target position
      const newTargetX = distanceX * strength
      const newTargetY = distanceY * strength

      // Check if we need to update
      const dx = newTargetX - data.currentPosition.x
      const dy = newTargetY - data.currentPosition.y

      // Update position only if we're still moving
      data.currentPosition.x += dx * easingFactor
      data.currentPosition.y += dy * easingFactor

      // Apply transform with the parallax offset
      data.element.style.transform = `translate3d(${data.currentPosition.x}px, ${data.currentPosition.y}px, 0)`
    })
  })

  return (
    <FloatingContext.Provider value={{ registerElement, unregisterElement }}>
      <div
        ref={containerRef}
        className={cn("absolute top-0 left-0 w-full h-full", className)}
        {...props}
      >
        {children}
      </div>
    </FloatingContext.Provider>
  )
}

export default Floating

interface FloatingElementProps {
  children: ReactNode
  className?: string
  depth?: number
  style?: React.CSSProperties
}

export const FloatingElement = ({
  children,
  className,
  depth = 1,
  style,
}: FloatingElementProps) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(Math.random().toString(36).substring(7))
  const context = useContext(FloatingContext)

  useEffect(() => {
    if (!elementRef.current || !context) return

    const nonNullDepth = depth ?? 0.01
    const id = idRef.current

    context.registerElement(id, elementRef.current, nonNullDepth)
    return () => context.unregisterElement(id)
  }, [depth, context])

  return (
    <div
      ref={elementRef}
      className={cn("absolute will-change-transform", className)}
      style={style}
    >
      {children}
    </div>
  )
}
