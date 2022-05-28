import { Button,  Grid, Paper, Box, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { login } from '../../../apis/commonApis'
import Loading from '../../../components/Loading'
import { SET_USER } from '../../../redux/slices/userSlice'

const Login = () => {
    const [enrollmentNo, setEnrollmentNo] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const res = await login({
            enrollmentNo,
            password
        })
        if (res?.error === false) {
            dispatch(SET_USER(res?.data))
        } else {
            alert(res?.message || 'something went wrong')
        }
        setLoading(false)
    }


    return (
        <Box sx={{ backgroundColor: '#f5f5f5', }} >
            {loading && <Loading />}
            <Grid container>
                <Grid item xs={12} md={6} lg={6} sx={{ p: 0 }}>
                    <img
                        width={"100%"}
                        height={"100%"}
                        alt='brandImg'
                        src='https://th.bing.com/th/id/OIP.DPNoWJ3Au35Fw58Sn2oj1wHaGo?w=188&h=180&c=7&r=0&o=5&pid=1.7'
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={6} sx={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
                    <Paper elevation={5} component={Box} p={4} borderRadius="10px"  >
                        <form onSubmit={handleSubmit} >
                            <TextField
                                label='Enrollment No'
                                fullWidth
                                required
                                margin='normal'
                                value={enrollmentNo}
                                onChange={(e) => setEnrollmentNo(e.target.value)}
                            />
                            <TextField
                                label='Password'
                                type='password'
                                fullWidth
                                required
                                margin='normal'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                sx={{ my: 2, mx: 'auto', display: 'block' }}
                                type='submit'
                                variant='contained'
                            >Submit
                            </Button>
                        </form>
                        <Typography
                            align='center'
                            variant='subtitle2'
                        >Don't have Account ?
                        </Typography>
                        <Typography
                            color='primary'
                            align='center'
                            sx={{ cursor: 'pointer' }}
                            variant='subtitle2'
                            onClick={() => navigate('/register')}
                        >Register
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Login