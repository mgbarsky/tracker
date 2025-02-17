import React, { useState, useEffect } from 'react'

export  function CurrentTime(){
    var [date,setDate] = useState(new Date());  

    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 10000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });  

    return (
        <>
            <h1>{date.toLocaleDateString()}</h1> 
            <h3>{date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</h3>
       </>
    )
}