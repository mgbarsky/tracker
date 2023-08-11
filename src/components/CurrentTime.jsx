import React, { useState, useEffect } from 'react'

export  function CurrentTime(){
    var [date,setDate] = useState(new Date());  

    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });  

    return (
        <>
            <h1>{date.toLocaleDateString()}</h1> 
            <h3>{date.toLocaleTimeString()}</h3>
        </>
    )


}