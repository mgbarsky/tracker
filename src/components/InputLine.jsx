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
            <div size="sm" className="input-group mb-3">
                <label className="caption-label">{labelText}:</label>
                <input
                    onChange={(e) => updateAttribute(e.target.value)}
                    type="text" 
                    className="form-control"
                    value={currentInput}
                />                
            </div>  
        </>
    )
}
