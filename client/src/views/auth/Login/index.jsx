import { Box, Button, Container, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../../apis/commonApis'
import Loading from '../../../components/Loading'
import { SET_USER } from '../../../redux/slices/userSlice'

const Login = () => {
    const [enrollmentNo, setEnrollmentNo] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        const res = await login({
            enrollmentNo,
            password
        })
        if(res?.error === false){
            dispatch(SET_USER(res?.data))
        }
        setLoading(false)
    }

  return (
    <Container>
        {loading && <Loading />}
        <form onSubmit={handleSubmit} >
        <Stack>
            <TextField
                label='Enrollment No'
                fullWidth
                required
                margin='normal'
                value={enrollmentNo}
                onChange={(e)=>setEnrollmentNo(e.target.value)}
            />
            <TextField
                label='Enrollment No'
                fullWidth
                required
                margin='normal'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
        </Stack>
        <Button type='submit' variant='outlined'>Submit</Button>
        </form>
    </Container>
  )
}

export default Login