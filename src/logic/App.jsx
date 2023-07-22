import { useState } from 'react'
import './App.css'

import NewTask from '../screens/NewTask';
import Tasks from '../screens/Tasks';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';

function App() {
  const [tasks, setTasks] = useState([])
  const [metrics, setMetrics] = useState([])
  
  return (
    <>
    <div className="container">   
      <Tasks tasks={tasks} setTasks={setTasks} /> 
    </div>     
    </>
  )
}

export default App
