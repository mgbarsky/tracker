import React, { useState } from 'react'

import { CDate } from "../objects/utils.js"


/*
    [
        {id: 1, caption: book},

    ]
*/

export default function DatePicker({ task, setTask , taskAttribute}) {
    var today = new Date() 
    var m =  (today.getMonth()+1)+""  
    const [currentDate, setCurrentDate] = useState(today.getFullYear()+"-"+m.padStart(2, '0')+"-"+today.getDate())  //change to pass the task's date
   
    const updateDate = async (val) => {
        setCurrentDate(val)
        console.log("updated date", val)
        const ymd = val.split("-");
        setTask((prev) => {          
            var newDate = new CDate(ymd[0], ymd[1], ymd[2])
            console.log("updated date in cdate object", newDate)
            return {...prev, [taskAttribute]: newDate }
        })
    }   

    return (
        <>         
            <input
                onChange={(e) => updateDate(e.target.value)}
                type="date" 
                className="form-control"
                value={currentDate}
            />    
        </>
    )
}