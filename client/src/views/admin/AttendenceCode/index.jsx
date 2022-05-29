import { Container, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllAttCodes } from '../../../apis/adminApis'
import Dashboard from '../../../components/Dashboard'
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
        <Dashboard page='Attendence Code'>
            {loading ? <Loading /> : (
                <>
                    <Container maxWidth='md' >
                        <GenerateCode setReload={setReload} />
                    </Container>
                    <Divider sx={{my : 4}} />
                    <Typography
                        sx={{ my: 3 }}
                        variant='button'
                        align='center'
                        fontWeight='medium'
                        component='h5'
                    >All generated Codes
                    </Typography>
                    <TableContainer sx={{ mt: 4 }} component={Paper} elevation={5} >
                        <Table sx={{ minWidth: '80%' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center' >Subject</TableCell>
                                    <TableCell align='center' >Code</TableCell>
                                    <TableCell align='center' >Created At</TableCell>
                                    <TableCell align='center' >Validity</TableCell>
                                    <TableCell align='center' >Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {attCodes.map((row, i) => (
                                    <TableRow
                                        key={i}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align='center'>{row?.subject}</TableCell>
                                        <TableCell align='center'>{row?.code}</TableCell>
                                        <TableCell align='center'>
                                        {new Date(row?.createdAt).toDateString()} {" "}
                                    at {new Date(row?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </TableCell>
                                        <TableCell align='center'>{row?.validity} min</TableCell>
                                        <TableCell align='center'>{new Date(row?.expiresAt).getTime() > Date.now() ? (
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
        </Dashboard>
    )
}

export default AttendenceCode