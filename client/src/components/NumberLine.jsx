import React, { useState } from 'react'


export default function NumberLine({ task, setTask , taskAttribute, labelText}) {
    const [currentInput, setCurrentInput] = useState(task[taskAttribute]);

    const updateAttribute = async (val) => {
        setCurrentInput(val)
        setTask((prev) => {
            return {...prev, [taskAttribute]: val }
        })
    }
   

    return (         
        <div>
            <label>{labelText}</label>
            <input 
                type='number' 
                onChange={(e) => updateAttribute(e.target.value)}
                value={currentInput}
            />
        </div>  
    )
}


