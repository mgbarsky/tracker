import React, { useState } from "react";
import NewTask from "../screens/NewTask";
//import { Modal } from "react-bootstrap";
import { Task } from "../objects/task";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../data/db";

import ActivityIcon from "../assets/activity.svg";
import AddIcon from "../assets/add.svg";
import DeleteIcon from "../assets/delete.svg";
import ExploreIcon from "../assets/explore.svg";
import GearIcon from "../assets/gear.svg";
import HomeIcon from "../assets/home.svg";
import MoodIcon from "../assets/mood.svg";
import PauseIcon from "../assets/pause.svg";
import PlayIcon from "../assets/play.svg";
import StopIcon from "../assets/stop.svg";
import SubmitIcon from "../assets/submit.svg";
import TagIcon from "../assets/tag.svg";

export default function Tasks({ tasks, taskTags }) {
    const [task, setTask] = useState(new Task());
    const [editMode, setEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    async function deleteTask(taskID) {
        try {
            await db.tasks.delete(taskID);
            console.log(`Deleted task in indexed db: ${taskID}`);
        } catch (error) {
            console.error(error);
        }
    }

    function editTask(taskID) {
        const task = tasks.find((taskObj) => taskObj.id === taskID);
        setTask(task);
        setEditMode(true);
        console.log("edit task", task);
        toggleModal();
    }

    function newTask() {
        setEditMode(false);
        setTask(new Task());
        toggleModal();
    }

    async function toogleEnabled(id, docEvent) {
        docEvent.stopPropagation();
        const currentTask = tasks.find((task) => task.id === id);
        const DOMElem = docEvent.target.parentElement;

        if (!currentTask) {
            console.log("current task is not found");
            return;
        }

        try {
            await db.tasks.update(id, {
                enabled: !currentTask.enabled,
            });
            DOMElem.classList.toggle('disabled');
            console.log(`toggle enabled: ${id}`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>            
            <main>
                <header>
                    <h1>
                        Tracker
                    </h1>
                    <h3>Activities</h3>
                </header>
                <ul className="editlist">                    
                    {tasks.map((obj) => (
                        <li key={obj.id} onClick={() => editTask(obj.id)}>
                            <span 
                                onClick={(e) => toogleEnabled(obj.id, e)}>  
                                {obj.title.substring(0,1).toUpperCase()}
                            </span>
                            <h4>{obj.title}</h4>
                            <Link 
                                className='enable' 
                                onClick={(e) => toogleEnabled(obj.id, e)}>
                            </Link>
                            <Link className='delete' 
                                onClick={(e) => deleteTag(obj.id,e)}>                                    
                            </Link>
                        </li>
                    ))}
                </ul>
            </main>
            <section className='ribbon' id='editor'>
                <nav>
                    <Link onClick={() => newTask()}>
                        <img src={AddIcon} />
                    </Link>
                </nav>
	        </section>
            <nav>
                <Link to="/recordmetrics"><img src={MoodIcon} /></Link>
                <Link to="/"><img src={HomeIcon} /></Link>
                <Link to="/recordtasks"><img src={ActivityIcon} /></Link>
            </nav>
            
            {showModal && (
                <div id='backdrop'>
                    <NewTask
                        tasks={tasks}
                        toggleModal={toggleModal}
                        currentTask={task}
                        taskTags={taskTags}
                        editMode={editMode}
                    />
                </div>
            )}            
        </>
    );
}
