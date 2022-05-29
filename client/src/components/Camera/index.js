import React, { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from "react-webcam";
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
    const [loadForRecognition, setLoadForRecognition] = useState(false)
    const [imgSrc, setImgSrc] = useState(null);
    const imageRef = useRef(null)
    const user = useSelector(selectUser)

    //  function the capture the screenshot
    const capture = useCallback(() => {
        const imageSrc = videoRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [videoRef, setImgSrc]);

    const stopVideo = useCallback(() => {
        if (videoRef.current) {
            let stream = videoRef?.current?.stream;
            const tracks = stream?.getTracks();
            tracks?.forEach(track => track?.stop());
        }
    }, [videoRef])

    //  main function to mark the attendence
    const markMyAttendence = async () => {
        try {
            if (imgSrc && imageRef) {
                setLoadForRecognition(true) // set the loading to  true
                const res = await recognizeFaces(imageRef.current, canvasRef.current, labels)
                console.log({ recogRes: res })

                const found = res.find((match) => match.label === user?.name)
                // if the result label of the face recognition is same as the user name who has logged in currently then only attendence is marked
                if (found) {
                    const res = await markAttendence({ attCode: code })
                    if (res?.error === false) {
                        alert('Your attendence is marked')
                    }else{
                        alert(res?.message)
                    }
                } else {
                    alert('Cannot recognise the face associated with your account, Please Try Again')
                }
                setLoadForRecognition(false)
            }
        } catch (error) {
            setLoadForRecognition(false)
            alert('something went wrong')
            console.log('Face recognition error', error)
        }
    }

    //  Stops the stream when component is unmounted 
    useEffect(() => {
        return () => {
            stopVideo()
        }
    }, [])

    return (
        <>
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
                            )}
                        </Grid>
                    </Grid>
                </Box>
        </>
    )
}

export default Camera