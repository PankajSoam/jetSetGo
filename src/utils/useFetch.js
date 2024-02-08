import { useEffect, useState } from "react";

function useFetch(url){
    const [data,setData]= useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        setLoading(true)
        setData(null)
        setError(null)
        fetch(url).then(res=> res.json()).then((response)=>{
            setData(response)
            setLoading(false)
        })
        .catch((err)=>{
            setLoading(false)
            setError({
                message: "an error occured",
                error: err
        })
        })

    },[url])
    return {data, loading, error}
}
export default useFetch