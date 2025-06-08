import React, { useState } from 'react'

export default function Switch({task, setTask , taskAttribute, labelText}) {
  const [isChecked, setIsChecked] = useState(task[taskAttribute]);

  const handleToggle = async () => {
      setIsChecked(!isChecked);
      setTask((prev) => {
          return {...prev, [taskAttribute]: isChecked }
      })
  }  

  return (
    <>          
        <div size="sm" className="input-group mb-3">
            <label className="caption-label">{labelText}:</label>
            <Form.Check
              type="switch"  
              checked={isChecked}
              onChange={handleToggle}
            />                           
        </div>  
    </>
  )
}

