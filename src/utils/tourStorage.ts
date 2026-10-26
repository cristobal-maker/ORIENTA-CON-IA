/**
 * Utilities for tracking whether the user has completed or skipped the interactive tour.
 * Always safely verifies localStorage availability.
 */

import { isLocalStorageAvailable } from './recentPromptsStorage';

const TOUR_STORAGE_KEY = 'notebooklm_orientacion_tour_completed_v1';

/**
 * Returns true if the user has already completed or dismissed the onboarding tour.
 */
export function isTourCompleted(): boolean {
  if (!isLocalStorageAvailable()) return false;
  try {
    return window.localStorage.getItem(TOUR_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

/**
 * Marks the tour as completed or dismissed in localStorage.
 */
export function setTourCompleted(): void {
  if (!isLocalStorageAvailable()) return;
  try {
    window.localStorage.setItem(TOUR_STORAGE_KEY, 'true');
  } catch {
    // Graceful fallback if restricted
  }
}

/**
 * Resets the tour status so it can be re-run automatically or tested.
 */
export function resetTourStatus(): void {
  if (!isLocalStorageAvailable()) return;
  try {
    window.localStorage.removeItem(TOUR_STORAGE_KEY);
  } catch {
    // Graceful fallback if restricted
  }
}
