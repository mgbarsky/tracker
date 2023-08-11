import React from 'react'
import { Link } from 'react-router-dom';
import { useState , useEffect } from 'react'
import { TaskRecord, MetricRecord } from '../objects/record.js';
import { CurrentTime } from '../components/CurrentTime';

export default function Schedule({ tasks, metrics, records, setRecords, metricRecords, setMetricRecords  }) {
  const [currentMetric, setCurrentMetric] = useState({})
 
  function canStart(taskID){
    var trs = records.filter((element) => element.taskID === taskID)
    for (var i=0; i<trs.length; i++){
      if (trs[i].taskID === taskID && trs[i].inProgress == true)
        return false;
    }
    return true;
  }

  function TaskRow({ task }) {    
    if(canStart(task.id))
      return (<button  className="form-control" onClick={() => recordTask(task.id)}>{task.title}</button>) ;
    //tr in progress 
    return (<button  className="form-control" onClick={() => recordTask(task.id)}>{task.title}+</button>); 
  }

  function recordTask(taskID){
    console.log("Clicked", taskID)
    var tr = records.find((element) => (element.taskID === taskID && element.inProgress == true))
    console.log("found?", tr) 
    if (tr == undefined){
      var t = new TaskRecord(taskID);
     
      console.log("new t", t)
      
      setRecords((prev) => {      
        return [...prev, t]
      })  

    } else { 
      const nextRecords = records.map((c, i) => {
        if (c.taskID === taskID) {
          // update to a new updated record
          c.end = new Date();
          c.inProgress = false;
          return c;
        } else {
          // The rest haven't changed
          return c;
        }
      });       
      setRecords(nextRecords)               
      console.log("RECORDS", records)
    }
   
    
  }

  function showScale(metricID){
    var mr = metrics.find((element) => (element.id === metricID));
    console.log("min:",mr.min, "max:", mr.max, "step:", mr.step);
    setCurrentMetric(mr);
  }

  function updateMetric(){

  }

  return (
    <>
      <ul className="nav bg-primary">
        <li className="nav-item">
        <Link className="nav-link text-white" to="/tasks">
          Tasks
        </Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link text-white" to="/metrics">
          Metrics
        </Link>
        </li>
      </ul>
      <CurrentTime/>
      <div className="horizontalBar">
        {
          metrics.map((obj) => (
              <span key={obj.id}>
                  <button  onClick={() => showScale(obj.id)}>{obj.title}</button> 
              </span>
          ))
        }
      </div>
      <div className="slidecontainer">
        <input type="range" className="form-range" min="-10" max="10" step="1" value="0" onChange={() => updateMetric()}/>
      </div>
      <div>
      {
            tasks.map((obj) => (
                <div className="input-group" key={obj.id}>
                   <TaskRow 
                      task={obj} 
                    />
                </div>
            ))
      }
      </div>       
    </>
  )
}
