import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
          * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
            user-select: none;
          }
          ul {
            list-style-type: none;
          }
          a {
            text-decoration: none;
            color: unset;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `,
        },
    },
});

export default theme;
