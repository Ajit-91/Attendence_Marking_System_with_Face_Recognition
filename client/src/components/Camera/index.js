import React, { useEffect, useRef, useState } from 'react'
import Webcam from "react-webcam";
import * as faceapi from 'face-api.js'
import "../../assets/styles/webcam.css"
import { Button } from '@mui/material';
import Loading from '../../components/Loading'
import { recognizeFaces } from '../../utils/faceRecognition';

const Camera = ({ labels }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const videoWidth = 480
    const videoHeight = 360
    const MODELS_URI = '/models'
    const [localStream, setLocalStream] = useState()
    const [loading, setLoading] = useState(true)
    const [showVideo, setShowVideo] = useState(false)
    console.log({ webcam: videoRef.current })

    const startVideo = async () => {
        // try {
        //     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        //     videoRef.current.srcObject = stream
        //     // setLocalStream(stream)
        // } catch (error) {
        //     console.log('Video starting error', error)
        // }
        setShowVideo(true)
    }

    useEffect(() => {
        console.log('video starting')
        let userStream
        Promise.all([
            faceapi.nets.faceLandmark68Net.loadFromUri(MODELS_URI),
            faceapi.nets.faceRecognitionNet.loadFromUri(MODELS_URI),
            faceapi.nets.ssdMobilenetv1.loadFromUri(MODELS_URI),
        ]).then(() => {
            console.log('models loaded')
            setLoading(false)
            startVideo()
            userStream = videoRef.current
        }).catch(err => {
            console.log('models loading error', err)
        })

        return () => {
            console.log("stopping camera", userStream)
            if ( userStream) {
                console.log('inside return ')
                // const videoTrack = localStream.getTracks().find(track => track.kind === 'video');
                // if (videoTrack.enabled) {
                //     videoTrack.enabled = false;
                // }
                let stream = userStream.stream;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                setShowVideo(false);
            }
        }
    }, [])

    useEffect(() => {
        if(!loading){
            console.log({ len: labels.length })
            if (videoRef.current && labels.length > 0) {
                recognizeFaces(videoRef.current, canvasRef.current, labels)
            }
        }
    }, [loading, labels])


    // useEffect(() => {
    //     return () => {
    //         if (localStream) {
    //             console.log("stopping camera")
    //             // const videoTrack = localStream.getTracks().find(track => track.kind === 'video');
    //             // if (videoTrack.enabled) {
    //             //     videoTrack.enabled = false;
    //             // }
    //             localStream.getTracks().forEach((track) => track.stop());
    //         }
    //     }
    // }, [videoRef])


    // const handleVideoPlay = () => {
    //     console.log('play called')
    //     console.log('ref', videoRef)
    //     if (
    //         // typeof videoRef.current !== "undefined" &&
    //         // navigator.mediaDevices.getUserMedia
    //         // videoRef.current.video.readyState === 4
    //         videoRef.current
    //     ) {
    //         console.log('inside play called')

    //         canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current)
    //         const displaySize = { width: videoWidth, height: videoHeight }
    //         faceapi.matchDimensions(canvasRef.current, displaySize)
    //         const interval = setInterval(async () => {
    //             const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
    //                 .withFaceLandmarks()
    //                 .withFaceExpressions()
    //             console.log(detections)
    //             const resizedDetections = faceapi.resizeResults(detections, displaySize)
    //             canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    //             faceapi.draw.drawDetections(canvasRef.current, resizedDetections)
    //             faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections)
    //             faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections)
    //         }, 100)

    //         setIntervalId(interval)
    //     }
    // }

    return (
        <>
            {loading ? <Loading /> : (
                <div style={{ position: 'relative', width: videoWidth, height: videoHeight, zIndex : 1 }}>
                    {showVideo && (
                        <>
                            <Webcam style={{zIndex : 2, position : 'relative', width : '100%', height : '100%'}} ref={videoRef} muted  autoPlay />
                            {/* <video ref={videoRef} autoPlay muted width={'100%'} height={'100%'} style={{zIndex : 2, position : 'relative'}} ></video> */}
                            <canvas ref={canvasRef} style={{ position: 'absolute', left: 0, top: 0, zIndex : 3 }} ></canvas>
                        </>
                    )}
                </div>
            )}
        </>
    )
}

export default Camera