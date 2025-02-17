import React, { useState } from 'react'

export default function WeekDaySelection({task, setTask}) {
    const [currentInput, setCurrentInput] = useState('');

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
