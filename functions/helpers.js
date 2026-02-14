/**
 * Server-side game logic helpers
 * Copied from src/utils/helpers.js to ensure consistent game logic
 */

/**
 * Determines which card is winning the trick
 * @param {Array} cards - Array of card objects with suit, rank, playerId
 * @param {string} trump - Trump suit (C, H, S, D)
 * @param {string} leadSuit - Lead suit for this trick
 * @returns {Object} The winning card
 */
export const calculateLeader = ({ cards, trump, leadSuit }) =>
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
 * @param {Array} hand - Player's current hand
 * @param {Object} card - Card being played
 * @param {string} leadSuit - Lead suit for this trick (null if first card)
 * @returns {boolean} True if the card can be legally played
 */
export const isLegal = ({ hand, card, leadSuit }) => {
  if (!leadSuit) return true
  const hasSuit = hand.some((c) => c.suit === leadSuit)
  if (hasSuit) {
    return card.suit === leadSuit
  }
  return true
}
