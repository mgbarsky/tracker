import React from 'react'
import { Link } from 'react-router-dom';
import { useState , useEffect } from 'react'
import { TaskRecord, MetricRecord } from '../objects/record.js';
import { CurrentTime } from '../components/CurrentTime';

export default function Schedule({ tasks, metrics, records, setRecords, metricRecords, setMetricRecords  }) {
  const [currentMetric, setCurrentMetric] = useState(null)
  const [currentLevel, setCurrentLevel] = useState(0);

  useEffect(() => {
    const Bar = document.querySelector('.horizontalBar');
    const handleScrollWheel = (e) => {
      // Called when mouse wheel is scrolled - and this is translated into the horizontal bar
      e.preventDefault();

      console.log(Math.sign(e.deltaY));

      Bar.scrollBy({
        left: 96*Math.sign(e.deltaY),
        behavior: "smooth",
      });
    };

    Bar.addEventListener("wheel", handleScrollWheel);
    return () => {
      Bar.removeEventListener("wheel", handleScrollWheel);
    };
  }, []);

  //this checks if the task is not in progress
  function canStart(taskID){
    var trs = records.filter((element) => element.taskID === taskID)
    for (var i=0; i<trs.length; i++){
      if (trs[i].taskID === taskID && trs[i].inProgress == true)
        return false;
    }
    return true;
  }

  //returns different GUI depending on the state of the task - in progress or idle
  function TaskRow({ task }) {    
    if(canStart(task.id))
      return (<button  className="form-control" onClick={() => recordTask(task.id)}>{task.title}</button>) ;
    //tr in progress 
    return (<button  className="form-control" onClick={() => recordTask(task.id)}>{task.title}+</button>); 
  }

  //adds a task to records: either task started or task finished
  function recordTask(taskID){
    //console.log("Clicked", taskID)
    var tr = records.find((element) => (element.taskID === taskID && element.inProgress == true))
    //console.log("found?", tr) 
    if (tr == undefined){
      var t = new TaskRecord(taskID);
     
      //console.log("new t", t)
      
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

  //returns different GUI depending on the state of the metric - pressed - unpressed
  function MetricColumn({ metric }) {    
    if(currentMetric && currentMetric.id==metric.id)
      return (<button   onClick={() => showScale(metric.id)}>{metric.title}+</button>) ;
    //not selected 
    return (<button   onClick={() => showScale(metric.id)}>{metric.title}</button>); 
  }

  function showScale(metricID){
    const mr = metrics.find((element) => (element.id === metricID));
    console.log("min:",mr.min, "max:", mr.max, "step:", mr.step);
    setCurrentMetric(mr);
    const r = document.querySelector('#metricRange');
    r.min = mr.min;
    r.max = mr.max;
    r.step = mr.step;
    const v = (mr.max + mr.min)/2;
    console.log(v);
    r.value = v;
    setCurrentLevel(v);
  }
 
  function recordMetric(){
    if (!currentMetric) return;
    console.log("metric id", currentMetric.id);
    console.log("recording level", currentLevel);
    
    var m = new MetricRecord(currentMetric.id, currentLevel);
    setCurrentMetric(null);      
    setRecords((prev) => {      
      return [...prev, m]
    })   

    console.log("RECORDS", records) ;      
  }

  return (
    <>
      <ul className="nav bg-primary">
        <li className="nav-item">
        <Link className="nav-link text-white" to="./tasks">
          Tasks
        </Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link text-white" to="./metrics">
          Metrics
        </Link>
        </li>
      </ul>
      <CurrentTime/>
        <div className="horizontalBar">
          {
            metrics.map((obj) => (
              <span key={obj.id}>
              <MetricColumn 
                  metric={obj} 
              />
              </span>
            ))
          }
        </div>
        {currentMetric 
         ?   
            (
              <div className="slidecontainer input-group">      
                <input type="range" className="form-range form-control" 
                  id="metricRange" 
                  min="-10" 
                  max="10" 
                  step="1" 
                  value={currentLevel} 
                  onChange={(e) => setCurrentLevel(e.target.value)} 
                />
                {/* <input id="metricDisplay" type="text" className="form-control"/> */}
                <label>{currentLevel}</label>
                <button className="btn btn-primary" onClick={() => recordMetric()}>v</button>
            </div>
            )
        :
        (
          <div className="slidecontainer input-group">      
            <input type="range" className="form-range form-control" 
              id="metricRange" 
              min="-10" 
              max="10" 
              step="1" 
              value="0" 
              readOnly={true}              
            />           
        </div>
        ) 
      }
      
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
