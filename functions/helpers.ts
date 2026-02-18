import type { Suit, Card } from './types.js'

/**
 * Determines which card is winning the trick
 */
export const calculateLeader = ({
  cards,
  trump,
  leadSuit,
}: {
  cards: Card[]
  trump: Suit
  leadSuit: Suit
}): Card =>
  cards.sort((a, b) => {
    // Trump beats non-trump
    if (a.suit === trump && b.suit !== trump) {
      return -1
    }
    if (b.suit === trump && a.suit !== trump) {
      return 1
    }
    // Lead suit beats non-lead (if not trump)
    if (a.suit === leadSuit && b.suit !== leadSuit) {
      return -1
    }
    if (b.suit === leadSuit && a.suit !== leadSuit) {
      return 1
    }
    // Higher rank wins
    return b.rank - a.rank
  })[0]

/**
 * Checks if a card is legal to play given the current hand and lead suit
 */
export const isLegal = ({
  hand,
  card,
  leadSuit,
}: {
  hand: Card[]
  card: Card
  leadSuit: Suit | null
}): boolean => {
  if (!leadSuit) return true
  const hasSuit = hand.some((c) => c.suit === leadSuit)
  if (hasSuit) {
    return card.suit === leadSuit
  }
  return true
}

/**
 * Calculates the score for a single player for a round
 */
export const calculateScore = (
  bid: number,
  won: number,
  noBidPoints: boolean
): number => {
  let score = 0
  if (bid === won) {
    score += 10
    score += won
  } else if (!noBidPoints) {
    score += won
  }
  return score
}

/**
 * Gets the next player index in the rotation
 */
export const getNextPlayerIndex = (
  currentPlayerIndex: number,
  numPlayers: number
): number => {
  return (currentPlayerIndex + 1) % numPlayers
}
