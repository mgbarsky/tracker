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
            <div size="sm" className="input-group mb-3">
            <label className="caption-label">&nbsp;</label>  
                {
                    task.tags.map((tagObj) => (
                        <div key={tagObj.id}>                            
                              
                            <span size="sm" className="tagbadge">{tagObj.caption} </span>                            
                            <button                                 
                                className="closebutton"                                
                                onClick={() => removeTag(tagObj.id)}>x
                            </button>                                               
                        </div>
                    ))
                }  
            </div>        
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
