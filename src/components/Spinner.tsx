import CircularProgress from '@mui/material/CircularProgress'
import { useContext } from 'react'
import SettingsContext from '../context/SettingsContext'

interface SpinnerComponentProps {
  loading: boolean
}

const SpinnerComponent = ({ loading }: SpinnerComponentProps) => {
  const { dark } = useContext(SettingsContext)
  return loading ? (
    <div
      className="spinner-container"
      style={{
        backgroundColor: dark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.3)',
      }}
    >
      <CircularProgress size="3rem" color="primary" />
    </div>
  ) : null
}

export default SpinnerComponent
