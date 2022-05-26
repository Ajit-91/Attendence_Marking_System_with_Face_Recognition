import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getFaceRecognitionInfo } from '../../../apis/studentApis'
import Camera from '../../../components/Camera'
import Dashboard from '../../../components/Dashboard'

const Attendence = () => {
  const [labels, setLabels] = useState([])
  const [turnVideo, setTurnVideo] = useState(false)
  useEffect(() => {
    const fetchLabels = async () => {
      const resp = await getFaceRecognitionInfo()
      if (resp?.error === false) {
        setLabels(resp?.data)
      }
    }
    fetchLabels()
  }, [])
  return (
    <>
      <Dashboard page='Home'>
        <Box sx={{ width: 480, height: 360 }}>
          {turnVideo && <Camera labels={labels} />}
        </Box>
        <Button
          color='primary'
          variant='contained'
          sx={{mx : 'auto', mt : 3, display : 'block'}}
          onClick={() => setTurnVideo(prev => !prev)}
        >{turnVideo ? 'Turn off Camera' : 'Turn On Camera'}
        </Button>
      </Dashboard>
    </>
  )
}

export default Attendence