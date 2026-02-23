import { useState, useRef, useEffect } from 'react'
import { InputGroup, Input, Button } from 'reactstrap'

interface CustomTrumpProps {
  className?: string
}

const CustomTrump = ({ className }: CustomTrumpProps) => {
  const [trumpName, setTrumpName] = useState(
    localStorage.getItem('trumpNamePref') || 'trump'
  )

  const [editMode, setEditMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editMode) {
      inputRef.current?.focus()
    }
  }, [editMode])

  const save = () => {
    setEditMode(false)
    localStorage.setItem('trumpNamePref', trumpName)
  }

  return (
    <div className={className}>
      {editMode ? (
        <InputGroup>
          <Input
            innerRef={inputRef}
            value={trumpName}
            onChange={(e) => setTrumpName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                save()
              }
            }}
          />
          <Button color="primary" onClick={save}>
            save
          </Button>
        </InputGroup>
      ) : (
        <button
          type="button"
          aria-label={`Edit trump name: ${trumpName}`}
          onClick={() => setEditMode(true)}
        >
          {trumpName}
        </button>
      )}
      <style jsx>{`
        button {
          text-transform: uppercase;
          background: transparent;
          border: none;
          padding: 0;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          color: inherit;
          cursor: crosshair;
        }
      `}</style>
    </div>
  )
}

export default CustomTrump
