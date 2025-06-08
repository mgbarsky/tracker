import React, { useState } from "react";
import NewMetricTag from "../screens/NewMetricTag";
//import { Modal } from "react-bootstrap";
import { Tag } from "../objects/tag";
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

export default function MetricTags({ metricTags }) {
    const [tag, setTag] = useState(new Tag("metricTag"));
    const [editMode, setEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    async function deleteTag(tagID) {
        try {
            await db.metricTags.delete(tagID);
            console.log(`Deleted metric tag in indexed db: ${tagID}`);
        } catch (error) {
            console.error(error);
        }
    }

    function editTag(tagID) {
        const tag = metricTags.find((tagObj) => tagObj.id === tagID);
        setTag(tag);
        setEditMode(true);
        console.log("edit metric tag", tag);
        toggleModal();
    }

    function newTag() {
        setEditMode(false);
        setTag(new Tag("metricTag"));
        toggleModal();
    }

    async function toogleEnabled(id) {
        const currentTag = metricTags.find((tag) => tag.id === id);

        if (!currentTag) {
            console.log("current metric tag is not found");
            return;
        }

        try {
            await db.metricTags.update(id, {
                enabled: !currentTag.enabled,
            });
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
                    <h3>Metric tags</h3>
                </header>
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
                    {metricTags.map((obj) => (
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
            <nav>
                <Link to="/recordmetrics"><img src={MoodIcon} /></Link>
                <Link to="/"><img src={HomeIcon} /></Link>
                <Link to="/recordtasks"><img src={ActivityIcon} /></Link>
            </nav>
            {showModal && (
                <Modal show={showModal} fullscreen={false}>
                    <div className="container">
                        <NewMetricTag
                            metricTags={metricTags}
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
