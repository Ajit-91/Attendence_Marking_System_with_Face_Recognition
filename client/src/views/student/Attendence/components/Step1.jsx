import { TextField, Button, Container, Paper, Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { validateInStep1 } from '../../../../apis/studentApis'

const Step1 = ({ setStepCount, setCode }) => {

    const [attCode, setAttCode] = useState("")

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            //  here validation is made if the entered attendence code is valid or not.
            //  If it is valid then only we move to next step
            const res = await validateInStep1({ attCode })
            if (res?.error === false) {
                setCode(attCode)
                setStepCount(2)
            } else {
                alert(res?.message || 'something went wrong')
            }
        } catch (error) {
            console.log('validateInStep1 error', error)
        }
    }

    return (
        <>
            <Container maxWidth='md'>
                <Paper component={Box} elevation={5} p={4} mt={4} >
                    <Typography fontWeignt='bold' variant='body1' sx={{ mb: 3 }} >
                        Enter the Attendence code provided by your teacher
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label='Attendence code'
                            required
                            fullWidth
                            value={attCode}
                            onChange={(e) => setAttCode(e.target.value)}
                            placeholder='Enter 8 digit attendence code'
                        />
                        <Button sx={{ mt: 4 }} variant='contained' type='submit'>
                            Next
                        </Button>
                    </form>
                </Paper>
            </Container>
        </>
    )
}

export default Step1