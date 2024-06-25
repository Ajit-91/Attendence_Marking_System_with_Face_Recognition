import * as faceapi from 'face-api.js'


const loadLabeledImages = async (labels) => {
    // fetch data from backend in which label and img url would be there
    try {
        return Promise.all(
            labels.map(async (label) => {
                const descriptions = []
                for (let i = 0; i < 1; i++) {

                    const img = await faceapi.fetchImage(label?.images[i]) // put img url here
                    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                    console.log({ detections })
                    if (detections) {
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

export const warmupModel = async () => {
    const url = "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600"
    const img = await faceapi.fetchImage(url)
    const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
    console.log("Models warmed up", detection)
}

export const recognizeFaces = async (image, canvas, labels) => {
    console.log('working please wait')
    try {
        const labeledDescriptors = await loadLabeledImages(labels)
        console.log('finished loading descriptors')
        console.log({ labeledDescriptors })
        const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.7)

        canvas.innerHtml = faceapi.createCanvasFromMedia(image)

        const displaySize = { width: image.width, height: image.height }
        faceapi.matchDimensions(canvas, displaySize)

        const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

        const results = resizedDetections.map((d) => {
            return faceMatcher.findBestMatch(d.descriptor)
        })

        results.forEach((result, i) => {
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

export const drawLabeledRect = (image, canvas, detection, label) => {
    canvas.innerHtml = faceapi.createCanvasFromMedia(image)

    const displaySize = { width: image.width, height: image.height }
    faceapi.matchDimensions(canvas, displaySize)

    // const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
    const resizedDetection = faceapi.resizeResults(detection, displaySize)
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image, 0, 0, image.width, image.height)
    console.log("resizing detection", resizedDetection)

    const box = resizedDetection.detection.box
    const drawBox = new faceapi.draw.DrawBox(box, { label: label })
    drawBox.draw(canvas)

    console.log('finished')
}

export const detectFace = async (image, canvas, label) => {
    // try {
    const detections = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor()
    console.log(detections)
    if (!detections) throw new Error('No face detected')
    if (canvas) {
        drawLabeledRect(image, canvas, detections, label)
    }
    return detections
    // return Array.from(detections.descriptor)
    // } catch (error) {
    //     console.log('detect single face error', error)
    //     throw error
    // }
}


// -------------------------Useful--------------------------------------
export const drawLabeledBox = (image, canvas, box, label) => {

    canvas.width = image.width;
    canvas.height = image.height;

    const ctx = canvas.getContext('2d');
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.drawImage(image, 0, 0, image.width, image.height);

    // Draw the rectangle
    console.log({x: image.x, y: image.y})
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.strokeRect(box.x, box.y, box.width, box.height);

    if(!label) return
    // Set font for consistent text measurements
    ctx.font = '16px Arial';
    const padding = 4; // Padding for the label background
    const textWidth = ctx.measureText(label).width + padding * 2;
    const textHeight = 16 + padding * 2; // Approximate height based on font size + padding

    // Draw the label background
    ctx.fillStyle = 'blue';
    ctx.fillRect(box.x, box.y - textHeight, textWidth, textHeight);

    // Draw the label text
    ctx.fillStyle = 'white';
    ctx.fillText(label, box.x + padding, box.y - (padding * 2));

    console.log('finished');
}

