import React, { useState } from 'react'

import TimePicker from './TimePicker';

/*
    [
        {id: 1, caption: book},

    ]
*/

export default function DateTimeLine({ task, setTask , dateAttribute, timeAttribute, dateLabel, timeLabel}) {   
   
    return (
        <>          
            <div size="sm" className="input-group mb-3">
                <label className="caption-label">{dateLabel}::&nbsp;</label>
                <TimePicker task={task} setTask={setTask} taskAttribute={timeAttribute}/>
                <label>{timeLabel}:&nbsp;</label>
                <TimePicker task={task} setTask={setTask} taskAttribute={timeAttribute}/>              
            </div>  
        </>
    )
}
