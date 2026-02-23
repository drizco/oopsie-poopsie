import { useState, useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import Button from '@mui/material/Button'
import styles from '../styles/components/custom-trump.module.scss'

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
        <Box sx={{ display: 'flex' }}>
          <OutlinedInput
            inputRef={inputRef}
            value={trumpName}
            size="small"
            onChange={(e) => setTrumpName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                save()
              }
            }}
          />
          <Button variant="contained" color="primary" onClick={save}>
            save
          </Button>
        </Box>
      ) : (
        <button
          type="button"
          className={styles.trump_button}
          aria-label={`Edit trump name: ${trumpName}`}
          onClick={() => setEditMode(true)}
        >
          {trumpName}
        </button>
      )}
    </div>
  )
}

export default CustomTrump
