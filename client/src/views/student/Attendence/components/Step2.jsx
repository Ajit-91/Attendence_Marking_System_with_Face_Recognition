import { Box, Button, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getFaceRecognitionInfo } from '../../../../apis/studentApis'
import Camera from '../../../../components/Camera'

const Step2 = ({ code }) => {
    const [labels, setLabels] = useState([])
    const [turnVideo, setTurnVideo] = useState(false)

    useEffect(() => {
        const fetchLabels = async () => {
            //  Fetching the necesary labels which would be required by face recogniton model to recognise the face
            const resp = await getFaceRecognitionInfo()
            if (resp?.error === false) {
                setLabels(resp?.data)
            }
        }
        fetchLabels()
    }, [])
    return (
        <>
            <Paper elevation={5} component={Box} p={4} mt={2}>
                <Typography fontWeight={'medium'} variant='h5' align='center' >
                    Please Makes sure that you take screenshot of your face in illuminated environment
                </Typography>
                <Button
                    color='primary'
                    variant='contained'
                    sx={{ mx: 'auto', mt: 3, display: 'block' }}
                    onClick={() => setTurnVideo(prev => !prev)}
                >{turnVideo ? 'Turn off Camera' : 'Turn On Camera'}
                </Button>
                {turnVideo && <Camera labels={labels} code={code} />}
            </Paper>
        </>
    )
}

export default Step2