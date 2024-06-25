export const fetchApi = async (route, options)=>{
    try {
        const res = await fetch(route, options)
        const result = await res.json()
        console.log("fetchApiResult",result)

        if(res.status===200){
            return result;
        }else{
            return result;
        }
    } catch (err) {
        console.log(err)
    }
}

export   const generateFileFromPreview = async (src) => {
    const response = await fetch(src);
    const blobFile = await response.blob();
    const file = new File([blobFile], `image-${Date.now()}.jpeg`, { type: "image/jpeg" });
    return file;
};
