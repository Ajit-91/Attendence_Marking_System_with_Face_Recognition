import { Button, Paper, TextField, Box, Container } from '@mui/material'
import React, { useState } from 'react'
import { checkIfAlreadyRegistered, register } from '../../../../apis/commonApis'
import { SET_USER } from '../../../../redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import Loading from '../../../../components/Loading'


const RegisterTeacher = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [enrollmentNo, setEnrollmentNo] = useState('')
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        try {
            setLoading(true)
            e.preventDefault()
            if (enrollmentNo.length !== 10) {
                throw new Error('Enrollment number must be 10 digit long')
            }
            const res = await checkIfAlreadyRegistered({ enrollmentNo })
            if (res?.error) throw new Error(res?.message);
                // Api call to register teacher
            const resp = await register({
                name,
                enrollmentNo,
                password,
                role: 'ADMIN'
            })
            if (resp?.error) throw new Error(resp?.message);
            dispatch(SET_USER(resp?.data))
        } catch (error) {
            alert(error?.message || 'something went wrong')
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
         {loading && <Loading />}
            <Container maxWidth='sm'>
                <Paper elevation={5} p={4} component={Box}>
                    <form onSubmit={handleSubmit} >
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
                            sx={{ mt: 3, display: 'block', ml: 'auto' }}
                            variant='contained'
                            type='submit'
                            disabled={
                                !enrollmentNo ||
                                !name ||
                                !password
                                ? true
                                : false
                            }
                        >Submit
                        </Button>
                    </form>
                </Paper>
            </Container>
        </>
    )
}

export default RegisterTeacher