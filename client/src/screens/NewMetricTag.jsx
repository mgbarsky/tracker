import React, { useState } from "react";
import InputLine from "../components/InputLine";
import DetailsLine from "../components/DetailsLine";

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
        // console.log(tag);
        const tagToBeSaved = {
                description: tag.description,
                enabled: tag.enabled,
                id: tag.id,
                title: tag.title,
                type: "metricTag",
            };
        if (!editMode) {  
            try {
                await db.metricTags.add(tagToBeSaved);
                console.log(`added metric tag to indexed db: ${tagToBeSaved}`);
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                await db.metricTags.put(tagToBeSaved);
                console.log(`updated metric tag in indexed db: ${tagToBeSaved}`);
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
                        Edit Metric tag
                    </h2>
                ) : (
                    <h2>                      
                        New Metric tag
                    </h2>
                )}

                <InputLine
                    task={tag}
                    setTask={setTag}
                    taskAttribute="title"
                    labelText="Tag Title"
                />

                <DetailsLine
                    task={tag}
                    setTask={setTag}
                    taskAttribute="description"
                    labelText="Notes"
                />
            </div>
                {/* TBD list of all involcved metrics */}
             <nav>
                <a onClick={handleSave}>Save</a>
                <a onClick={toggleModal}>Cancel</a>
            </nav>
        </>
    );
}

export default NewMetricTag;
