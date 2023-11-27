import React, { useEffect, useState } from 'react'
import { Box, Grid, Paper, TextField, Typography } from '@mui/material'
import { getMyAttendence } from '../../../apis/studentApis'
import Dashboard from '../../../components/Dashboard'
import Loading from '../../../components/Loading'
import AttendenceTable from '../../../components/AttendenceTable'

const MyAttHistory = () => {
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)
    const [queryParams, setQueryParams] = useState({
        dateString: new Date().toISOString().slice(0, 10),
        subject: '',
    });

    useEffect(() => {
        const fetchHistory = async () => {
            const res = await getMyAttendence(queryParams)
            if (res?.error === false) {
                setHistory(res?.data)
            }
            setLoading(false)
        }
        fetchHistory()
    }, [queryParams])

    return (
        <Dashboard page='All Attendences'>
            {loading ? <Loading /> : (
                <>
                    <Box sx={{ mb: 4 }}>
                        <Paper sx={{ p: 4, }}>
                            <Typography variant='h5' sx={{ mb: 2 }}>Filter Attendence History</Typography>

                            <Grid container spacing={2}>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label='Subject'
                                        type='text'
                                        placeholder='Enter Subject'
                                        fullWidth
                                        required
                                        value={queryParams.subject}
                                        onChange={(e) => setQueryParams(prev => ({ ...prev, subject: e.target.value }))}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label=''
                                        type='date'
                                        placeholder='Enter Date'
                                        fullWidth
                                        required
                                        value={queryParams.dateString}
                                        onChange={(e) => setQueryParams(prev => ({ ...prev, dateString: e.target.value }))}
                                    />
                                </Grid>

                            </Grid>
                        </Paper>
                    </Box>
                    <Box py={4}>
                        <AttendenceTable rows={history} />
                    </Box>
                </>
            )}
        </Dashboard>
    )
}

export default MyAttHistory