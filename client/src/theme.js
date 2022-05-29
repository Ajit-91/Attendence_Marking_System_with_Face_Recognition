import { createTheme } from '@mui/material/styles'
import { deepPurple } from '@mui/material/colors';

const theme = createTheme({
    palette : {
        primary : {
            main : deepPurple[400],
        },
        secondary : {
            main : deepPurple[50]
        },
        white : {
            main : '#fff'
        }
    }
})

export default theme