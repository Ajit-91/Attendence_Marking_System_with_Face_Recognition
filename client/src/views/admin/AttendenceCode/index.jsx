import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllAttCodes } from '../../../apis/adminApis'
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
                                    <TableCell >Subject</TableCell>
                                    <TableCell >Code</TableCell>
                                    <TableCell >Created At</TableCell>
                                    <TableCell >Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {attCodes.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell >{row?.subject}</TableCell>
                                        <TableCell >{row?.code}</TableCell>
                                        <TableCell >{row?.createdAt}</TableCell>
                                        <TableCell >{row?.expiresAt > Date.now() ? (
                                            <Typography color='success'>Active</Typography>
                                        ) : (
                                            <Typography color='error'>Expired</Typography>
                                        )}</TableCell>
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