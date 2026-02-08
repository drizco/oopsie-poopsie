import { jest } from '@jest/globals'
import { render } from '../helpers/render'
import TurnChange from '@/components/TurnChange'

describe('TurnChange Component', () => {
  const defaultProps = {
    timeLimit: 60,
    playerId: 'player-1',
    currentPlayer: 'player-2',
    winner: null,
    randomPlay: jest.fn(),
    yourTurn: jest.fn(),
  }

  test('renders without crashing when timer is >= 0', () => {
    const { container } = render(<TurnChange {...defaultProps} />, {
      contextValue: {
        timer: 30,
        setState: jest.fn(),
      },
    })

    // Component renders successfully (Timer returns null, so we just check it doesn't error)
    expect(container).toBeInTheDocument()
  })

  test('renders without crashing when timer is < 0', () => {
    const { container } = render(<TurnChange {...defaultProps} />, {
      contextValue: {
        timer: -1,
        setState: jest.fn(),
      },
    })

    // Component renders successfully (no timer shown)
    expect(container).toBeInTheDocument()
  })

  test('calls yourTurn when currentPlayer matches playerId', () => {
    const mockYourTurn = jest.fn()

    render(
      <TurnChange
        {...defaultProps}
        playerId="player-1"
        currentPlayer="player-1"
        yourTurn={mockYourTurn}
      />,
      {
        contextValue: {
          timer: 60,
          setState: jest.fn(),
        },
      }
    )

    expect(mockYourTurn).toHaveBeenCalled()
  })

  test('calls yourTurn when winner matches playerId', () => {
    const mockYourTurn = jest.fn()

    render(
      <TurnChange
        {...defaultProps}
        playerId="player-1"
        winner="player-1"
        yourTurn={mockYourTurn}
      />,
      {
        contextValue: {
          timer: 60,
          setState: jest.fn(),
        },
      }
    )

    expect(mockYourTurn).toHaveBeenCalled()
  })

  test('resets timer when currentPlayer changes', () => {
    const mockSetState = jest.fn()

    const { rerender } = render(
      <TurnChange {...defaultProps} currentPlayer="player-1" />,
      {
        contextValue: {
          timer: 30,
          setState: mockSetState,
        },
      }
    )

    // Change the current player
    rerender(
      <TurnChange {...defaultProps} currentPlayer="player-2" />,
      {
        contextValue: {
          timer: 30,
          setState: mockSetState,
        },
      }
    )

    // setState should be called to reset timer to timeLimit
    expect(mockSetState).toHaveBeenCalledWith({ timer: 60 })
  })

  test('resets timer when winner changes', () => {
    const mockSetState = jest.fn()

    const { rerender } = render(<TurnChange {...defaultProps} winner={null} />, {
      contextValue: {
        timer: 30,
        setState: mockSetState,
      },
    })

    // Set a winner
    rerender(<TurnChange {...defaultProps} winner="player-1" />, {
      contextValue: {
        timer: 30,
        setState: mockSetState,
      },
    })

    // setState should be called to reset timer
    expect(mockSetState).toHaveBeenCalledWith({ timer: 60 })
  })
})
