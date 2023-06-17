import React, { useState } from 'react'

import Switch from '../components/Switch'
import InputLine from '../components/InputLine';
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

function NewTask({ tasks, setTasks, toggleModal}) {

  const [task, setTask] = useState(new Task())

  const handleSave = () => {
    console.log(task)

    setTasks((prev) => {      
      return [...prev, task]
    })

    setTask(new Task())

    toggleModal()
  }

  return (
    <> 
    <form className="input-form">
      <InputLine  task={task} setTask={setTask} taskAttribute="title" labelText="Title"/>
      <TagList task={task} setTask={setTask}/> 
      <div className="input-row submit">
          <button type="button" className="btn btn-outline-secondary" >Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleSave}>Done</button>
      </div>      
    </form>  
    </>
  )
}

export default NewTask