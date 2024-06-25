import { Button, Grid, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import Webcam from 'react-webcam'
// import ImgCard from '../../../../components/ImageCard'
// import { register } from '../../../../apis/commonApis';
// import { uploadFiles } from '../../../../utils/uploadFiles'
import Loading from '../../../../components/Loading';
import { SET_USER } from '../../../../redux/slices/userSlice';
import { selectFormDetails } from '../../../../redux/slices/formSlice';
import { drawLabeledBox } from '../../../../utils/faceRecognition';
import { registerStudent } from '../../../../apis/studentApis';
import "../../../../assets/styles/imgCard.css"

const Step2 = () => {
    const [image, setImage] = useState(null)
    const videoRef = useRef(null)
    const imgRef = useRef(null)
    const canvasRef = useRef(null)
    const [turnVideo, setTurnVideo] = useState(false)
    const [previewImage, setPreviewImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const step1RegisterDetails = useSelector(selectFormDetails)

    const capture = useCallback(async () => {
        const imageSrc = videoRef.current.getScreenshot();
        //  converting  data url to file so that we can upload on s3
        let file = await fetch(imageSrc)
            .then(r => r.blob())
            .then(blobFile => {
                return new File([blobFile], `image-${Date.now()}.jpeg`, { type: "image/jpeg" })
            })

        // setPreviewImages(prev => [...prev, imageSrc]);
        // setImage(prev => [...prev, file])
        setPreviewImage(imageSrc);
        setImage(file)
    }, [videoRef, setPreviewImage, setImage]);

    const removeImage = () => {
        setPreviewImage(null)
        setImage(null)
    }
    // const removeImage = (index) => {
    //     let filteredImages = previewImage.filter((_, i) => index !== i)
    //     let filteredFiles = images.filter((_, i) => index !== i)
    //     setPreviewImage(filteredImages)
    //     setImage(filteredFiles)
    // }

    const handleSubmit = async () => {
        try {
            console.log("submitting register form")
            if(!image) return alert('Please capture your image')
            setLoading(true)
            let body = {
                ...step1RegisterDetails,
                image
            }

            const formdata = new FormData()
            for(let key in body){
                formdata.append(key, body[key])
            }
            // const { descriptor } = await detectFace(imgRef.current, canvasRef.current)
            // const faceDescriptor = Array.from(descriptor)
            // console.log({ faceDescriptor })
            // const uploadedImages = await uploadFiles(images)
            // body = { ...body, }
            const resp = await registerStudent(formdata)
            console.log({ registerResp: resp })
            if (resp?.error) throw new Error(resp?.message || 'Something went wrong')
            const {box} = resp.data
            drawLabeledBox(imgRef.current, canvasRef.current, box)
            dispatch(SET_USER(resp?.data))

        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }
    // const handleSubmit = async () => {
    //     try {
    //         console.log("submitting register form")
    //         setLoading(true)
    //         let body = step1RegisterDetails
    //         const { descriptor } = await detectFace(imgRef.current, canvasRef.current)
    //         const faceDescriptor = Array.from(descriptor)
    //         console.log({ faceDescriptor })
    //         const uploadedImages = await uploadFiles(images)
    //         body = { ...body, faceDescriptor, images: uploadedImages, role: 'STUDENT' }
    //         const resp = await register(body)
    //         console.log({ registerResp: resp })
    //         if (resp?.error) throw new Error(resp?.message || 'Something went wrong')
    //         dispatch(SET_USER(resp?.data))

    //     } catch (error) {
    //         alert(error.message)
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    return (
        <>
            {loading && <Loading />}
            <Paper elevation={5} component={Box} p={4}>

                <Grid container spacing={2} >
                    <Grid item xs={12} md={6} lg={6}>
                        {turnVideo ? (
                            <Webcam
                                style={{ width: '100%' }}
                                ref={videoRef}
                                muted
                                screenshotFormat="image/jpeg"
                                autoPlay
                            />
                        ) : (
                            <Box width='100%' height='50vh' sx={{ display: 'grid', placeItems: 'center', border: '2px dashed #9c27b0' }}>
                                <Typography color='primary' align='center' variant='h5'>Please Turn On your camera</Typography>
                            </Box>
                        )}
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        {previewImage && (
                            <div className='imgCard'>
                                <CancelRoundedIcon className='cross' onClick={() => removeImage()} color='primary' />
                                <img
                                    src={previewImage}
                                    alt="category"
                                    ref={imgRef}
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
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100%', height: '100%', marginTop: '40px' }}>
                    <Typography
                        variant='h5'
                        color='primary'
                        fontWeight={'medium'}
                        align='center'
                        display='block'
                    >Please Capture your image. This image will be used to recognise you for marking your attendence
                    </Typography>
                    <Typography align='center' sx={{ mt: 4 }}>
                        {turnVideo && (
                            <Button
                                variant='contained'
                                color='primary'
                                sx={{ mr: 3 }}
                                disabled={image !== null}
                                onClick={capture}
                            >Capture
                            </Button>
                        )}
                        <Button
                            color='primary'
                            variant='contained'
                            onClick={() => setTurnVideo(prev => !prev)}
                        >{turnVideo ? 'Turn off Camera' : 'Turn On Camera'}
                        </Button>
                    </Typography>
                </div>


                <Button
                    variant='contained'
                    disabled={image === null}
                    sx={{ my: 5, ml: 'auto', display: 'block' }}
                    onClick={handleSubmit}
                >Submit
                </Button>
            </Paper>

        </>
    )
}

export default Step2