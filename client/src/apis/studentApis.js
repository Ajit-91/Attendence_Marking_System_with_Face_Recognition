import { fetchApi } from "../utils/fetchApi"

export const getFaceRecognitionInfo = async () => {
    const route = '/api/student/get-face-recognition-info'
    const options = {
        method: "GET",
        headers: { 
            // authorization : `token ${localStorage.getItem('token')}`
            authorization : `token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhiZDVhOGFlMzQxZDVjOWNmNTg5N2MiLCJpYXQiOjE2NTM0NjU0NDUsImV4cCI6MzMwNzUzNTY5MH0.wABvjrodrC1MLCzANsCDGNpMtpdv_AwQcO_FokDjlbs`
         },
    }

    return await fetchApi(route, options)
}
