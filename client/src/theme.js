import { createTheme } from '@mui/material/styles'
import { pink } from '@mui/material/colors';

const theme = createTheme({
    palette : {
        primary : {
            main : pink.A200
        },
        secondary : {
            main : "#f2f2f2"
        },
        white : {
            main : '#fff'
        }
    }
})

export default theme