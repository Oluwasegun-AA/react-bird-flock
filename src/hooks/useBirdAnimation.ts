"use client";

import { useEffect, useRef, useState } from "react";
import type { BirdState } from "../types";

/**
 * Parameters for the useBirdAnimation hook.
 * @interface UseBirdAnimationParams
 * @property {BirdState[]} initialBirds - Initial array of bird states
 * @property {object} mousePosition - Current mouse cursor position
 * @property {number} mousePosition.x - Mouse X coordinate
 * @property {number} mousePosition.y - Mouse Y coordinate
 * @property {number} topSpeed - Maximum speed birds can travel
 * @property {number} clusterRadius - Radius for perching cluster formation
 * @property {number} clusterJitter - Randomness factor for perching positions
 * @property {Function} birdMode - Function determining current mode for each bird
 */
interface UseBirdAnimationParams {
  initialBirds: BirdState[];
  mousePosition: { x: number; y: number; };
  topSpeed: number;
  clusterRadius: number;
  clusterJitter: number;
  birdMode: (bird: BirdState) => "free" | "perching" | "perched";
}

/**
 * Hook managing bird animation physics using requestAnimationFrame.
 * Handles velocity calculations, target tracking, and perching mechanics.
 * Updates bird positions at 60fps with smooth interpolation and rotation.
 *
 * @function useBirdAnimation
 * @param {UseBirdAnimationParams} params - Animation configuration and state
 * @returns {BirdState[]} Updated array of bird states with new positions and rotations
 *
 * @example
 * ```ts
 * const animatedBirds = useBirdAnimation({
 *   initialBirds: birds,
 *   mousePosition: { x: 500, y: 300 },
 *   topSpeed: 4,
 *   clusterRadius: 85,
 *   clusterJitter: 22,
 *   birdMode: (bird) => bird.mode
 * });
 * ```
 */
export const useBirdAnimation = ({
  initialBirds,
  mousePosition,
  topSpeed,
  clusterRadius,
  clusterJitter,
  birdMode,
}: UseBirdAnimationParams): BirdState[] => {
  const [birds, setBirds] = useState<BirdState[]>(initialBirds);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      setBirds((prev) =>
        prev.map((bird) => {
          let { targetX, targetY, mode, isPerched } = bird;
          mode = birdMode(bird);

          if (mode === "free") {
            const dist = Math.hypot(bird.x - targetX, bird.y - targetY);
            if (dist < 60 || Math.random() < 0.02) {
              targetX = Math.random() * window.innerWidth;
              targetY = Math.random() * window.innerHeight;
            }
          } else {
            const desiredR =
              clusterRadius +
              (mode === "perching" ? Math.random() * clusterJitter : Math.random() * clusterJitter * 0.4);
            const distFromMouse = Math.hypot(bird.x - mousePosition.x, bird.y - mousePosition.y);
            const needNew =
              mode === "perching" ||
              distFromMouse > desiredR + 12 ||
              distFromMouse < desiredR - 12 ||
              Math.random() < 0.012;

            if (needNew) {
              const a = Math.random() * Math.PI * 2;
              targetX = mousePosition.x + Math.cos(a) * desiredR;
              targetY = mousePosition.y + Math.sin(a) * desiredR;
            }

            const distToTarget = Math.hypot(bird.x - targetX, bird.y - targetY);
            if (distToTarget < 22 && mode === "perching") {
              mode = "perched";
              isPerched = true;
            }
          }

          const dx = targetX - bird.x;
          const dy = targetY - bird.y;
          const distance = Math.hypot(dx, dy);
          const accel = 0.34;
          const friction = 0.94;
          const maxSpeed = mode === "perched" ? 0.7 : topSpeed;

          let vx = bird.velocityX;
          let vy = bird.velocityY;

          if (distance > 0) {
            vx += (dx / distance) * accel;
            vy += (dy / distance) * accel;
          }

          vx *= mode === "perched" ? friction * 0.9 : friction;
          vy *= mode === "perched" ? friction * 0.9 : friction;

          const spd = Math.hypot(vx, vy);
          if (spd > maxSpeed) {
            vx = (vx / spd) * maxSpeed;
            vy = (vy / spd) * maxSpeed;
          }

          const x = bird.x + vx;
          const y = bird.y + vy;
          const rotation = Math.atan2(vy, vx) * (180 / Math.PI);

          return {
            ...bird,
            x,
            y,
            targetX,
            targetY,
            velocityX: vx,
            velocityY: vy,
            rotation,
            mode,
            isPerched,
          };
        }),
      );
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition, topSpeed, clusterRadius, clusterJitter, birdMode]);

  return birds;
};
