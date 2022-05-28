import { Button, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {useDispatch} from 'react-redux'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import Webcam from 'react-webcam'
import ImgCard from '../../../components/ImageCard'
import { getEnrollmentNo, register } from '../../../apis/commonApis';
import {uploadFiles, urltoFile} from '../../../utils/uploadFiles'
import Loading from '../../../components/Loading';
import { SET_USER } from '../../../redux/slices/userSlice';

const Register = () => {
    const [images, setImages] = useState([])
    const videoRef = useRef(null)
    const [turnVideo, setTurnVideo] = useState(false)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [enrollmentNo, setEnrollmentNo] = useState('')
    const [previewImages, setPreviewImages] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    
    useEffect(() => {
        const fetchEnrollmentNo = async () => {
            const res = await getEnrollmentNo()
            console.log({enrollRes : res})
            if(res?.error === false){
                setEnrollmentNo(res?.data?.enrollmentNo)
            }
        }
        fetchEnrollmentNo()
    }, [])

    const capture = useCallback(async () => {
        const imageSrc = videoRef.current.getScreenshot();
        //  converting uri to file so that we can upload on s3
        let file = await fetch(imageSrc)
            .then(r => r.blob())
            .then(blobFile => {
                return new File([blobFile], `image-${Date.now()}.jpeg`, { type: "image/jpeg" })
            })

            console.log({file})

            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = ()=>{
                // setPreviewImage(fileReader.result)
                console.log('reading file', fileReader.result)

            }
            fileReader.onerror = (err)=>{
              console.log('file reader error',err)
            }

        setPreviewImages(prev => [...prev, imageSrc]);
        setImages(prev => [...prev, file])
    }, [videoRef, setPreviewImages, setImages]);

    const removeImage = (index) => {
        let filteredImages = previewImages.filter((_, i) => index !== i)
        let filteredFiles =  images.filter((_, i) => index !== i)
        setPreviewImages(filteredImages)
        setImages(filteredFiles)
    }

    const handleSubmit = async () => {
        setLoading(true)
        let body = {
            name, enrollmentNo, password
        }
        const uploadedImages = await uploadFiles(images)
        console.log({uploadedImages})
        body = {...body, images : uploadedImages}

        const resp = await register(body)
        if(resp?.error === false){
            dispatch(SET_USER(resp?.data))
        }
        setLoading(false)        
    }

    return (
        <Box px={5}>
            {loading && <Loading />}
            {turnVideo ? (
                <Webcam
                    style={{ width: '70%', height: '360px', margin: '5px auto', display: 'block' }}
                    ref={videoRef}
                    muted
                    screenshotFormat="image/jpeg"
                    autoPlay
                />
            ) : (
                <Box width='70%' height='360px' mx='auto' my={4} sx={{ display: 'grid', placeItems: 'center' }}>
                    <Typography align='center' variant='h3'>You need to capture 4 images in order to register</Typography>
                </Box>
            )}

            <Typography variant='button' fontWeight={'medium'} align='center' display='block' >Capture 4 images</Typography>
            <Typography align='center' sx={{ my: 4 }}>
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
            {previewImages && (
                <Box style={{ border: '2px dashed #9c27b0' }} p={3}>
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
            <Grid container spacing={5}>
                <Grid item xs={12} md={6} lg={4}>
                    <TextField
                        label='Enrollment No'
                        value={enrollmentNo}
                        helperText='This enrollment no will be used in login'
                        // onChange={(e) => setName(e.target.value)}
                        fullWidth
                        disabled
                        margin='normal'
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <TextField
                        label='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin='normal'
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <TextField
                        label='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin='normal'
                    />
                </Grid>
            </Grid>

            <Button
                variant='contained'
                disabled={(!name || !password || images.length !== 4) ? true : false}
                sx={{ my: 5, mx: 'auto', display: 'block' }}
                onClick={handleSubmit}
            >Submit
            </Button>
        </Box>
    )
}

export default Register