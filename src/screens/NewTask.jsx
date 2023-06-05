import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Switch from '../components/Switch'
import InputLine from '../components/InputLine';
import TagList from '../components/TagList';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';

/*
  {
    title: "",
    tags: [{}, {}]
  }
*/

function NewTask() {

  const [task, setTask] = useState({
    title: "",
    tags: []
  })

  const handleSave = () => {
    console.log(task)
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