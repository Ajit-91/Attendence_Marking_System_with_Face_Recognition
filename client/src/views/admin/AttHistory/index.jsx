import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAttndenceHistory } from '../../../apis/adminApis'
import Dashboard from '../../../components/Dashboard'
import Loading from '../../../components/Loading'

const AttHistory = () => {
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchHistory = async () => {
            const res = await getAttndenceHistory()
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
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Name</TableCell>
                                        <TableCell align="right">Enrollment No</TableCell>
                                        <TableCell align="right">Date</TableCell>
                                        <TableCell align="right">Subject</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {history.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="right">{row?.student?.name}</TableCell>
                                            <TableCell align="right">{row?.student?.enrollmentNo}</TableCell>
                                            <TableCell align="right">{new Date(row?.createdAt)}</TableCell>
                                            <TableCell align="right">{row?.attCode?.subject}</TableCell>
                                            {/* <TableCell align="right">{row.protein}</TableCell> */}
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

export default AttHistory