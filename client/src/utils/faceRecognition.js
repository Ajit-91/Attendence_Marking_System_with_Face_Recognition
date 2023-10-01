import * as faceapi from 'face-api.js'


const loadLabeledImages = async (labels) => {
    // fetch data from backend in which label and img url would be there
    try {
        return Promise.all(
            labels.map(async (label)=>{
                const descriptions = []
                    for(let i = 0; i < 1; i++){
                        
                        const img = await faceapi.fetchImage(label?.images[i]) // put img url here
                        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                        console.log({detections})
                        if(detections) {
                            descriptions.push(detections.descriptor)
                        }
                    }
                return new faceapi.LabeledFaceDescriptors(label?.name, descriptions)
            })
        )
    } catch (error) {
        console.log('loading descriptors error', error)
        return error
    }
  
}

export const recognizeFaces = async (image, canvas, labels) => {
    console.log('working please wait')
    try {
        const labeledDescriptors = await loadLabeledImages(labels)
        console.log('finished loading descriptors')
        console.log({labeledDescriptors})
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
                console.log('finished')
            return results
    } catch (error) {
        console.log('Face recognition error', error)
        return error
    }
  
}