import * as faceapi from 'face-api.js'


const loadLabeledImages = (labels) => {
    // fetch data from backend in which label and img url would be there
    return Promise.all(
        labels.map(async (label)=>{
            const descriptions = []
                for(let i = 0; i < 2; i++){
                    
                    const img = await faceapi.fetchImage(label?.images[i]) // put img url here
                    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                    console.log({detections})
                    descriptions.push(detections.descriptor)
                }

            return new faceapi.LabeledFaceDescriptors(label?.name, descriptions)
        })
    )
}

export const recognizeFaces = async (image, canvas, labels) => {

    const labeledDescriptors = await loadLabeledImages(labels)
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.7)
    
        canvas.innerHtml = faceapi.createCanvasFromMedia(image)

        const displaySize = { width : image.width, height: image.height }
        faceapi.matchDimensions(canvas, displaySize)

            const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
            const resizedDetections = faceapi.resizeResults(detections, displaySize)
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

            const results = resizedDetections.map((d) => {
                return faceMatcher.findBestMatch(d.descriptor)
            })

            results.forEach( (result, i) => {
                const box = resizedDetections[i].detection.box
                const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
                drawBox.draw(canvas)
            })

        return results
}