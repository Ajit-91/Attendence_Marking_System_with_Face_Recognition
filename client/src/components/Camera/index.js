import React, { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from "react-webcam";
import * as faceapi from 'face-api.js'
import "../../assets/styles/webcam.css"
import { Box, Button, Grid } from '@mui/material';
import Loading from '../../components/Loading'
import { recognizeFaces } from '../../utils/faceRecognition';

const Camera = ({ labels }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    // const videoWidth = 480
    // const videoHeight = 360
    const MODELS_URI = '/models'
    const [loading, setLoading] = useState(true)
    const [loadForRecognition, setLoadForRecognition] = useState(false)
    const [imgSrc, setImgSrc] = useState(null);
    const imageRef = useRef(null)

    const capture = useCallback(() => {
        const imageSrc = videoRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [videoRef, setImgSrc]);

    const stopVideo = useCallback(() => {
        if (videoRef.current) {
            let stream = videoRef.current.stream;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
        }
    }, [videoRef])

    useEffect(() => {
        console.log('video starting')
        Promise.all([
            faceapi.nets.faceLandmark68Net.loadFromUri(MODELS_URI),
            faceapi.nets.faceRecognitionNet.loadFromUri(MODELS_URI),
            faceapi.nets.ssdMobilenetv1.loadFromUri(MODELS_URI),
        ]).then(() => {
            console.log('models loaded')
            setLoading(false)
        }).catch(err => {
            console.log('models loading error', err)
        })

        return () => {
            stopVideo()
        }
    }, [])

    useEffect(() => {
        console.log({ imageRef })
        const fun = async () => {
            if (imgSrc && imageRef) {
                setLoadForRecognition(true)
                const res = await recognizeFaces(imageRef.current, canvasRef.current, labels)
                console.log({ recogRes: res })

                const found  =  res.find((match) => match.label === 'Admin')
                if(found){
                    setLoadForRecognition(false)
                    alert('Your attendence is marked')
                }
            }
        }
        fun()
    }, [imgSrc])

    return (
        <>
            {loading ? <Loading  /> : (
                <Box width='100%'>
                    {loadForRecognition && <Loading />}
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={6} md={6}>
                            <Webcam
                                style={{ zIndex: 2, position: 'relative', width: '100%', height: '100%' }}
                                ref={videoRef}
                                muted
                                screenshotFormat="image/jpeg"
                                autoPlay
                            />
                        </Grid>
                        <Grid item xs={12} lg={6} md={6}>
                            {imgSrc && (
                                <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 1 }}>
                                    <img
                                        src={imgSrc}
                                        alt='user'
                                        ref={imageRef}
                                    />
                                    <canvas
                                        ref={canvasRef}
                                        style={{ position: 'absolute', left: 0, top: 0, zIndex: 3 }}
                                    >
                                    </canvas>
                                </div>
                            )}
                        </Grid>
                    </Grid>
                    <Button
                        sx={{ mx: 'auto', mt: 5, display: 'block' }}
                        variant='outlined'
                        color='info'
                        onClick={capture}
                    >Capture
                    </Button>
                </Box>
            )}
        </>
    )
}

export default Camera