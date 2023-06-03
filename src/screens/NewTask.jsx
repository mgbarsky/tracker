import { useState } from 'react'

import Switch from '../components/Switch'
import LabelList from '../components/LabelList';
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
    <div className="container">   
      <LabelList task={task} setTask={setTask}/> 
      <button onClick={handleSave}>Save</button>
    </div>    
    </>
  )
}

export default NewTask