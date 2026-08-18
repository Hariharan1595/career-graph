import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { MatchTier } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function matchTier(pct: number): MatchTier {
  if (pct >= 80) return 'strong'
  if (pct >= 50) return 'medium'
  return 'low'
}

export function formatPercent(pct: number): string {
  return Number.isInteger(pct) ? `${pct}%` : `${pct.toFixed(2).replace(/\.?0+$/, '')}%`
}

export function slugifyJob(job: string): string {
  return encodeURIComponent(job.trim().toLowerCase())
}

export function unslugifyJob(param: string): string {
  return decodeURIComponent(param)
}
