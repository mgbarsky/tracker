import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
/*
    [
        {id: 1, caption: book},

    ]
*/

export default function LabelList() {
    const [captions, setCaptions] = useState([]);
    const [currentCaption, setCurrentCaption] = useState('');

    const addCaption = async () => {
        setCaptions((prev) => {
            if (currentCaption && currentCaption !=''){
                const newCaption = {id: window.crypto.randomUUID(), caption: currentCaption}
                console.log("prev", prev)
                console.log("current", currentCaption)
                setCurrentCaption('')
                return [...prev, newCaption]
            }
            else{
                return prev
            }
        })
    }

    const removeCaption = (id) => {
        setCaptions((prev) => {
            return prev.filter((captionObj) => captionObj.id !== id)
        })
    }

    return (
        <>
            {
                captions.map((captionObj) => (
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
