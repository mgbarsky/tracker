import React, { useState } from 'react'


export default function DetailsLine({ task, setTask , taskAttribute, labelText}) {
    const [currentInput, setCurrentInput] = useState(task[taskAttribute]);

    const updateAttribute = async (val) => {
        setCurrentInput(val)
        setTask((prev) => {
            return {...prev, [taskAttribute]: val }
        })
    }
    <textarea class="form-control"></textarea>

    return (
        <>          
            <div size="sm" className="input-group mb-3">
                <label className="caption-label">{labelText}:</label>
                <textarea
                    onChange={(e) => updateAttribute(e.target.value)}                    
                    className="form-control"
                    value={currentInput}
                > 
                </textarea>               
            </div>  
        </>
    )
}
