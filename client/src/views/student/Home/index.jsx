import { Container, Typography } from '@mui/material'
import React from 'react'
import Dashboard from '../../../components/Dashboard'
import AnnouncementList from '../../../components/AnnouncementList'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../redux/slices/userSlice'

const Home = () => {
  const user = useSelector(selectUser)
  return (
    <>
        <Dashboard page='Home'>
            <Container maxWidth='md'>
              <Typography variant='h4' color='primary' >Hi, {user?.name} </Typography>
              <Typography sx={{mb : 4, mt : 1}} variant='h6' color='' >These are the announcements made by your teacher</Typography>
                <AnnouncementList userType={'STUDENT'} />
            </Container>
        </Dashboard>
    </>
  )
}

export default Home