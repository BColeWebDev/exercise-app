import { createTheme } from '@mui/material/styles';
import { primaryColor, secondaryColor, surfaceColor, errorColor, successColor } from "../styles/_variables.module.scss";
// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: primaryColor,
        },
        secondary: {
            main: secondaryColor,
        },
        background: {
            paper: '#292929',
            default: '#121212',
        },
        error: {
            main: errorColor,
        },
        text: {
            primary: '#eeeeee',
        },
        success: {
            main: successColor,
        },
    },
    typography: {
        fontFamily: 'Poppins',
    },
});
export default theme;