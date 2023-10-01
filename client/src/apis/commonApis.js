import { fetchApi } from "../utils/fetchApi"

export const getEnrollmentNo = async () => {
    const route =  '/api/get-enrollment-no'
    const options = {
        method: "GET"
    }
    return await fetchApi(route, options)
}

export const checkIfAlreadyRegistered = async (body) => {
    const route =  '/api/check-if-already-registered'
    const options = {
        method: "POST",
        headers: { 
            "Content-Type" : "application/json",
         },
        body : JSON.stringify(body)
    }
    return await fetchApi(route, options)
}

export const register = async (body) => {
    const route =  '/api/register'
    const options = {
        method: "POST",
        headers: { 
            "Content-Type" : "application/json",
         },
        body : JSON.stringify(body)
    }
    return await fetchApi(route, options)
}

export const login = async (body) => {
    const route =  '/api/login'
    const options = {
        method: "POST",
        headers: { 
            "Content-Type" : "application/json",
         },
        body : JSON.stringify(body)
    }
    return await fetchApi(route, options)
}

export const fetchUser = async () => {
    const route =  '/api/fetch-user'
    const options = {
        method: "GET",
        headers : {
            authorization : `token ${localStorage.getItem('token')}`
        }
    }
    return await fetchApi(route, options)
}


// ------------Image upload to S3-------------------------------------


// export const getUrls = async(body) => {
//     const route = '/api/get-signed-url'
//     const options = {
//         method : "POST",
//          headers : {"Content-Type" : "application/json"},
//         body : JSON.stringify(body)
//     }

//     return await fetchApi(route, options)
// }

// export const sendToS3 = async (file, route) => {
//     const options = {
//         method : "PUT",
//         headers : {"Content-Type" : "image/jpeg"},
//         body : file
//     }
//     try {
//         const res = await fetch(route, options)
//         const result = await res.text()
//         console.log("s3",result)
//         if(res.status===200){
//             return result
//         }
//     } catch (error) {
//         console.log("s3err",error)
//         return error
//     }
   
//     // return await fetchApi(route, options)
// }

// export const deleteImagesFromS3 = async(objects) => {
//     const route = "/api/delete-image-from-s3"
//     const options = {
//         method : "POST",
//          headers : {"Content-Type" : "application/json"},
//         body : JSON.stringify({objects})
//     }

//     return await fetchApi(route, options)
// }

export const getAnnouncements = async () => {
    const route =  '/api/get-announcements'
    const options = {
        method: "GET",
        headers : {
            authorization : `token ${localStorage.getItem('token')}`
        }
    }
    return await fetchApi(route, options)
}