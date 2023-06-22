import { useState } from 'react'
import './App.css'

import NewTask from '../screens/NewTask';
import Tasks from '../screens/Tasks';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';

function App() {
  const [tasks, setTasks] = useState([])
  const [metrics, setMetrics] = useState([])
  
  const [showModal, setShowModal] = useState(false);

  console.log(tasks)  

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <>
    <div className="container">   
      <Tasks tasks={tasks} setTasks={setTasks} toggleModal={toggleModal}/> 
    </div>   
    {
      showModal && (
        <Modal show={showModal} fullscreen={false}>
          <div className="container">   
            <NewTask setTasks={setTasks} toggleModal={toggleModal}/> 
          </div>
        </Modal>          
      )
    }
         
    </>
  )
}

export default App
