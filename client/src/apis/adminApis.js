import { fetchApi } from "../utils/fetchApi"

export const registerStudent = async (body) => {
    const route = '/api/admin/register-student'
    const options = {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            authorization : `token ${localStorage.getItem('token')}`
         },
        body: JSON.stringify(body)
    }

    return await fetchApi(route, options)
}