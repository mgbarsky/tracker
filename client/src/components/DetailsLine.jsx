import React, { useState } from 'react'


export default function DetailsLine({ task, setTask , taskAttribute, labelText}) {
    const [currentInput, setCurrentInput] = useState(task[taskAttribute]);

    const updateAttribute = async (val) => {
        setCurrentInput(val)
        setTask((prev) => {
            return {...prev, [taskAttribute]: val }
        })
    }
    <textarea className="form-control"></textarea>

    return (
        <>          
            <div className="row">
                <label>{labelText}:</label>
                <textarea
                    onChange={(e) => updateAttribute(e.target.value)} 
                    value={currentInput}
                > 
                </textarea>               
            </div>  
        </>
    )
}
