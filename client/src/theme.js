import { createTheme } from '@mui/material/styles'
import { grey, purple, deepPurple } from '@mui/material/colors';

const theme = createTheme({
    palette : {
        primary : {
            main : deepPurple[400],
        },
        white : {
            main : '#fff'
        }
    }
})

export default theme