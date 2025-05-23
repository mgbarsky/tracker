import React from 'react'
import { Link } from 'react-router-dom';
import { useState , useEffect } from 'react'
import { TaskRecord } from '../objects/record.js';
import { CurrentTime } from '../components/CurrentTime';
import { db } from '../data/db.js'

export default function RecordTasks({ tasks, records, setRecords  }) 
{
  const [currentTask, setCurrentTask] = useState(null); 
  const [currentRecord, setCurrentRecord] = useState(null);  
  const [totalSecs, setTotalSecs] = useState(0); 
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    console.log(records)
  }, [records])

  function secondsDiff(dateTimeValue2, dateTimeValue1) {
    var differenceValue =(dateTimeValue2.getTime() - dateTimeValue1.getTime()) / 1000;    
    return Math.abs(Math.round(differenceValue));
  }

  function startTask (taskID){
    //console.log("UPDATED RECORDS");
    //console.log(records);
    
    if (currentTask) // not allowing multiple tasks running at the same time
      return;
    var ct = tasks.find((element) => (element.id === taskID));
    setCurrentTask(ct);
    var cr = new TaskRecord(taskID);
    setCurrentRecord(cr); 
    setCurrentTime(new Date());
    setTotalSecs(0);
  }

  function pauseCurrentTask(){
    var nowTime = new Date();  
    setTotalSecs((prev) => prev + secondsDiff(nowTime , currentTime))
  }

  function restartCurrentTask(){
    setCurrentTime(new Date());
  }

  function recordCurrentTask(){ 
    // add new task record to records
    
    /*setCurrentRecord((prevRecord) => ({
      ...prevRecord,
      end: new Date(),
      inProgress: false,
      totalSecs: totalSecs + secondsDiff(new Date() , currentTime)
    }))*/

    currentRecord.end = new Date();
    currentRecord.inProgress = false;
    currentRecord.totalSecs = totalSecs + secondsDiff(new Date() , currentTime);
    setRecords((prev) => {      
      return [...prev, currentRecord]
    })  
    //console.log("UPDATED RECORDS");
    //console.log(records);
    
    setTotalSecs(0);
    setCurrentRecord(null);
    setCurrentTask(null);
    
  }
  
  function TaskRow({ task }) {  
      return (
        <div key={task.id}>
            <span className="col">
                <label>{task.title.substring(0, 1)}</label> 
            </span>
            <span className="maincol">
                <input
                    value={task.title}
                    readOnly
                    onClick={() => startTask(task.id)}
                />
            </span>        
        </div>      
      ) ;    
  }
  
  function PlayPanel(){
      if(currentRecord) {
        return (          
          <section id="player">
            <div key={currentRecord.id}>
                <h4>Sun, May 3, 3 pm</h4>
                <h3>{currentTask.title}</h3>
                <h4>Elapsed time: {currentRecord.totalTime} </h4>
            </div>
            
              <div className="buttonpanel">
               <button onClick={() => restartCurrentTask()}><img src="assets/play.svg"/></button>                        
                <button onClick={() => pauseCurrentTask()}><img src="assets/pause.svg"/></button>
                <button onClick={() => recordCurrentTask()}><img src="assets/stop.svg"/></button>
              </div>   
          </section>  
      ) ;       
    }  
  }
  
  return (
    <>
      <header>
        <h1><a href="/"><img src="assets/home.svg"/></a>Tracking</h1>
        <h3>Record activities</h3>
	    </header>
      <section id="taskList">
      <ul className="playlist">        
      {
            tasks.map((obj) => (
                <li key={obj.id}>
                   <TaskRow 
                      task={obj} 
                    />
                </li>
            ))
      }
      </ul> 
      <PlayPanel/>
      </section>
      <section>
        <div className="buttonpanel">                        
          <button><a><img src="assets/activity.svg"/></a></button>
          <button><a href="/recordmetrics"><img src="assets/mood.svg"/></a></button>
        </div>   
      </section>   
    </>
  )
}
