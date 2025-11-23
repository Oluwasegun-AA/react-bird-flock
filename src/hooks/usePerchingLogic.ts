"use client";

import { useEffect, useRef, useState } from "react";
import type { BirdState } from "../types";

/**
 * Parameters for the usePerchingLogic hook.
 * @interface UsePerchingLogicParams
 * @property {BirdState[]} birds - Array of bird states to manage perching for
 * @property {boolean} hasActualMouse - Whether a physical mouse device is detected
 * @property {boolean} isMouseMoving - Whether the mouse is currently moving
 * @property {number} perchDelaySeconds - Seconds to wait before starting perch cycle
 */
interface UsePerchingLogicParams {
  birds: BirdState[];
  hasActualMouse: boolean;
  isMouseMoving: boolean;
  perchDelaySeconds: number;
}

/**
 * Return type for usePerchingLogic hook.
 * @interface UsePerchingLogicReturn
 * @property {BirdState[]} birds - Updated array of birds with perching modes applied
 */
interface UsePerchingLogicReturn {
  birds: BirdState[];
}

/**
 * Hook managing bird perching behavior with recruitment wave mechanics.
 * When mouse is idle with physical device, birds gradually transition to "perching" mode
 * in randomized batches, creating organic recruitment waves rather than instant flocking.
 *
 * @function usePerchingLogic
 * @param {UsePerchingLogicParams} params - Configuration for perching behavior
 * @returns {UsePerchingLogicReturn} Birds array with updated perching modes
 *
 * @example
 * ```ts
 * const { birds } = usePerchingLogic({
 *   birds: birdArray,
 *   hasActualMouse: true,
 *   isMouseMoving: false,
 *   perchDelaySeconds: 2
 * });
 * ```
 */
export const usePerchingLogic = ({
  birds: initialBirds,
  hasActualMouse,
  isMouseMoving,
  perchDelaySeconds,
}: UsePerchingLogicParams): UsePerchingLogicReturn => {
  const [birds, setBirds] = useState<BirdState[]>(initialBirds);

  const recruitmentTimeoutsRef = useRef<number[]>([]);
  const unrecruitedRef = useRef<number[]>([]);
  const perchCycleActiveRef = useRef(false);

  const clearRecruitmentTimers = () => {
    recruitmentTimeoutsRef.current.forEach((id) => clearTimeout(id));
    recruitmentTimeoutsRef.current = [];
  };

  const recruitNextBatch = () => {
    if (!perchCycleActiveRef.current) return;
    const remaining = unrecruitedRef.current.length;
    if (!remaining) return;

    const batchSize = remaining <= 3 ? remaining : 1 + Math.floor(Math.random() * Math.min(5, remaining - 1));

    const picked: number[] = [];
    for (let i = 0; i < batchSize; i++) {
      const idx = Math.floor(Math.random() * unrecruitedRef.current.length);
      picked.push(unrecruitedRef.current[idx]);
      unrecruitedRef.current.splice(idx, 1);
    }

    setBirds((prev) => prev.map((b, i) => (picked.includes(i) ? { ...b, mode: "perching" } : b)));

    if (unrecruitedRef.current.length) {
      const delayMs = 280 + Math.random() * 820;
      const id = window.setTimeout(recruitNextBatch, delayMs);
      recruitmentTimeoutsRef.current.push(id);
    }
  };

  const startPerchCycle = () => {
    if (perchCycleActiveRef.current) return;
    perchCycleActiveRef.current = true;
    unrecruitedRef.current = birds.map((_, i) => i);
    const id = window.setTimeout(recruitNextBatch, perchDelaySeconds * 1000);
    recruitmentTimeoutsRef.current.push(id);
  };

  useEffect(() => {
    const idle = hasActualMouse && !isMouseMoving;
    if (idle) {
      startPerchCycle();
    } else {
      perchCycleActiveRef.current = false;
      clearRecruitmentTimers();
      unrecruitedRef.current = [];
      setBirds((prev) => prev.map((b) => ({ ...b, mode: "free", isPerched: false })));
    }

    return () => {
      clearRecruitmentTimers();
    };
  }, [hasActualMouse, isMouseMoving]);

  return { birds };
};
