import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getFaceRecognitionInfo } from '../../../apis/studentApis'
import Camera from '../../../components/Camera'
import Dashboard from '../../../components/Dashboard'

const Attendence = () => {
  const [labels, setLabels] = useState([])
    useEffect(() => {
      const fetchLabels = async () => {
        const resp = await getFaceRecognitionInfo()
        if(resp?.error === false){
          setLabels(resp?.data)
        }
      }
      fetchLabels()
    }, [])
  return (
    <>
        <Dashboard page='Home'>
            <Box>
                <Camera labels={labels} />
            </Box>
        </Dashboard>
    </>
  )
}

export default Attendence