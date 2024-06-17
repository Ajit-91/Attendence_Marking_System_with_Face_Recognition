const canvas = require('canvas');
const faceapi = require('face-api.js');
const path = require('path');
const User = require('../models/User');

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




module.exports = {
    loadModels,
    faceMatcher,
    prepareFaceMatcher,
    updateFaceMatcher,
    recogniseFace,
    recogniseFaceTest,
}