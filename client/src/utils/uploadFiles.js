import { getUrls, sendToS3 } from '../apis/commonApis';


export const uploadFiles = async (files, folder = 'images') => {
    try {
        const fileNames = Array.from(files).map((item)=>item?.name)
        if(fileNames){
            const {data} = await getUrls({fileNames, folder})
    
            if(data){
               let hostedUrls = await Promise.all(data.map(async (url, i)=>{
                    await sendToS3(files[i], url)
                    return url.split('?')[0]
                }))
                console.log("respurl",hostedUrls)
                if(hostedUrls) return hostedUrls
            }
        }
    } catch (error) {
        console.log("uploadFile",error)
    }

}