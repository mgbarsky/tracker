import React, { useState } from "react";
import NewTask from "../screens/NewTask";
import { Modal } from "react-bootstrap";
import { Task } from "../objects/task";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../data/db";

import HomeIcon from "../assets/home.svg";
import PauseIcon from "../assets/pause.svg";
import PlayIcon from "../assets/play.svg";
import StopIcon from "../assets/stop.svg";
import EditIcon from "../assets/edit.svg";
import ActivityIcon from "../assets/activity.svg";
import MoodIcon from "../assets/mood.svg";
import AddIcon from "../assets/add.svg";
import DeleteIcon from "../assets/delete.svg";

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

    async function toogleEnabled(id) {
        const currentTask = tasks.find((task) => task.id === id);

        if (!currentTask) {
            console.log("current task is not found");
            return;
        }

        try {
            await db.tasks.update(id, {
                enabled: !currentTask.enabled,
            });
            console.log(`toggle enabled: ${id}`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <header>
                <h1>
                    <Link to="/">
                        <img src={HomeIcon} />
                    </Link>
                    Tracker
                </h1>
                <h3>Activities</h3>
            </header>
            <main>
                <ul className="menulist">
                    <li>
                        <span className="col">&nbsp;</span>
                        <span className="maincol">&nbsp;</span>
                        <span className="col">
                            <a onClick={() => newTask()}>
                                <img src={AddIcon} />
                            </a>
                        </span>
                    </li>
                    {tasks.map((obj) => (
                        <li key={obj.id}>
                            <span className="col">
                                <input
                                    className="form-check-input"
                                    type="range"
                                    min="0"
                                    max="1"
                                    value={obj.enabled ? "1" : "0"}
                                    onChange={() => toogleEnabled(obj.id)}
                                />
                                {obj.enabled}
                            </span>
                            <span className="maincol">
                                <input
                                    value={obj.title}
                                    readOnly={true}
                                    onClick={() => editTask(obj.id)}
                                />
                            </span>
                            <span className="col">
                                <a onClick={() => deleteTask(obj.id)}>
                                    <img src={DeleteIcon} />
                                </a>
                            </span>
                        </li>
                    ))}
                </ul>
            </main>
            {showModal && (
                <Modal show={showModal} fullscreen={false}>
                    <div className="container">
                        <NewTask
                            tasks={tasks}
                            toggleModal={toggleModal}
                            currentTask={task}
                            editMode={editMode}
                            taskTags={taskTags}
                        />
                    </div>
                </Modal>
            )}
        </>
    );
}
