import { Avatar, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

const AttendenceTable = ({ rows }) => {

  return (
    <>
      <TableContainer component={Paper} elevation={5} >
        <Table stickyHeader={true} >
          <TableHead sx={{ backgroundColor: 'black' }} >
            <TableRow>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Enrollment No</TableCell>
              <TableCell align='center'>Date</TableCell>
              <TableCell align='center'>Subject</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='center' >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      variant='rounded'
                      sx={{ mr: 3, width: 50, height: 50 }}
                      src={row?.student?.images[0]}
                    />
                    <Typography >{row?.student?.name}</Typography>
                  </div>
                </TableCell>
                <TableCell align='center' >{row?.student?.enrollmentNo}</TableCell>
                <TableCell align='center' >
                  {new Date(row?.createdAt).toDateString()} {" "}
                  at {new Date(row?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </TableCell>
                <TableCell align='center' >{row?.attCode?.subject}</TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </>
  )
}

export default AttendenceTable