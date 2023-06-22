import React from 'react'

export default function Tasks({ tasks, setTasks, toggleModal }) {
    
    function deleteTask(taskID){
        setTasks((prev) => {
            return prev.filter((taskObj) => taskObj.id !== taskID)
        })  
    }

    function editTask(taskID){
    }

    function newTask() {
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
        </>
    )
}
