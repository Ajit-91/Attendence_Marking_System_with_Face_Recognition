import { Avatar, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

const AttendenceTable = ({ rows }) => {

  return (
    <>
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
            {rows.map((row) => (
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
    </>
  )
}

export default AttendenceTable