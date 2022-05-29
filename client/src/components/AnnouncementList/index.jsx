import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { getAnnouncements } from '../../apis/commonApis'
import AnnouncementCard from '../AnnouncementCard'
import Loading from '../Loading'

const AnnouncementList = ({ reload }) => {
    const [announcements, setAnnouncements] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAnnoncmnts = async () => {
            const res = await getAnnouncements()
            if (res?.error === false) {
                setAnnouncements(res?.data)
                setLoading(false)
            }
        }
        fetchAnnoncmnts()
    }, [reload])
    return (
        <>{loading ? <Loading /> : (
            <>
                {announcements?.length > 0 ? (
                    <>
                        {announcements.map((item, i) => (
                            <Box mb={3} key={i} >
                                <AnnouncementCard data={item} />
                            </Box>
                        ))}
                    </>
                ) : (
                    <Box width='100%' height='100%' sx={{ display: 'grid', placeItems: 'center' }}>
                        <Typography align='center' fontWeight='medium' variant='h5' >No Announcements yet</Typography>
                    </Box>
                )}
            </>
        )}
        </>
    )
}

export default AnnouncementList