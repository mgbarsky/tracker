import React, { useState } from "react";

import InputLine from "../components/InputLine";
import DetailsLine from "../components/DetailsLine";
import TagList from "../components/TagList";

import { Task } from "../objects/task.js";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../data/db.js";

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

function NewTask({ currentTask, tasks, toggleModal, editMode, taskTags }) {
    const [task, setTask] = useState(currentTask);
    const navigate = useNavigate();

    const handleSave = async () => {
        console.log(task);

        if (!editMode) {
            const taskToBeSaved = {
                description: task.description,
                enabled: task.enabled,
                id: task.id,
                tags: task.tags,
                title: task.title,
            };

            try {
                await db.tasks.add(taskToBeSaved);
                console.log(`added task to indexed db:`, taskToBeSaved);
            } catch (error) {
                console.error(error);
            }
        } else {
            const taskToBeSaved = {
                description: task.description,
                enabled: task.enabled,
                id: task.id,
                tags: task.tags,
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
            <div>
                {editMode ? (
                    <h2>                      
                        Edit activity
                    </h2>
                ) : (
                    <h2>                       
                        New activity
                    </h2>
                )}            
           
                <InputLine
                    task={task}
                    setTask={setTask}
                    taskAttribute="title"
                    labelText="Activity Title"
                />

                <DetailsLine
                    task={task}
                    setTask={setTask}
                    taskAttribute="description"
                    labelText="Notes"
                />
                <TagList task={task} setTask={setTask} taskTags={taskTags} />
            </div>    
            <nav>
                <a onClick={handleSave}>Save</a>
                <a onClick={toggleModal}>Cancel</a>
            </nav>            
        </>
    );
}

export default NewTask;
