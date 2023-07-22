import React, { useState } from 'react'
import NewTask from '../screens/NewTask';
import { Modal } from 'react-bootstrap';
import { Task } from '../objects/task';

export default function Tasks({ tasks, setTasks }) {
    const [task, setTask] = useState(new Task())
    const [editMode, setEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);

    console.log(tasks)  
  
    const toggleModal = () => {
      setShowModal(!showModal)
    }
    
    function deleteTask(taskID){
        setTasks((prev) => {
            return prev.filter((taskObj) => taskObj.id !== taskID)
        })  
    }

    function editTask(taskID){
        const task = tasks.find((taskObj) => taskObj.id === taskID)
        setTask(task)
        setEditMode(true)
        console.log("edit task", task)
        toggleModal()
    }

    function newTask() {
        setEditMode(false)
        setTask(new Task())
        toggleModal()
    }
    
    return (
        <>    
        <h1>Tasks</h1>
        {
            tasks.map((taskObj) => (
                <div key={taskObj.id}>                            
                        
                    <span>{taskObj.title} </span>                            
                    <button                          
                        onClick={() => deleteTask(taskObj.id)}>x
                    </button> 
                    <button                          
                        onClick={() => editTask(taskObj.id)}>...
                    </button>                                                
                </div>
            ))
        }  
        <button                          
            onClick={() => newTask()}>+
        </button>
        {
            showModal && (
                <Modal show={showModal} fullscreen={false}>
                <div className="container">   
                    <NewTask tasks={tasks} setTasks={setTasks} toggleModal={toggleModal} currentTask={task} editMode={editMode}/> 
                </div>
                </Modal>          
            )
        } 
        </>
    )
}
