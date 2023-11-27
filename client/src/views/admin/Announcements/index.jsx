import { Container } from '@mui/material'
import React, { useState } from 'react'
import AnnouncementList from '../../../components/AnnouncementList'
import Dashboard from '../../../components/Dashboard'
import MakeAnnouncement from './components/MakeAnnouncement'

const Announcements = () => {
    const [reload, setReload] = useState(false)
  return (
    <Dashboard page='Announcements'>
        <Container maxWidth='md' sx={{mb : 5}}>
            <MakeAnnouncement setReload={setReload} />
        </Container>
        <Container maxWidth='md'>
        <AnnouncementList reload={reload} userType={'ADMIN'} />
        </Container>
    </Dashboard >
  )
}

export default Announcements