import React, { useEffect, useRef } from 'react'
import Webcam from "react-webcam";
import * as faceapi from 'face-api.js'
import "../../assets/styles/webcam.css"
import { Button } from '@mui/material';

const Camera = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const videoWidth = 720
    const videoHeight = 560
    const MODELS_URI = '/models'

    const startVideo = () => {
        navigator.getUserMedia(
            { video: {} },
            stream => videoRef.current.srcObject = stream,
            err => console.error(err)
        )
        console.log('v statrted')
    }

    useEffect(() => {
        console.log('video starting')
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODELS_URI),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODELS_URI),
            faceapi.nets.faceRecognitionNet.loadFromUri(MODELS_URI),
            faceapi.nets.faceExpressionNet.loadFromUri(MODELS_URI)
        ]).then(() => {
            console.log('models loaded')
            startVideo()
        }).catch(err => {
            console.log('video err', err)
        })
    }, [])

    const handleVideoPlay = () => {
        console.log('play called')
        console.log('ref', videoRef)
        if (
            // typeof videoRef.current !== "undefined" &&
            // navigator.mediaDevices.getUserMedia
            // videoRef.current.video.readyState === 4
            videoRef.current
        ) {
            console.log('inside play called')

            canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current)
            const displaySize = { width: videoWidth, height: videoHeight }
            faceapi.matchDimensions(canvasRef.current, displaySize)
            setInterval(async () => {
                const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                    .withFaceLandmarks()
                    .withFaceExpressions()
                console.log(detections)
                const resizedDetections = faceapi.resizeResults(detections, displaySize)
                canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                faceapi.draw.drawDetections(canvasRef.current, resizedDetections)
                faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections)
                faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections)
            }, 100)
        }
    }

    return (
        <>
            <video ref={videoRef} autoPlay muted onPlay={handleVideoPlay} ></video>
            <canvas ref={canvasRef} style={{ position: 'absolute', left : 0, top : 0 }} ></canvas>
        </>
    )
}

export default Camera