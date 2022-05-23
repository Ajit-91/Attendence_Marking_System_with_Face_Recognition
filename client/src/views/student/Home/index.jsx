import { Box } from '@mui/system'
import React from 'react'
import Dashboard from '../../../components/Dashboard'

const Home = () => {
  return (
    <>
        <Dashboard page='Home'>
            <Box>
                <h1>This is home page</h1>
            </Box>
        </Dashboard>
    </>
  )
}

export default Home