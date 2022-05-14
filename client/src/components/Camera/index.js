import React, { useEffect, useRef } from 'react'
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawRect } from '../../utils/drawing';
import "../../assets/styles/webcam.css"

const Camera = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const detect = async (net) => {
        // Checking if data is available then performing detections
        console.log('webRef', webcamRef)
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            // Get Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            // Set canvas height and width
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            // Make Detections
            const obj = await net.detect(video);
            console.log(obj)
            // Drawing the rectangles around object
            const ctx = canvasRef.current.getContext("2d");
            drawRect(obj, ctx);
        }
    };

    useEffect(() => {
        const runCoco = async () => {
            const net = await cocossd.load();
            //  Detecting objects after every 10ms
            setInterval(() => {
                detect(net);
            }, 10);
        };
        runCoco()
    }, [])

    return (
        <>
            <Webcam
                ref={webcamRef}
                muted={true}
                className='webcam'
            />

            <canvas
                ref={canvasRef}
                className='webcam'
            />
        </>
    )
}

export default Camera