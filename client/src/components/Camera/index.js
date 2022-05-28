import React, { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from "react-webcam";
import * as faceapi from 'face-api.js'
import "../../assets/styles/webcam.css"
import { Box, Button, Grid } from '@mui/material';
import Loading from '../../components/Loading'
import { recognizeFaces } from '../../utils/faceRecognition';
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/slices/userSlice'
import { markAttendence } from '../../apis/studentApis';

const Camera = ({ labels, code }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    // const videoWidth = 480
    // const videoHeight = 360
    const MODELS_URI = '/models'
    const [loading, setLoading] = useState(true)
    const [loadForRecognition, setLoadForRecognition] = useState(false)
    const [imgSrc, setImgSrc] = useState(null);
    const imageRef = useRef(null)
    const user = useSelector(selectUser)

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

    const markMyAttendence = async () => {
        try {
            if (imgSrc && imageRef) {
                setLoadForRecognition(true)
                const res = await recognizeFaces(imageRef.current, canvasRef.current, labels)
                console.log({ recogRes: res })

                const found = res.find((match) => match.label === user?.name)
                if (found) {
                    const res = await markAttendence({ attCode: code })
                    if (res?.error === false) {
                        alert('Your attendence is marked')
                    }
                } else {
                    alert('Please Try Again')
                }
                setLoadForRecognition(false)
            }
        } catch (error) {
            setLoadForRecognition(false)
            alert('something went wrong')
            console.log('Face recognition error', error)
        }
    }

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
    }, [])

    useEffect(() => {
        return () => {
            stopVideo()
        }
    }, [])

    return (
        <>
            {loading ? <Loading /> : (
                <Box width='100%' mt={4}>
                    {loadForRecognition && <Loading />}
                    <Grid container spacing={2} >
                        <Grid item xs={12} lg={6} md={6}>
                            <Webcam
                                style={{ zIndex: 2, width: '100%', }}
                                ref={videoRef}
                                muted
                                screenshotFormat="image/jpeg"
                                autoPlay
                            />
                            <Button
                                sx={{ mt: 3 }}
                                variant='outlined'
                                onClick={capture}
                            >Capture
                            </Button>
                        </Grid>
                        <Grid item xs={12} lg={6} md={6}>
                            {imgSrc && (
                                // <>
                                <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 1 }}>
                                    <img
                                        src={imgSrc}
                                        style={{ width: '100%' }}
                                        alt='user'
                                        ref={imageRef}
                                    />
                                    <canvas
                                        ref={canvasRef}
                                        style={{ position: 'absolute', left: 0, top: 0, zIndex: 3 }}
                                    >
                                    </canvas>
                                    <Button
                                        sx={{ mt: 3 }}
                                        variant='outlined'
                                        onClick={markMyAttendence}
                                    >Mark Attendence
                                    </Button>
                                </div>
                                // </>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            )}
        </>
    )
}

export default Camera