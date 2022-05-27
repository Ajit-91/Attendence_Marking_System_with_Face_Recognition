import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllAttCodes } from '../../../apis/adminApis'
import DataTable from '../../../components/DataTable'
import Loading from '../../../components/Loading'
import GenerateCode from './components/GenerateCode'

const AttendenceCode = () => {
    const [loading, setLoading] = useState(true)
    const [attCodes, setAttCodes] = useState([])
    const [reload, setReload] = useState(false)
    useEffect(() => {
        const fetchAllCodes = async () => {
            const res = await getAllAttCodes()
            if (res?.error === false) {
                setAttCodes(res?.data)
            }
            setLoading(false)
        }
        fetchAllCodes()
    }, [reload])

    return (
        <>
            {loading ? <Loading /> : (
                <>
                    <Box mb={4}>
                        <GenerateCode setReload={setReload} />
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: '80%' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell></TableCell> */}
                                    <TableCell align="right">Subject</TableCell>
                                    <TableCell align="right">Code</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {attCodes.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        {/* <TableCell component="th" scope="row">
                                            {row?.subject}
                                        </TableCell> */}
                                        <TableCell align="right">{row?.subject}</TableCell>
                                        <TableCell align="right">{row?.code}</TableCell>
                                        <TableCell align="right">{row?.expiresAt > Date.now() ? 'Active' : 'Expired'}</TableCell>
                                        {/* <TableCell align="right">{row.carbs}</TableCell>
                                        <TableCell align="right">{row.protein}</TableCell> */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </>
    )
}

export default AttendenceCode