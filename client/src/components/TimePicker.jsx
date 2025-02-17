import React, { useState } from 'react'

import { CTime } from "../objects/utils.js"


/*
    [
        {id: 1, caption: book},

    ]
*/

export default function TimePicker({ task, setTask , taskAttribute}) {
    const [currentHour, setCurrentHour] = useState(task[taskAttribute].hour);  //change to pass the task's time
    const [currentMinute, setCurrentMinute] = useState(task[taskAttribute].minute);
    
    const updateHour = async (val) => {
        setCurrentHour(val)
        console.log("updated hour", val)
        setTask((prev) => {
            var prevTime = prev[taskAttribute]
            var newTime = new CTime(val, prevTime.minute)
            console.log("updated hour in time object", newTime)
            return {...prev, [taskAttribute]: newTime }
        })
    }

    const updateMinute = async (val) => {
        setCurrentMinute(val)
        setTask((prev) => {
            var prevTime = prev[taskAttribute]
            var newTime = new CTime(prevTime.hour, val)
            return {...prev, [taskAttribute]: newTime }
        })
    }      

    return (
        <>       
            <input
                    onChange={(e) => updateHour(e.target.value)}
                    type="text" 
                    className="form-control"               
                    value={currentHour}
                />            
            :
            <input
                onChange={(e) => updateMinute(e.target.value)}
                type="text" 
                className="form-control"               
                value={currentMinute}
            />    
        </>
    )
}
