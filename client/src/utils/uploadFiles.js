
import imageCompression from 'browser-image-compression';
import { getUrls, sendToS3 } from '../apis/commonApis';

const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  }

export const uploadFiles = async (files, folder = 'images') => {
    console.log({files})

    try {
        const compressedFile = await imageCompression(files[0], options);
        console.log("filesaf", compressedFile)

        const fileNames = Array.from(files).map((item)=>item?.name)
        if(fileNames){
            const {data} = await getUrls({fileNames, folder})
    
            if(data){
               let respUrls = await Promise.all(data.map(async (url, i)=>{
                    const compressedFile = await imageCompression(files[i], options);
                    await sendToS3(compressedFile, url)
                    return url.split('?')[0]
                }))
                console.log("respurl",respUrls)
                if(respUrls) return respUrls
            }
        }
    } catch (error) {
        console.log("uploadFile",error)
    }

}