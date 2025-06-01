import React, { useState } from "react";
import NewTaskTag from "../screens/NewTaskTag";
import { Modal } from "react-bootstrap";
import { Tag } from "../objects/tag";
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

export default function TaskTags({ taskTags }) {
    const [tag, setTag] = useState(new Tag("taskTag"));
    const [editMode, setEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    async function deleteTag(tagID) {
        try {
            await db.taskTags.delete(tagID);
            console.log(`Deleted task tag in indexed db: ${tagID}`);
        } catch (error) {
            console.error(error);
        }
    }

    function editTag(tagID) {
        const tag = taskTags.find((tagObj) => tagObj.id === tagID);
        setTag(tag);
        setEditMode(true);
        console.log("edit task tag", tag);
        toggleModal();
    }

    function newTag() {
        setEditMode(false);
        setTag(new Tag("taskTag"));
        toggleModal();
    }

    async function toogleEnabled(id) {
        const currentTag = taskTags.find((tag) => tag.id === id);

        if (!currentTag) {
            console.log("current task tag is not found");
            return;
        }

        try {
            await db.taskTags.update(id, {
                enabled: !currentTag.enabled,
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
                <h3>Activity tags</h3>
            </header>
            <main>
                <ul className="menulist">
                    <li>
                        <span className="col">&nbsp;</span>
                        <span className="maincol">&nbsp;</span>
                        <span className="col">
                            <a onClick={() => newTag()}>
                                <img src={AddIcon} />
                            </a>
                        </span>
                    </li>
                    {taskTags.map((obj) => (
                        <li key={obj.id}>
                            <span className="col">
                                <input
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
                                    onClick={() => editTag(obj.id)}
                                />
                            </span>
                            <span className="col">
                                <a onClick={() => deleteTag(obj.id)}>
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
                        <NewTaskTag
                            taskTags={taskTags}
                            toggleModal={toggleModal}
                            currentTag={tag}
                            editMode={editMode}
                        />
                    </div>
                </Modal>
            )}
        </>
    );
}
