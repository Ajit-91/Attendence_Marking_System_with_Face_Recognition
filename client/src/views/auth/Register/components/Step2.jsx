import { Button, Grid, Paper,  Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useCallback,  useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import Webcam from 'react-webcam'
import ImgCard from '../../../../components/ImageCard'
import { register } from '../../../../apis/commonApis';
import { uploadFiles } from '../../../../utils/uploadFiles'
import Loading from '../../../../components/Loading';
import { SET_USER } from '../../../../redux/slices/userSlice';
import { selectFormDetails } from '../../../../redux/slices/formSlice';

const Step2 = () => {
    const [images, setImages] = useState([])
    const videoRef = useRef(null)
    const [turnVideo, setTurnVideo] = useState(false)
    const [previewImages, setPreviewImages] = useState([])
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

        setPreviewImages(prev => [...prev, imageSrc]);
        setImages(prev => [...prev, file])
    }, [videoRef, setPreviewImages, setImages]);

    const removeImage = (index) => {
        let filteredImages = previewImages.filter((_, i) => index !== i)
        let filteredFiles = images.filter((_, i) => index !== i)
        setPreviewImages(filteredImages)
        setImages(filteredFiles)
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            let body = step1RegisterDetails
            const uploadedImages = await uploadFiles(images)
            body = { ...body, images: uploadedImages, role : 'STUDENT' }
    
            const resp = await register(body)
            console.log({registerResp : resp})
            if (resp?.error) throw new Error(resp?.message || 'Something went wrong')
            dispatch(SET_USER(resp?.data))
                        
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

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
                        <Box width='100%' height='100%' sx={{ display: 'grid', placeItems: 'center',  border: '2px dashed #9c27b0' }}>
                            <Typography color='primary' align='center' variant='h5'>Please Turn On your camera</Typography>
                        </Box>
                    )}
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <div  style={{ display: 'flex', justifyContent : 'center', flexDirection : 'column', width : '100%', height : '100%' }}>
                    <Typography 
                        variant='h5' 
                        color='primary'
                        fontWeight={'medium'} 
                        align='center' 
                        display='block' 
                    >Please Capture 4 images. These images will be used to recognise you for marking your attendence
                    </Typography>
                    <Typography align='center' sx={{ mt: 4 }}>
                        {turnVideo && (
                            <Button
                                variant='contained'
                                color='primary'
                                sx={{ mr: 3 }}
                                disabled={images?.length === 4 ? true : false}
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
                </Grid>
            </Grid>

            {previewImages.length > 0 && (
                <Box style={{ border: '2px dashed #9c27b0' }} p={3} mt={3}>
                    <Grid container spacing={2}>
                        {previewImages.map((item, i) => (
                            <Grid item xs={6} md={4} lg={3} key={i}>
                                <ImgCard url={item}>
                                    <CancelRoundedIcon className='cross' onClick={() => removeImage(i)} color='primary' />
                                </ImgCard>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}

            <Button
                variant='contained'
                disabled={(images.length !== 4) ? true : false}
                sx={{ my: 5, ml : 'auto', display: 'block' }}
                onClick={handleSubmit}
            >Submit
            </Button>
            </Paper>

        </>
    )
}

export default Step2