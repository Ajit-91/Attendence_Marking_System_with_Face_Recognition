import * as faceapi from 'face-api.js'


const loadLabeledImages = (labels) => {
    // fetch data from backend in which label and img url would be there
    return Promise.all(
        labels.map(async (label)=>{
            const descriptions = []
                console.log('label inside labels', label)
                const img = await faceapi.fetchImage(label?.image) // put img url here
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                console.log({detections})
                descriptions.push(detections.descriptor)

            return new faceapi.LabeledFaceDescriptors(label?.name, descriptions)
        })
    )
}

export const recognizeFaces = async (webcam, canvas, labels) => {

    const labeledDescriptors = await loadLabeledImages(labels)
    console.log('labeledDescriptors', labeledDescriptors)
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.7)
    
    webcam.video.addEventListener('play', async () => {
        console.log('Playing')
        canvas.innerHtml = faceapi.createCanvasFromMedia(webcam.video)

        const displaySize = { width: webcam.video.width, height: webcam.video.height }
        faceapi.matchDimensions(canvas, displaySize)

        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(webcam.video).withFaceLandmarks().withFaceDescriptors()
            const resizedDetections = faceapi.resizeResults(detections, displaySize)
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

            const results = resizedDetections.map((d) => {
                return faceMatcher.findBestMatch(d.descriptor)
            })
            // console.log({results})
            results.forEach( (result, i) => {
                const box = resizedDetections[i].detection.box
                const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
                drawBox.draw(canvas)
            })
        }, 100)
    })
}