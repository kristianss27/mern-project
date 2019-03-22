import { createMuiTheme } from '@material-ui/core/styles';

const goldenTheme = createMuiTheme({
    palette: {
      common: { black: 'rgba(0, 0, 0, 1)', white: 'rgba(255, 255, 255, 1)' },
      background: {
        paper: 'rgba(255, 255, 255, 1)',
        default: 'rgba(255, 255, 255, 1)'
      },
      primary: {
        light: 'rgba(205, 177, 62, 0.8)',
        main: 'rgba(194, 159, 15, 0.73)',
        dark: 'rgba(215, 179, 27, 1)',
        contrastText: 'rgba(255, 255, 255, 1)'
      },
      secondary: {
        light: 'rgba(255, 255, 255, 1)',
        main: 'rgba(0, 0, 0, 1)',
        dark: 'rgba(215, 179, 27, 1)',
        contrastText: 'rgba(255, 255, 255, 1)'
      },
      error: {
        light: 'rgba(167, 0, 30, 0.81)',
        main: 'rgba(167, 0, 30, 0.92)',
        dark: 'rgba(167, 0, 30, 1)',
        contrastText: '#fff'
      },
      text: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(3, 3, 3, 0.72)',
        disabled: 'rgba(205, 177, 62, 0.8)',
        hint: 'rgba(215, 179, 27, 1)'
      }
    }
  })

  export default goldenTheme
  