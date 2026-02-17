import { useContext, useEffect, useRef } from 'react'
import TimerContext from '../context/TimerContext'
import Timer from './Timer'

interface TurnChangeProps {
  timeLimit: number | null
  playerId: string
  currentPlayer: string
  winner: string | null
  randomPlay: () => Promise<void> | void
  yourTurn: () => Promise<void> | void
}

const TurnChange = ({
  timeLimit,
  playerId,
  currentPlayer,
  winner,
  randomPlay,
  yourTurn,
}: TurnChangeProps) => {
  const { setTimer, timer } = useContext(TimerContext)

  const prevCurrentPlayer = useRef<string | null>(null)

  useEffect(() => {
    if (timeLimit && currentPlayer) {
      if (currentPlayer !== prevCurrentPlayer.current) {
        setTimer(timeLimit)
      } else if (winner) {
        setTimer(timeLimit)
      }
      if (currentPlayer === playerId || winner === playerId) {
        yourTurn()
      }
    }
    prevCurrentPlayer.current = currentPlayer
  }, [currentPlayer, playerId, setTimer, timeLimit, winner, yourTurn])

  if (!timeLimit) return null

  return (
    <>
      {timer >= 0 && (
        <Timer
          timeLimit={timeLimit}
          playerId={playerId}
          currentPlayer={currentPlayer}
          randomPlay={randomPlay}
        />
      )}
    </>
  )
}

export default TurnChange
