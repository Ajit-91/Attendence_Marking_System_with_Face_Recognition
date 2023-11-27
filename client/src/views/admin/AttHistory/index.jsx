import { Box, FormControl, InputLabel, Select, MenuItem, Paper, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAttndenceHistory } from '../../../apis/adminApis'
import AttendenceTable from '../../../components/AttendenceTable'
import Dashboard from '../../../components/Dashboard'
import Loading from '../../../components/Loading'
import { batchInfo, branchInfo } from '../../../constants/institutionInfo'

const AttHistory = () => {
    const [attHistory, setAttHistory] = useState([])
    const [queryParams, setQueryParams] = useState({
        batch: '',
        branch: '',
        dateString: new Date().toISOString().slice(0, 10),
        subject: '',
    });
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const fetchHistory = async () => {
            const res = await getAttndenceHistory(queryParams)
            if (res?.error === false) {
                setAttHistory(res?.data)
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
                                    <FormControl sx={{ width: '100%', mb: 1 }}>
                                        <InputLabel id="batch-label">Batch</InputLabel>
                                        <Select
                                            labelId="batch-label"
                                            id="batch-select"
                                            value={queryParams.batch}
                                            onChange={(e) => setQueryParams(prev => ({ ...prev, batch: e.target.value }))}
                                            label="Batch"
                                            required
                                        >
                                            {batchInfo?.map((item, i) => (
                                                <MenuItem key={i} value={item?.value}>{item?.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl sx={{ width: '100%', mb: 1 }}>
                                        <InputLabel id="branch-label">Branch</InputLabel>
                                        <Select
                                            labelId="branch-label"
                                            id="branch-select"
                                            value={queryParams.branch}
                                            onChange={(e) => setQueryParams(prev => ({ ...prev, branch: e.target.value }))}
                                            label="Branch"
                                            required
                                        >
                                            {branchInfo?.map((item, i) => (
                                                <MenuItem key={i} value={item?.value}>{item?.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

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
                        <AttendenceTable rows={attHistory} />
                    </Box>
                </>
            )}
        </Dashboard>
    )
}

export default AttHistory