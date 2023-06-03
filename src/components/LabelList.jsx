import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
/*
    [
        {id: 1, caption: book},

    ]
*/

export default function LabelList({ task, setTask }) {
    const [currentCaption, setCurrentCaption] = useState('');

    const addCaption = async () => {
        setTask((prev) => {
            if (currentCaption && currentCaption !=''){
                const newCaption = {id: window.crypto.randomUUID(), caption: currentCaption}
                setCurrentCaption('')
                return {...prev, tags: [...prev.tags, newCaption] }
            }
            else{
                return prev
            }
        })
    }

    const removeCaption = (id) => {
        setTask((prev) => {
            return {...prev, tags:  prev.tags.filter((captionObj) => captionObj.id !== id)}
        })
    }

    return (
        <>
            {
                task.tags.map((captionObj) => (
                    <div size="sm" className="mb-3" key={captionObj.id}>
                        <InputGroup size="sm" className="mb-3">
                        <label className="caption-label">&nbsp;</label>    
                        <input type="text" size="sm" className="form-control bg-info" value={captionObj.caption} disabled readOnly/>
                        <button 
                            type="button" 
                            className="btn btn-secondary"
                            onClick={() => removeCaption(captionObj.id)}>x
                        </button>
                        </InputGroup>                      
                    </div>
                ))
            }          
            <InputGroup size="sm" className="mb-3">
                <label className="caption-label">Tags:</label>
                <input
                    onChange={(e) => setCurrentCaption(e.target.value)}
                    type="text" 
                    className="form-control"
                    value={currentCaption}
                /> 
                <button 
                    type="button" 
                    className="btn btn-outline-primary"
                    onClick={addCaption}
                >
                    +
                </button>
            </InputGroup>  
        </>
    )
}
