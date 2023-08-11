import React, { useState } from 'react'
import NewTask from '../screens/NewTask';
import { Modal } from 'react-bootstrap';
import { Task } from '../objects/task';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Tasks({ tasks, setTasks }) {
    const [task, setTask] = useState(new Task())
    const [editMode, setEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate()
  
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
    
    function toogleEnabled(id){
        const nextTasks = tasks.map((c) => {
            if (c.id === id) {
              // toogle the enabled property
              c.enabled = !c.enabled
              return c;
            } else {
              // The rest haven't changed
              return c;
            }
          });
           
          setTasks(nextTasks)        
     
    }

    return (
        <> 
        <ul className="nav bg-primary">
            <li className="nav-item">
                <Link className="nav-link text-white" to="/">&larr;            
                </Link>
            </li>            
        </ul>   
        <h1>Tasks</h1>
        {
            tasks.map((obj) => (
                <div className="input-group" key={obj.id}>                            
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch"  
                            checked={obj.enabled} 
                            
                            onChange={() => toogleEnabled(obj.id)}
                        />  
                        {obj.enabled}                               
                    </div> 
                    {
                        obj.enabled 
                        ?   
                            (
                                <>
                                    <input  className="form-control" value={obj.title} readOnly={true}/>                            
                                    <button className="btn btn-outline-dark"                          
                                        onClick={() => deleteTask(obj.id)}>x
                                    </button> 
                                    <button className="btn btn-outline-danger"                          
                                        onClick={() => editTask(obj.id)}>...
                                    </button> 
                                </>
                            )
                        :
                            (<input  className="form-control" value={obj.title} readOnly={true}/> ) 
                    }                                               
                </div>
            ))
        } 
        <div className="input-row submit">          
          <button type="button" className="btn btn-primary" onClick={() => newTask()}>+</button>
        </div> 
       
        {/* <button onClick={() => navigate('/')}>Home</button> */}
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
