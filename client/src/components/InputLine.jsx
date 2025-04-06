import React, { useState } from 'react'

export default function InputLine({ task, setTask , taskAttribute, labelText}) {
    const [currentInput, setCurrentInput] = useState(task[taskAttribute]);

    const updateAttribute = async (val) => {
        setCurrentInput(val)
        setTask((prev) => {
            return {...prev, [taskAttribute]: val }
        })
    }
   

    return (
        <>          
            <div className="row">
                <label>{labelText}:</label>
                <input
                    onChange={(e) => updateAttribute(e.target.value)}
                    type="text"                     
                    value={currentInput}
                />                
            </div>  
        </>
    )
}
