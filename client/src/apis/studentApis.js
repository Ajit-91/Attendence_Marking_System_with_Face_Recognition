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

export const validateInStep1 = async (body) => {
    const route =  '/api/student/validate-at-first-step'
    const options = {
        method: "POST",
        headers: { 
            "Content-Type" : "application/json",
            authorization : `token ${localStorage.getItem('token')}`
         },
        body : JSON.stringify(body)
    }
    return await fetchApi(route, options)
}

export const markAttendence = async (body) => {
    const route =  '/api/student/mark-attendence'
    const options = {
        method: "POST",
        headers: { 
            "Content-Type" : "application/json",
            authorization : `token ${localStorage.getItem('token')}`
         },
        body : JSON.stringify(body)
    }
    return await fetchApi(route, options)
}

export const getMyAttendence = async () => {
    const route = '/api/student/get-my-attendence'
    const options = {
        method: "GET",
        headers: { 
            authorization : `token ${localStorage.getItem('token')}`
         },
    }
    return await fetchApi(route, options)
}

