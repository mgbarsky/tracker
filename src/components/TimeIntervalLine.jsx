import React, { useState } from 'react'
import { CTimeInterval } from "../objects/utils.js"

/*
This line contains units of duration, which are the static field of CTimeInterval object
*/

export default function TimeIntervalLine({ task, setTask , taskAttribute, labelText}) {
    const [currentValue, setCurrentValue] = useState('');
    const [currentUnit, setCurrentUnit] = useState(0);

    var units = CTimeInterval.units

    const updateValue = async (val) => {
        setCurrentValue(val)        
        setTask((prev) => {
            var prevObj = prev[taskAttribute]
            var newInterval = new CTimeInterval(val, prevObj.units)           
            return {...prev, [taskAttribute]: newInterval }
        })      
    }
   
    const updateUnit= async (e) => {
        var idx = e.target.value
        setCurrentUnit(idx)        
        setTask((prev) => {
            var prevObj = prev[taskAttribute]
            var newInterval = new CTimeInterval(prevObj.value, idx)           
            return {...prev, [taskAttribute]: newInterval }
        })      
    }

    return (
        <>          
            <div size="sm" className="input-group mb-3">
                <label className="caption-label">{labelText}:</label>
                <input
                    onChange={(e) => updateValue(e.target.value)}
                    type="text" 
                    className="form-control"
                    value={currentValue}
                />
                <select onChange={updateUnit}>      
                    {units.map((unit) => <option key={unit.id} value={unit.id}>{unit.label}</option>)}
                </select>                
            </div>  
        </>
    )
}