// src/lib/providers.ts
import type { Provider, ProvidersData } from './types';
import rawData from '../data/providers.json';

const data = rawData as ProvidersData;

// Build-time guard: catch structural issues before they surface at runtime.
for (const p of data.providers) {
  if (!p.plans || p.plans.length === 0) {
    throw new Error(`[providers.ts] Provider "${p.name}" has no plans — plans must have at least one entry.`);
  }
}

export const lastUpdated: string = data.lastUpdated;
export const providers: Provider[] = data.providers;
