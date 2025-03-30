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

function NewTask({ currentTask, tasks, toggleModal, editMode }) {
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
                // tags: task.tags.map((tags) => tags.id),
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
            <h1>Task</h1>
            <form className="input-form">
                <InputLine
                    task={task}
                    setTask={setTask}
                    taskAttribute="title"
                    labelText="Title"
                />
                <TagList task={task} setTask={setTask} />
                <DetailsLine
                    task={task}
                    setTask={setTask}
                    taskAttribute="description"
                    labelText="Details"
                />
                {/* <DateTimeLine  task={task} setTask={setTask} dateAttribute="startDate" timeAttribute="startTime" dateLabel="Starts on" timeLabel="at"/> 
      <DateTimeLine  task={task} setTask={setTask} dateAttribute="endDate" timeAttribute="endTime" dateLabel="Ends by" timeLabel="at"/> 
      <InputLine  task={task} setTask={setTask} taskAttribute="targetIntensity" labelText="Target intensity"/>  
      <Switch  task={task} setTask={setTask} taskAttribute="trackIntensity" labelText="Track intensity"/>
      <TimeIntervalLine  task={task} setTask={setTask} taskAttribute="targetDuration" labelText="Target duration"/>   */}
                <div className="input-row submit">
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={toggleModal}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSave}
                    >
                        Done
                    </button>
                </div>
            </form>
        </>
    );
}

export default NewTask;
