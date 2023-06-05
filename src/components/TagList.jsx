import React, { useState } from 'react'



/*
    [
        {id: 1, caption: book},

    ]
*/

export default function TagList({ task, setTask }) {
    const [inputTag, setInputTag] = useState('');

    const addTag = async () => {
        setTask((prev) => {
            if (inputTag && inputTag !=''){
                const newTagObj = {id: window.crypto.randomUUID(), caption: inputTag}
                setInputTag('')
                return {...prev, tags: [...prev.tags, newTagObj] }
            }
            else{
                return prev
            }
        })
    }

    const removeTag = (id) => {
        setTask((prev) => {
            return {...prev, tags:  prev.tags.filter((tagObj) => tagObj.id !== id)}
        })
    }

    return (
        <>
            {
                task.tags.map((tagObj) => (
                    <div size="sm" className="mb-3" key={tagObj.id}>
                        <div size="sm" className="input-group mb-3">
                        <label className="caption-label">&nbsp;</label>    
                        <input type="text" size="sm" className="form-control bg-info" value={tagObj.caption} disabled readOnly/>
                        <button 
                            type="button" 
                            className="btn btn-secondary"
                            onClick={() => removeCaption(tagObj.id)}>x
                        </button>
                        </div>                      
                    </div>
                ))
            }          
            <div size="sm" className="input-group mb-3">
                <label className="caption-label">Tags:</label>
                <input
                    onChange={(e) => setInputTag(e.target.value)}
                    type="text" 
                    className="form-control"
                    value={inputTag}
                /> 
                <button 
                    type="button" 
                    className="btn btn-outline-primary"
                    onClick={addTag}
                >
                    +
                </button>
            </div>  
        </>
    )
}
