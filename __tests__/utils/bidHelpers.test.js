import { calculateAdjustedBid } from '@/utils/bidHelpers'

describe('bidHelpers', () => {
  describe('calculateAdjustedBid', () => {
    test('returns current bid when game is null', () => {
      const result = calculateAdjustedBid(3, {}, null, {})
      expect(result).toBe(3)
    })

    test('returns current bid when game is undefined', () => {
      const result = calculateAdjustedBid(5, {}, undefined, {})
      expect(result).toBe(5)
    })

    test('returns current bid in non-dirty games', () => {
      const game = { numCards: 5, dirty: false }
      const bids = { 'player-1': 2, 'player-2': 1 }
      const players = { 'player-1': {}, 'player-2': {}, 'player-3': {} }

      const result = calculateAdjustedBid(2, bids, game, players)
      expect(result).toBe(2)
    })

    test('adjusts bid upward when dirty game rule is violated', () => {
      // 3 players, 3 cards, current bids: 1 + 1 = 2, trying to bid 1 (total would be 3 - illegal)
      const game = { numCards: 3, dirty: true }
      const bids = { 'player-1': 1, 'player-2': 1 }
      const players = { 'player-1': {}, 'player-2': {}, 'player-3': {} }

      const result = calculateAdjustedBid(1, bids, game, players, true)

      // Should auto-increment to 2 to avoid total of 3
      expect(result).toBe(2)
    })

    test('adjusts bid downward when increment is false', () => {
      // 3 players, 3 cards, current bids: 1 + 1 = 2, trying to bid 1 (total would be 3 - illegal)
      const game = { numCards: 3, dirty: true }
      const bids = { 'player-1': 1, 'player-2': 1 }
      const players = { 'player-1': {}, 'player-2': {}, 'player-3': {} }

      const result = calculateAdjustedBid(1, bids, game, players, false)

      // Should auto-decrement to 0 to avoid total of 3
      expect(result).toBe(0)
    })

    test('ensures bid is within valid range (0 to numCards)', () => {
      const game = { numCards: 5, dirty: false }
      const bids = {}
      const players = { 'player-1': {} }

      // Test upper bound
      const result1 = calculateAdjustedBid(6, bids, game, players)
      expect(result1).toBe(5) // Returns numCards if out of range after adjustment

      // Test lower bound
      const result2 = calculateAdjustedBid(-1, bids, game, players)
      expect(result2).toBe(0) // Returns 0 if out of range after adjustment
    })

    test('handles string bid values by converting to number', () => {
      const game = { numCards: 5, dirty: false }
      const bids = {}
      const players = { 'player-1': {} }

      const result = calculateAdjustedBid('3', bids, game, players)
      expect(result).toBe(3)
    })

    test('allows valid bids in dirty games', () => {
      // 3 players, 3 cards, current bids: 1 + 1 = 2, bidding 0 is legal (total = 2, not 3)
      const game = { numCards: 3, dirty: true }
      const bids = { 'player-1': 1, 'player-2': 1 }
      const players = { 'player-1': {}, 'player-2': {}, 'player-3': {} }

      const result = calculateAdjustedBid(0, bids, game, players)
      expect(result).toBe(0)
    })

    test('handles edge case with no existing bids', () => {
      const game = { numCards: 5, dirty: true }
      const bids = {}
      const players = { 'player-1': {}, 'player-2': {} }

      const result = calculateAdjustedBid(3, bids, game, players)
      expect(result).toBe(3)
    })

    test('handles single player scenario', () => {
      const game = { numCards: 3, dirty: true }
      const bids = {}
      const players = { 'player-1': {} }

      // With one player and dirty game, bid of 3 would be illegal (equals numCards)
      const result = calculateAdjustedBid(3, bids, game, players, false)
      expect(result).toBe(2) // Should decrement to 2
    })
  })
})
