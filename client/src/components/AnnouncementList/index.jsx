import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { getAnnouncements as getAnnouncementsForStudent } from '../../apis/studentApis'
import { getAnnouncements as getAnnouncementsForAdmin } from '../../apis/adminApis'
import AnnouncementCard from '../AnnouncementCard'
import Loading from '../Loading'

const AnnouncementList = ({ reload, userType }) => {
    const [announcements, setAnnouncements] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAnnoncmnts = async () => {
            try {
                let res;
                if (userType === 'ADMIN'){
                    res = await getAnnouncementsForAdmin()
                }else{
                    res = await getAnnouncementsForStudent()
                }

                if (res?.error) throw new Error(res?.message || 'Unable to fetch announcements') 
                setAnnouncements(res?.data)
            } catch (error) {
                alert(error?.message || 'something went wrong')
            } finally {
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
                                <AnnouncementCard data={item} userType={userType} />
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