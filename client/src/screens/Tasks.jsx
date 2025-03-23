import React, { useState } from "react";
import NewTask from "../screens/NewTask";
import { Modal } from "react-bootstrap";
import { Task } from "../objects/task";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { db } from "../data/db";

export default function Tasks({ tasks }) {
    console.log(tasks);

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
            <ul className="nav bg-primary">
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/">
                        &larr;
                    </Link>
                </li>
            </ul>
            <h1>Tasks</h1>
            {tasks.map((obj) => (
                <div className="input-group" key={obj.id}>
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            checked={obj.enabled}
                            onChange={() => toogleEnabled(obj.id)}
                        />
                        {obj.enabled}
                    </div>
                    {obj.enabled ? (
                        <>
                            <input
                                className="form-control"
                                value={obj.title}
                                readOnly={true}
                            />
                            <button
                                className="btn btn-outline-dark"
                                onClick={() => deleteTask(obj.id)}
                            >
                                x
                            </button>
                            <button
                                className="btn btn-outline-danger"
                                onClick={() => editTask(obj.id)}
                            >
                                ...
                            </button>
                        </>
                    ) : (
                        <input
                            className="form-control"
                            value={obj.title}
                            readOnly={true}
                        />
                    )}
                </div>
            ))}
            <div className="input-row submit">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => newTask()}
                >
                    +
                </button>
            </div>

            {/* <button onClick={() => navigate('/')}>Home</button> */}
            {showModal && (
                <Modal show={showModal} fullscreen={false}>
                    <div className="container">
                        <NewTask
                            tasks={tasks}
                            toggleModal={toggleModal}
                            currentTask={task}
                            editMode={editMode}
                        />
                    </div>
                </Modal>
            )}
        </>
    );
}
