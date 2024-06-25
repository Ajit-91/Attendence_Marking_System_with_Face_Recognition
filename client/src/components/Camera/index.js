import React, { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from "react-webcam";
import "../../assets/styles/webcam.css"
import { Box, Button, Grid } from '@mui/material';
import Loading from '../../components/Loading'
import { drawLabeledBox } from '../../utils/faceRecognition';
// import { useSelector } from 'react-redux'
// import { selectUser } from '../../redux/slices/userSlice'
import { markAttendence } from '../../apis/studentApis';
import { generateFileFromPreview } from '../../utils/fetchApi';

const Camera = ({ code }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [loadForRecognition, setLoadForRecognition] = useState(false)
    const [previewImage, setPreviewImage] = useState(null);
    const imageRef = useRef(null)
    // const user = useSelector(selectUser)

    //  function the capture the screenshot
    const capture = useCallback(() => {
        const imageSrc = videoRef.current.getScreenshot();
        setPreviewImage(imageSrc);
    }, [videoRef, setPreviewImage]);

    const stopVideo = useCallback(() => {
        if (videoRef.current) {
            let stream = videoRef?.current?.stream;
            const tracks = stream?.getTracks();
            tracks?.forEach(track => track?.stop());
        }
    }, [videoRef])

    //  main function to mark the attendence
    // const markMyAttendence = async () => {
    //     try {
    //         if (previewImage && imageRef) {
    //             setLoadForRecognition(true) // set the loading to  true
    //             const res = await recognizeFaces(imageRef.current, canvasRef.current, labels)
    //             console.log({ recogRes: res })

    //             const found = res.find((match) => match.label === user?.name)
    //             // if the result label of the face recognition is same as the user name who has logged in currently then only attendence is marked
    //             let msg;
    //             if (found) {
    //                 const res = await markAttendence({ attCode: code })
    //                 if (res?.error === false) {
    //                     // alert('Your attendence is marked')
    //                     msg = 'Your attendence is marked';
    //                 } else {
    //                     // alert(res?.message)
    //                     msg = res?.message;
    //                 }
    //             } else {
    //                 // alert('Cannot recognise the face associated with your account, Please Try Again')
    //                 msg = 'Cannot recognise the face associated with your account, Please Try Again';
    //             }
    //             setLoadForRecognition(false)
    //             setTimeout(() => {
    //                 alert(msg)
    //             }, 1000)
    //         }
    //     } catch (error) {
    //         setLoadForRecognition(false)
    //         alert('something went wrong')
    //         console.log('Face recognition error', error)
    //     }
    // }


    const markAttendanceV2 = async () => {
        try {
            if (previewImage && imageRef) {
                setLoadForRecognition(true)
                const file = await generateFileFromPreview(previewImage);
                const formData = new FormData()
                formData.append('attCode', code);
                formData.append('image', file);

                const res = await markAttendence(formData)
                if (res?.error === false) {
                    const { box, resultLabel } = res.data
                    drawLabeledBox(imageRef.current, canvasRef.current, box, resultLabel)
                    alert('Your attendence is marked')
                } else {
                    alert(res?.message)
                }
            }
        } catch (error) {
            console.log('Face recognition error', error)
            alert(error.message || 'Could not recognize the face, Please ensure your face is visible and try again')
        } finally {
            setLoadForRecognition(false)
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
                        {previewImage && (
                            <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 1 }}>
                                <img
                                    src={previewImage}
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
                                    onClick={markAttendanceV2}
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