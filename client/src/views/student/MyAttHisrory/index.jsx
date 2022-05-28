import React, { useEffect, useState } from 'react'
import { Avatar, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { getMyAttendence } from '../../../apis/studentApis'
import Dashboard from '../../../components/Dashboard'
import Loading from '../../../components/Loading'

const MyAttHistory = () => {
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchHistory = async () => {
            const res = await getMyAttendence()
            if (res?.error === false) {
                setHistory(res?.data)
            }
            setLoading(false)
        }
        fetchHistory()
    }, [])

    return (
        <Dashboard page='All Attendences'>
            {loading ? <Loading /> : (
                <>
                    <Box py={4}>
                        <TableContainer component={Paper} elevation={5} >
                            <Table stickyHeader={true} >
                                <TableHead sx={{ backgroundColor: 'black' }} >
                                    <TableRow>
                                        <TableCell >Name</TableCell>
                                        <TableCell >Enrollment No</TableCell>
                                        <TableCell >Date</TableCell>
                                        <TableCell >Subject</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {history.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell >
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Avatar 
                                                        variant='rounded' 
                                                        sx={{ mr: 3, width: 50, height: 50 }} 
                                                        src={row?.student?.images[0]}
                                                    />
                                                    <Typography >{row?.student?.name}</Typography>
                                                </div>
                                            </TableCell>
                                            <TableCell >{row?.student?.enrollmentNo}</TableCell>
                                            <TableCell >{new Date(row?.createdAt)}</TableCell>
                                            <TableCell >{row?.attCode?.subject}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>
                        </TableContainer>
                    </Box>
                </>
            )}
        </Dashboard>
    )
}

export default MyAttHistory