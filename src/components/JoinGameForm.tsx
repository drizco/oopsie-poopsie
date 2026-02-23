import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import type { ChangeEvent } from 'react'

interface JoinGameFormProps {
  playerName: string
  onPlayerNameChange: (e: ChangeEvent<HTMLInputElement>) => void
  onJoin: () => void
}

/**
 * JoinGameForm - Player name input and join button
 */
const JoinGameForm = ({ playerName, onPlayerNameChange, onJoin }: JoinGameFormProps) => {
  return (
    <Box sx={{ mb: 5 }}>
      <form>
        <TextField
          fullWidth
          label="User Name"
          id="name"
          name="playerName"
          value={playerName || ''}
          onChange={onPlayerNameChange}
          slotProps={{ htmlInput: { 'data-lpignore': 'true' } }}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="success"
          disabled={!playerName}
          onClick={onJoin}
        >
          JOIN
        </Button>
      </form>
    </Box>
  )
}

export default JoinGameForm
