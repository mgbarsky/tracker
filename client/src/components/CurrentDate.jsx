import React, { useState, useEffect } from 'react'

export  function CurrentDate(){
    const [date,setDate] = useState(new Date());  

    //let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

   /*  useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 10000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });   */

    return (
        <>
            {month} {day} 
        </>
    )
}