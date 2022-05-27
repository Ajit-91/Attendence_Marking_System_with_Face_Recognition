import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getFaceRecognitionInfo } from '../../../../apis/studentApis'
import Camera from '../../../../components/Camera'

const Step2 = ({code}) => {
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
            <Box sx={{ width: '100%', height: 'auto' }}>
                {turnVideo && <Camera labels={labels} code={code} />}
            </Box>
            <Button
                color='primary'
                variant='contained'
                sx={{ mx: 'auto', mt: 3, display: 'block' }}
                onClick={() => setTurnVideo(prev => !prev)}
            >{turnVideo ? 'Turn off Camera' : 'Turn On Camera'}
            </Button>
        </>
    )
}

export default Step2