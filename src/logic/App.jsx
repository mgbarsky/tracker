import { useState } from 'react'
import './App.css'

import NewTask from '../screens/NewTask';

import Button from 'react-bootstrap/Button';

function App() {
  const [tasks, setTasks] = useState([])
  const [metrics, setMetrics] = useState([])
  const [currentTask, setCurrentTask] = useState({});
  const [currentMetric, setCurrentMetric] = useState({});

  return (
    <> 
   {/*  <div className="container">   
      <TaskList /> 
    </div>   */} 
    <div className="container">   
      <NewTask /> 
    </div>       
    </>
  )
}

export default App
