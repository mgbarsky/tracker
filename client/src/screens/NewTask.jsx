import React, { useState } from "react";

import Switch from "../components/Switch";
import InputLine from "../components/InputLine";
import TimeIntervalLine from "../components/TimeIntervalLine";
import DetailsLine from "../components/DetailsLine";
import DateTimeLine from "../components/DateTimeLine";
import TagList from "../components/TagList";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";

import { Task } from "../objects/task.js";

import { db } from "../data/db.js";

/*
  {
    title: "",
    tags: [{}, {}]
  }
*/

function NewTask({ currentTask, tasks, toggleModal, editMode, taskTags }) {
    const [task, setTask] = useState(currentTask);

    const handleSave = async () => {
        console.log(task);

        if (!editMode) {
            // TODO (later): handle what properties we want to save in indexed db

            // currently, only saving similar to prepopulated data
            // We still need mapping for tag id and tag title
            // TODO: add tags
            const taskToBeSaved = {
                description: task.description,
                enabled: task.enabled,
                id: task.id,
                tags: [],
                // tags: task.tags.map((tags) => tags.id),
                title: task.title,
            };

            try {
                await db.tasks.add(taskToBeSaved);
                console.log(`added task in indexed db: ${taskToBeSaved}`);
            } catch (error) {
                console.error(error);
            }
        } else {
            const taskToBeSaved = {
                description: task.description,
                enabled: task.enabled,
                id: task.id,
                tags: [],                
                title: task.title,
            };

            try {
                await db.tasks.put(taskToBeSaved);
                console.log(`updated task in indexed db:`, taskToBeSaved);
            } catch (error) {
                console.error(error);
            }
        }

        toggleModal();
    };

    return (
        <>
            <header>
                {editMode ?   
                (
                    <h2><img src="assets/edit.svg"/><img src="assets/activity.svg"/>Edit activity</h2>
                )
                :
                (
                    <h2><img src="assets/add.svg"/><img src="assets/activity.svg"/>New activity</h2>
                )
                }		       		
	        </header> 
            <main>          
                <InputLine
                    task={task}
                    setTask={setTask}
                    taskAttribute="title"
                    labelText="Title"
                />
                
                <DetailsLine
                    task={task}
                    setTask={setTask}
                    taskAttribute="description"
                    labelText="Details"
                />
                <TagList task={task} setTask={setTask} taskTags={taskTags} />
                <div className="buttonpanel">
                    <button       
                        onClick={handleSave}
                    >
                        Save
                    </button>
                    <button 
                        onClick={toggleModal}
                    >
                        Cancel
                    </button>                    
                </div> 
            </main>           
        </>
    );
}

export default NewTask;
