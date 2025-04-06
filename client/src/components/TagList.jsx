import React, { useState } from 'react'

/*
    [
        {id: 1, caption: book},

    ]
*/

export default function TagList({ task, setTask, taskTags }) {

    return (
        <>
        <div className="row"><label>Tags:</label>
            <ul className='menulist'>            
               {taskTags.map((obj) => (
                <li key={obj.id}> {obj.title}</li>  
                ))}    
            </ul>
        </div>	         
        </>
    )
}
