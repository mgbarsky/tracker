import React, { useState } from "react";
import NewMetricTag from "../screens/NewMetricTag";
//import { Modal } from "react-bootstrap";
import { Tag } from "../objects/tag";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../data/db";
import { ColorArray, ColorGradient, ColorStyle } from "../utils/colors.js";

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

    async function deleteTag(tagID, docEvent) {
        docEvent.stopPropagation();
        try {
            await db.metricTags.delete(tagID);
            console.log(`Deleted metric tag from indexed db: ${tagID}`);
        } catch (error) {
            console.error(error);
        }
    }

    function editTag(tagID) {
        const tag = metricTags.find((tagObj) => tagObj.id === tagID);
        setTag(tag);
        setEditMode(true);
        // console.log("edit metric tag", tag);
        toggleModal();
    }

    function newTag() {
        setEditMode(false);
        const colors = ColorArray();
        const colorID = Math.floor(Math.random() * colors.length);
        setTag(new Tag("metricTag",colorID));
        toggleModal();
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
                <ul className="editlist">                    
                    {metricTags.map((obj) => (
                        <li key={obj.id} onClick={() => editTag(obj.id)}>
                            <span style={{background: "radial-gradient(circle at 0 0, rgb(90 109 61 / .6), rgb(120 132 79 / .87)"}}>
                                {obj.title.substring(0,1).toUpperCase()}
                            </span>
                            <h4>{obj.title}</h4>                            
                            <a className='delete' onClick={(e) => deleteTag(obj.id,e)}></a>
                        </li>
                    ))}
                </ul>
            </main>
            <section className='ribbon' id='editor'>
                <nav>
                    <Link onClick={() => newTag()}>
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
                    <NewMetricTag
                        metricTags={metricTags}
                        toggleModal={toggleModal}
                        currentTag={tag}
                        editMode={editMode}
                    />
                </div>
            )}
        </>
    );
}
