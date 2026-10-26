export interface RecentPromptItem {
  id: string;
  timestamp: number;
  roleId: string;
  roleTitle: string;
  stage: string;
  outputFormat: string;
  tone: string;
  specificFocus: string;
  promptText: string;
}

const STORAGE_KEY = 'notebooklm_orientacion_recent_prompts_v1';
const MAX_HISTORY = 3;

/**
 * Safely checks if window.localStorage is accessible and working in the current environment
 */
export function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const testKey = '__test_ls_notebooklm__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Retrieves the recent prompt history (at most 3 items), falling back gracefully if localStorage is unavailable
 */
export function getRecentPrompts(): RecentPromptItem[] {
  if (!isLocalStorageAvailable()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.slice(0, MAX_HISTORY);
    }
    return [];
  } catch {
    return [];
  }
}

/**
 * Saves a generated prompt to the recent history, keeping at most the 3 most recent entries
 */
export function saveRecentPrompt(item: Omit<RecentPromptItem, 'id' | 'timestamp'>): RecentPromptItem[] {
  if (!isLocalStorageAvailable()) return [];
  try {
    const existing = getRecentPrompts();
    // Prevent duplicate consecutive entries with identical promptText
    const filtered = existing.filter((p) => p.promptText.trim() !== item.promptText.trim());

    const newItem: RecentPromptItem = {
      ...item,
      id: `prompt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
    };

    const updated = [newItem, ...filtered].slice(0, MAX_HISTORY);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

/**
 * Clears recent prompts history safely
 */
export function clearRecentPrompts(): void {
  if (!isLocalStorageAvailable()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
