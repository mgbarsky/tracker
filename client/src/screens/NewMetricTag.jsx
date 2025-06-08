import React, { useState } from "react";
import InputLine from "../components/InputLine";
import DetailsLine from "../components/DetailsLine";
//import "bootstrap/dist/css/bootstrap.min.css";

//import Button from "react-bootstrap/Button";

import { Tag } from "../objects/tag.js";
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

function NewMetricTag({ currentTag, metricTags, toggleModal, editMode }) {
    const [tag, setTag] = useState(currentTag);
    const navigate = useNavigate();
    const handleSave = async () => {
        console.log(tag);

        if (!editMode) {
            const tagToBeSaved = {
                description: tag.description,
                enabled: tag.enabled,
                id: tag.id,
                title: tag.title,
                type: "metricTag",
            };

            try {
                await db.metricTags.add(tagToBeSaved);
                console.log(`added tag in indexed db: ${tagToBeSaved}`);
            } catch (error) {
                console.error(error);
            }
        } else {
            const tagToBeSaved = {
                description: tag.description,
                enabled: tag.enabled,
                id: tag.id,
                title: tag.title,
                type: "taskTag",
            };

            try {
                await db.metricTags.put(tagToBeSaved);
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
                {editMode ? (
                    <h2>                       
                        Edit Metric tag
                    </h2>
                ) : (
                    <h2>                      
                        New Metric tag
                    </h2>
                )}
            </header>
            <main>
                <InputLine
                    task={tag}
                    setTask={setTag}
                    taskAttribute="title"
                    labelText="Title"
                />

                <DetailsLine
                    task={tag}
                    setTask={setTag}
                    taskAttribute="description"
                    labelText="Details"
                />
                {/* TBD list of all involcved activities */}
                <div className="buttonpanel">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={toggleModal}>Cancel</button>
                </div>
            </main>
        </>
    );
}

export default NewMetricTag;
