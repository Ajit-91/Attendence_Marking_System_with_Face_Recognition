const canvas = require('canvas');
const faceapi = require('face-api.js');
const path = require('path');
const User = require('../models/User');
// require('@tensorflow/tfjs-node')
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const loadModels = () => {
    const MODEL_URL = path.join(__dirname, '../../client/public/models');
    return Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL)
    ]);
}



// -------------------------------Useful and Real-----------------------
let faceMatcher = null;

const prepareFaceMatcher = async () => {
    const users = await User.find({role: "STUDENT"}).select('+faceDescriptor');
    if(!users.length) return;
    const labeledDescriptors = users.map(user => {
        // console.log({user})

        const label = `${user.name} (${user.enrollmentNo})`
        // console.log({label})

        const descriptorArr = new Float32Array(user.faceDescriptor);

        // console.log(descriptorArr)

        return new faceapi.LabeledFaceDescriptors(label, [descriptorArr]);
    });

    faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.7);
}


const updateFaceMatcher = async (label, faceDescriptor) => {
    if(!faceMatcher){
       await prepareFaceMatcher()
    }
    // const descriptors = faceDescriptor.map(desc => new Float32Array(desc));
    const descriptors = new Float32Array(faceDescriptor);
    const labeledDescriptor = new faceapi.LabeledFaceDescriptors(label, [descriptors]);
    // faceMatcher.push(labeledDescriptor);
    faceMatcher.labeledDescriptors.push(labeledDescriptor);
}


const recogniseFaceTest = async  () => {
    // console.log("-------------------Recognise-------------------------")
    const user = await User.findOne({enrollmentNo: '0051640322'}).select('+faceDescriptor');
    if(!user) return;
    const queryDescriptor = new Float32Array(user.faceDescriptor);

    const bestMatch = faceMatcher.findBestMatch(queryDescriptor);
    // console.log({bestMatch})

}


const recogniseFace =  (descriptors) => {
    const faceDescriptor = new Float32Array(descriptors);
    // console.log({faceDescriptorLen: faceDescriptor.length, descL: descriptors.length})
    // console.log(faceDescriptor)
    const bestMatch = faceMatcher.findBestMatch(faceDescriptor);
    return bestMatch._label;
}


/*
Euclidean distance is used to measure the similarity between two face descriptors, 
which are essentially high-dimensional vectors representing the features of a face.

How Euclidean Distance Helps in Face Recognition ?
1. Face Descriptor Generation:

    - When a face is detected in an image, a deep learning model generates a face descriptor (a high-dimensional vector) for the face.
    - The descriptor is a numerical representation of the face’s features.

2. Comparing Descriptors:

    - To determine if two faces are of the same person, we compare their face descriptors.
    - The Euclidean distance between two descriptors quantifies how similar the two faces are: the smaller the distance, the more similar the faces.


    euclideanDistance between two descriptors D1 and D2 each consisting of 128 Float32 is calculated as follows
    d(D1, D2) = sqrt((d11 - d21)^2 + (d12 - d22)^2 + ... + (d1128 - d2128)^2)



*/ 

const isFaceMatched = (desc1, desc2) => {

    const D1 = new Float32Array(desc1)
    const D2 = new Float32Array(desc2)

    const distance = faceapi.euclideanDistance(D1, D2);
    const threshold = 0.5
    console.log({euclideanDistance : distance})
    return distance < threshold;
}




module.exports = {
    loadModels,
    faceMatcher,
    prepareFaceMatcher,
    updateFaceMatcher,
    recogniseFace,
    recogniseFaceTest,
    isFaceMatched
}