
export const uploadFiles = async (files) => {
    let uploadedUrls = [];
    for (let i = 0; i < files.length; i++) {
        const formData = new FormData();

        formData.append('file', files[i]);
        formData.append('upload_preset', 'FaceRecognition')

        const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData,
        });
        const json = await response.json();
        console.log({uploadedImg : json})
        uploadedUrls.push(json.secure_url);
    }
    return uploadedUrls;
}