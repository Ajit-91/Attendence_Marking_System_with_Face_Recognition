import { Paper, Box, Typography, Divider } from '@mui/material'
import React from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import "../../assets/styles/announcementCard.css";

const AnnouncementCard = ({ data }) => {
    return (
        <>
            <Paper component={Box} elevation={5} p={4} className='card'>
                <Typography>
                    {data?.description}
                </Typography>
                <Divider sx={{ my: 3 }} />
                <Typography variant='caption' className='dateTime'>
                    <AccessTimeIcon sx={{mr : 2}}/>
                    <p>{new Date(data?.createdAt).toDateString()} {" "}
                    at {new Date(data?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </Typography>
            </Paper>
        </>
    )
}

export default AnnouncementCard