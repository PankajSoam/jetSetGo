import {useEffect, useState} from 'react'
import useFetch from '../../utils/useFetch'


function FlightList(){

    const [flightData, setData]= useState(null)
    const { data, loading, error } = useFetch('https://api.npoint.io/4829d4ab0e96bfab50e7')


    useEffect(()=>{
        if(data)setData(data.data.result)
        
    },[data])
    
    return (<div>
        {
            flightData?.map((element)=>{
                return <div> {element.fare}</div>
            })
        }
    </div>)
}
export default FlightList