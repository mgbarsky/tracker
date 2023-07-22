import React, { useState } from 'react'

import Switch from '../components/Switch'
import InputLine from '../components/InputLine';
import TimeIntervalLine from '../components/TimeIntervalLine';
import DetailsLine from '../components/DetailsLine';
import DateTimeLine from '../components/DateTimeLine';
import TagList from '../components/TagList';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';

import { Task } from "../objects/task.js"

/*
  {
    title: "",
    tags: [{}, {}]
  }
*/

function NewTask({ currentTask, tasks, setTasks, toggleModal, editMode}) {  

  const [task, setTask] = useState(currentTask)

  const handleSave = () => {
    console.log(task)

    if (!editMode) {
      setTasks((prev) => {      
        return [...prev, task]
      }) 
    } 
    else {       
      const nextTasks = tasks.map((c, i) => {
        if (c.id === currentTask.id) {
          // update to a new updated task
          return task;
        } else {
          // The rest haven't changed
          return c;
        }
      });
       
      setTasks(nextTasks) 
    }  

    toggleModal()
  }

  return (
    <> 
    <form className="input-form">
      <InputLine  task={task} setTask={setTask} taskAttribute="title" labelText="Title"/>      
      <TagList task={task} setTask={setTask}/> 
      <DetailsLine  task={task} setTask={setTask} taskAttribute="details" labelText="Details"/>
      <DateTimeLine  task={task} setTask={setTask} dateAttribute="startDate" timeAttribute="startTime" dateLabel="Starts on" timeLabel="at"/> 
      <DateTimeLine  task={task} setTask={setTask} dateAttribute="endDate" timeAttribute="endTime" dateLabel="Ends by" timeLabel="at"/> 
      <InputLine  task={task} setTask={setTask} taskAttribute="targetIntensity" labelText="Target intensity"/>  
      <Switch  task={task} setTask={setTask} taskAttribute="trackIntensity" labelText="Track intensity"/>
      <TimeIntervalLine  task={task} setTask={setTask} taskAttribute="targetDuration" labelText="Target duration"/>  
      <div className="input-row submit">
          <button type="button" className="btn btn-outline-secondary" >Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleSave}>Done</button>
      </div>
            
    </form>  
    </>
  )
}

export default NewTask