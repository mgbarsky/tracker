import React, { useState } from 'react'

import TimePicker from './TimePicker';
import DatePicker from './DatePicker';

/*
    [
        {id: 1, caption: book},

    ]
*/

export default function DateTimeLine({ task, setTask , dateAttribute, timeAttribute, dateLabel, timeLabel}) {   
   
    return (
        <>          
            <div size="sm" className="form-row">
                <div className="form-group col-md-4">
                    <label className="caption-label">{dateLabel}:&nbsp;</label>
                    <DatePicker task={task} setTask={setTask} taskAttribute={dateAttribute}/>
                </div>
                <div className="form-group col-md-4">
                    <label>{timeLabel}:&nbsp;</label>
                    <TimePicker task={task} setTask={setTask} taskAttribute={timeAttribute}/>
                </div>              
            </div>  
        </>
    )
}
