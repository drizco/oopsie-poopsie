import { useContext } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'
import AppStateContext from '../context/AppStateContext'

const ErrorModal = () => {
  const { error, setError } = useContext(AppStateContext)
  return (
    <Dialog open={!!error} onClose={() => setError(null)}>
      <DialogContent>
        <h2>Uh oh, something went wrong...</h2>
        {error && <p>{error}</p>}
        <Button variant="outlined" onClick={() => setError(null)}>
          Dismiss
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default ErrorModal
