import { createTheme } from '@mui/material/styles';
import { primaryColor, secondaryColor, errorColor, successColor } from "../styles/_variables.module.scss";
// Create a theme instance.
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: primaryColor,
        },
        secondary: {
            main: secondaryColor,
        },
        success: {
            main: successColor,
        },
        error: {
            main: errorColor
        }
    },
});
export default theme;