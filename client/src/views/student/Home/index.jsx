import { Container } from '@mui/material'
import React from 'react'
import Dashboard from '../../../components/Dashboard'
import AnnouncementList from '../../../components/AnnouncementList'

const Home = () => {

  return (
    <>
        <Dashboard page='Home'>
            <Container maxWidth='md'>
                <AnnouncementList />
            </Container>
        </Dashboard>
    </>
  )
}

export default Home