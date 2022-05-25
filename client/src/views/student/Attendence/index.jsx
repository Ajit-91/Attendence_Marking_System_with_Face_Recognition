import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { getFaceRecognitionInfo } from '../../../apis/studentApis'
import Camera from '../../../components/Camera'
import Dashboard from '../../../components/Dashboard'

const Attendence = () => {
    
  return (
    <>
        <Dashboard page='Home'>
            <Box>
                <Camera />
            </Box>
        </Dashboard>
    </>
  )
}

export default Attendence