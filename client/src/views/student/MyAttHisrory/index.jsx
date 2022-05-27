import React, { useEffect, useState } from 'react'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
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
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Subject</TableCell>
                                {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {history.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
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

export default MyAttHistory