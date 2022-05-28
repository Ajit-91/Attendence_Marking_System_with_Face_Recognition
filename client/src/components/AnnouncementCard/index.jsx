import { Paper, Box, Typography, Divider } from '@mui/material'
import React from 'react'

const AnnouncementCard = ({ data }) => {
    return (
        <>
            <Paper component={Box} elevation={5} p={4}>
                <Typography>
                    {data?.description}
                </Typography>
                <Divider sx={{ my: 3 }} />
                <Typography align='right' variant='caption' display='block'>
                    {new Date(data?.createdAt).toDateString()} {" "}
                    at {new Date(data?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
            </Paper>
        </>
    )
}

export default AnnouncementCard