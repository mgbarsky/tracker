import React, { useState } from 'react'

import { Time } from "../objects/utils.js"


/*
    [
        {id: 1, caption: book},

    ]
*/

export default function TimePicker({ task, setTask , taskAttribute}) {
    const [currentHour, setCurrentHour] = useState(0);  //change to pass the task's time
    const [currentMinute, setCurrentMinute] = useState(0);
    
    const updateHour = async (val) => {
        setCurrentHour(val)
        console.log("updated hour", val)
        setTask((prev) => {
            var prevTime = prev[taskAttribute]
            var newTime = new Time(val, prevTime.minute)
            console.log("updated hour in time object", newTime)
            return {...prev, [taskAttribute]: newTime }
        })
    }

    const updateMinute = async (val) => {
        setCurrentMinute(val)
        setTask((prev) => {
            var prevTime = prev[taskAttribute]
            var newTime = new Time(prevTime.hour, val)
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
