import { fetchApi } from "../utils/fetchApi"

export const registerStudent = async (body) => {
    const route = '/api/admin/register-student'
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    }

    return await fetchApi(route, options)
}
export const generateAttCode = async (body) => {
    const route = '/api/admin/generate-attendence-code'
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    }

    return await fetchApi(route, options)
}

export const getAllAttCodes = async () => {
    const route = '/api/admin/get-all-attendence-codes'
    const options = {
        method: "GET",
        headers: {
            authorization: `token ${localStorage.getItem('token')}`
        }
    }
    return await fetchApi(route, options)
}

export const getAttndenceHistory = async () => {
    const route = '/api/admin/get-attendence-history'
    const options = {
        method: "GET",
        headers: {
            authorization: `token ${localStorage.getItem('token')}`
        }
    }
    return await fetchApi(route, options)
}

export const makeAnnouncement = async (body) => {
    const route = '/api/admin/make-announcement'
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    }

    return await fetchApi(route, options)
}