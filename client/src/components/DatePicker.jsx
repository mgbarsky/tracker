import React, { useState } from 'react'

import { CDate } from "../objects/utils.js"


/*
    [
        {id: 1, caption: book},

    ]
*/

export default function DatePicker({ task, setTask , taskAttribute}) {
    let date = task[taskAttribute]
    const [currentDate, setCurrentDate] = useState(task[taskAttribute].date)  //change to pass the task's date
   
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