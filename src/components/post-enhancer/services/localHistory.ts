import type { EnhancePostResponse } from "../types";

export interface LocalEnhancementRecord {
  id: string;
  original_post: string;
  enhanced_platforms: EnhancePostResponse["platforms"];
  category: string;
  style_tone: string;
  virality_score: number | null;
  insights: string[];
  view_reasons: string[];
  quick_wins: string[];
  created_at: string;
}

const STORAGE_PREFIX = "postpro-ai:enhancements:";

const getStorageKey = (userId?: string) => `${STORAGE_PREFIX}${userId ?? "guest"}`;

const isBrowser = typeof window !== "undefined";

export const saveEnhancementLocally = (userId: string | undefined, record: LocalEnhancementRecord) => {
  if (!isBrowser) return;
  try {
    const key = getStorageKey(userId);
    const existingRaw = window.localStorage.getItem(key);
    const existing: LocalEnhancementRecord[] = existingRaw ? JSON.parse(existingRaw) : [];
    const updated = [record, ...existing].slice(0, 50);
    window.localStorage.setItem(key, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to persist enhancement locally", error);
  }
};

export const loadEnhancementsLocally = (userId: string | undefined): LocalEnhancementRecord[] => {
  if (!isBrowser) return [];
  try {
    const key = getStorageKey(userId);
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed: LocalEnhancementRecord[] = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to read local enhancements", error);
    return [];
  }
};
