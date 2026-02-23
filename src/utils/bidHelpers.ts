import { handleDirtyGame } from './helpers'
import type { Player } from '../types'

interface GameBidInfo {
  numCards: number
  dirty: boolean
}

/**
 * Calculate the adjusted bid value based on dirty game rules.
 * In dirty games, the total bids cannot equal the number of cards.
 * This function auto-corrects the bid if needed.
 */
export function calculateAdjustedBid(
  currentBid: number,
  bids: Record<string, number>,
  game: GameBidInfo | null | undefined,
  players: Record<string, Player>,
  increment: boolean = true
): number {
  if (!game) return currentBid

  const { numCards, dirty } = game
  let newBid = Number(currentBid)

  // Auto-correct bid if it violates dirty game rules
  while (dirty && !handleDirtyGame({ value: newBid, numCards, bids, players })) {
    newBid = increment ? newBid + 1 : newBid - 1
  }

  if (newBid < 0) return 0
  if (newBid > numCards) return numCards

  // Ensure bid is within valid range
  return newBid
}
