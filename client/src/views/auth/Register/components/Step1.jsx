import { Button,  Paper, TextField, Box, Container } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { checkIfAlreadyRegistered } from '../../../../apis/commonApis'
import { SET_FORM_DETAILS } from '../../../../redux/slices/formSlice'


const Step1 = ({setStepCount, setActiveStep}) => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [enrollmentNo, setEnrollmentNo] = useState('')
    const dispatch = useDispatch()

    const handleNext = async (e) => {
        e.preventDefault()
        if(enrollmentNo.length !== 10){
            return alert('Enrollment number must be 10 digit long')
        }
        const res = await checkIfAlreadyRegistered({enrollmentNo})
        if(res?.error === false){
            dispatch(SET_FORM_DETAILS({
                name,
                enrollmentNo,
                password
            }))
            setStepCount(prev => prev + 1)
            setActiveStep(prev => prev + 1)
        }else{
            alert(res?.message || 'something went wrong')
        }
    }
    return (
        <>
            <Container maxWidth='sm'>
                <Paper elevation={5} p={4} component={Box}>
                    <form onSubmit={handleNext} >
                    <TextField
                        label='Enrollment No'
                        type='number'
                        placeholder='Enter 10 digit Enrollment number'
                        value={enrollmentNo}
                        onChange={(e) => setEnrollmentNo(e.target.value)}
                        fullWidth
                        required
                        margin='normal'
                    />
                    <TextField
                        label='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        required
                        margin='normal'
                    />
                    <TextField
                        label='Password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        required
                        margin='normal'
                    />
                <Button
                    sx={{ mt: 3, display: 'block', ml : 'auto' }}
                    variant='contained'
                    type='submit'
                    disabled={!enrollmentNo || !name || !password ? true : false}
                >Next
                </Button>
                    </form>
                </Paper>
            </Container>
        </>
    )
}

export default Step1