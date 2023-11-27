import { Paper, Box, Typography, Divider } from '@mui/material'
import React from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import "../../assets/styles/announcementCard.css";

const AnnouncementCard = ({ data, userType }) => {
    return (
        <>
            <Paper component={Box} elevation={5} px={3} py={2} className='card'>
                <Typography>
                    {data?.description}
                </Typography>
                <Divider sx={{ mb: 1, mt: 3 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                    {userType === 'ADMIN' ? (
                        <Typography variant='caption'>
                            For {data?.branch} {data?.batch}
                        </Typography>
                    ) : (
                        <Typography variant='caption'>
                            By {data?.announcer?.name}
                        </Typography>
                    )}
                    <Typography variant='caption' className='dateTime'>
                        <AccessTimeIcon sx={{ mr: 1, fontSize: '14px' }} />
                        <p>{new Date(data?.createdAt).toDateString()} {" "}
                            at {new Date(data?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </Typography>
                </Box>
            </Paper>
        </>
    )
}

export default AnnouncementCard