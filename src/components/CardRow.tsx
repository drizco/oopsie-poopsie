import React, { useContext, useState, useEffect } from 'react'

import styles from '../styles/components/card-row.module.scss'
import { getSuitSymbol, getColor, isLegal } from '../utils/helpers'
import SettingsContext from '../context/SettingsContext'
import classNames from 'classnames'
import type { Card, Suit } from '../types'

interface CardRowProps {
  cards: Card[]
  playCard: (card: Card) => void
  queuedCard: Card | null
  leadSuit: Suit | null
}

const CardRow = ({ cards, playCard, queuedCard, leadSuit }: CardRowProps) => {
  const { dark } = useContext(SettingsContext)
  const [illegalCard, setIllegalCard] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIllegalCard(null)
    }, 320)
    return () => {
      clearTimeout(timer)
    }
  }, [illegalCard])

  const cardWidth = 100 / (cards.length || 1)

  const handleCardAction = (card: Card) => {
    const legal = isLegal({ hand: cards, card, leadSuit })
    if (!legal) {
      setIllegalCard(card.cardId || null)
      return
    }
    playCard(card)
  }

  return (
    <>
      <ul className={styles.card_row} aria-label="Your hand — select a card to play">
        {cards &&
          cards.map((card) => {
            const legal = isLegal({ hand: cards, card, leadSuit })
            const isSelected = !!(queuedCard && queuedCard.cardId === card.cardId)
            return (
              <li
                className={classNames({
                  'playing-card': true,
                  [styles.shake]: illegalCard === card.cardId,
                  [styles.selected]: isSelected,
                })}
                data-card-id={card.cardId}
                key={card.cardId}
              >
                <div aria-hidden="true">
                  <span style={{ color: getColor(card.suit, dark) }}>
                    {getSuitSymbol(card.suit)}
                  </span>
                  <span
                    className={styles.card_value}
                    style={{ color: getColor(card.suit, dark) }}
                  >
                    {card.value}
                  </span>
                </div>
                <button
                  type="button"
                  className={styles.card_button}
                  aria-label={`${card.value} of ${card.suit}`}
                  aria-pressed={isSelected}
                  aria-disabled={!legal}
                  onClick={(e) => {
                    e.preventDefault()
                    handleCardAction(card)
                  }}
                />
              </li>
            )
          })}
      </ul>
      <style jsx>{`
        @media only screen and (max-width: 768px) {
          li {
            width: ${cardWidth}vw;
            height: ${cardWidth * 1.5}vw;
            max-width: 24vw;
            max-height: 36vw;
          }

          li > div > span:first-child {
            font-size: min(${cardWidth * 0.3}vw, ${24 * 0.3}vw);
          }
          li > div > span:last-child {
            font-size: min(${cardWidth * 0.35}vw, 10vw);
          }

          ul {
            height: ${cardWidth * 1.5 * 0.6}vw;
            max-height: ${36 * 0.6}vw;
          }
        }
      `}</style>
    </>
  )
}

export default CardRow
