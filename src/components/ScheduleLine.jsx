import React, { useState } from 'react'


export default function ScheduleLine({ records, task}) {
    //const [currentInput, setCurrentInput] = useState(task[taskAttribute]);

     //this checks if the task is not in progress
    function canStart(taskID){
        var trs = records.filter((element) => element.taskID === taskID)
        for (var i=0; i<trs.length; i++){
        if (trs[i].taskID === taskID && trs[i].inProgress == true)
            return false;
        }
        return true;
    }
    
    
    const updateAttribute = async (val) => {
        setCurrentInput(val)
        setTask((prev) => {
            return {...prev, [taskAttribute]: val }
        })
    }
   

    return (
        <>          
            <div size="sm" className="input-group mb-3">
                <label className="caption-label">{labelText}:</label>
                <input
                    onChange={(e) => updateAttribute(e.target.value)}
                    type="number"                    
                    className="form-control"
                    value={currentInput}
                />                
            </div>  
        </>
    )
}
