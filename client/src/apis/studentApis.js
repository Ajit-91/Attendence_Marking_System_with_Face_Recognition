import { fetchApi } from "../utils/fetchApi"

export const getFaceRecognitionInfo = async () => {
    const route = '/api/student/get-face-recognition-info'
    const options = {
        method: "GET",
        headers: { 
            authorization : `token ${localStorage.getItem('token')}`
         },
    }

    return await fetchApi(route, options)
}