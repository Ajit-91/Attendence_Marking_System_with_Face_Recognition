export const fetchApi = async (route, options)=>{
    try {
        const res = await fetch(route, options)
        const result = await res.json()

        if(res.status===200){
            return result;
        }else{
            console.log("fetchApiResult",result)
            return result;
        }
    } catch (err) {
        console.log(err)
    }
}