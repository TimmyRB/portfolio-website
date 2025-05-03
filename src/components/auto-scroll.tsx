"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Add CSS to hide scrollbars
const hideScrollbarStyles = `
  /* Hide scrollbar for Chrome, Safari and Opera */
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  .hide-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

export default function AutoScroll({
  children,
  speed = 0.5,
  direction = "vertical",
  pauseTime = 1000, // Pause time in milliseconds
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  direction?: "vertical" | "horizontal";
  pauseTime?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef(1); // 1 for forward, -1 for backward
  const scrollPosRef = useRef(0);
  const isPausedRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only reset on direction prop change, not internal scroll direction
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let previousMaxScroll = 0;

    const scroll = () => {
      if (!container) return;

      const isVertical = direction === "vertical";
      const maxScroll = isVertical
        ? container.scrollHeight - container.clientHeight
        : container.scrollWidth - container.clientWidth;

      // If max scroll changed significantly, adjust position to avoid getting stuck
      if (Math.abs(maxScroll - previousMaxScroll) > 5) {
        scrollPosRef.current = Math.min(scrollPosRef.current, maxScroll);
        previousMaxScroll = maxScroll;
      }

      if (maxScroll <= 0) {
        // No scrolling needed if content fits
        animationFrameId = requestAnimationFrame(scroll);
        return;
      }

      if (!isPausedRef.current) {
        // Update position based on direction and speed
        scrollPosRef.current += directionRef.current * speed * 0.5;

        // Add small buffer (1px) to avoid floating point precision issues
        const atEnd = scrollPosRef.current >= maxScroll - 1;
        const atStart = scrollPosRef.current <= 1;

        // Check boundaries and pause before changing direction
        if (atEnd && directionRef.current > 0) {
          scrollPosRef.current = maxScroll; // Ensure we're exactly at max
          isPausedRef.current = true;

          // Clear any existing timer
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }

          timerRef.current = setTimeout(() => {
            directionRef.current = -1;
            isPausedRef.current = false;
            timerRef.current = null;
          }, pauseTime);
        } else if (atStart && directionRef.current < 0) {
          scrollPosRef.current = 0; // Ensure we're exactly at 0
          isPausedRef.current = true;

          // Clear any existing timer
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }

          timerRef.current = setTimeout(() => {
            directionRef.current = 1;
            isPausedRef.current = false;
            timerRef.current = null;
          }, pauseTime);
        }

        // Clamp scroll position to valid range
        scrollPosRef.current = Math.max(
          0,
          Math.min(scrollPosRef.current, maxScroll)
        );

        // Apply scroll position
        if (isVertical) {
          container.scrollTop = scrollPosRef.current;
        } else {
          container.scrollLeft = scrollPosRef.current;
        }
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    // Start animation on next frame
    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [direction, speed, pauseTime]); // Remove scrollDirection from dependencies

  return (
    <>
      <style jsx>{hideScrollbarStyles}</style>
      <div
        ref={containerRef}
        className={cn(
          "hide-scrollbar",
          {
            "overflow-y-auto": direction === "vertical",
            "overflow-x-auto": direction === "horizontal",
            "h-full": direction === "vertical",
            "w-full": direction === "horizontal",
          },
          className
        )}
      >
        {children}
      </div>
    </>
  );
}
