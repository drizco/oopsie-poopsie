import { createTheme, Theme } from '@mui/material/styles'

export function buildTheme(dark: boolean): Theme {
  return createTheme({
    palette: {
      mode: dark ? 'dark' : 'light',
      primary: { main: dark ? '#f6f6f6' : '#282c35' },
      secondary: { main: dark ? '#f6f6f6' : '#ffbc0d' },
      background: {
        default: dark ? '#282c35' : '#f6f6f6',
        paper: dark ? '#282c35' : '#f6f6f6',
      },
      text: {
        primary: dark ? '#f6f6f6' : '#282c35',
      },
      error: { main: '#db0007' },
      success: { main: '#12aa0c' },
    },
    typography: {
      fontFamily: "'Roboto_Mono', Arial, sans-serif",
    },
    shape: { borderRadius: 0 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { textTransform: 'none', borderRadius: 0 },
        },
      },
    },
  })
}
