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
            {currentInput ? (
                <input className='editTitle' value={currentInput} onChange={(e) => updateAttribute(e.target.value)}/>
            ) : (
                <input className='editTitle' value ="" placeholder={labelText} onChange={(e) => updateAttribute(e.target.value)}/>
            )}  
        </>
    )
}
