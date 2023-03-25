import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
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
          html {
            font-size: 62.5%;
          }
          body {
            font-family: "Roboto", sans-serif;
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
