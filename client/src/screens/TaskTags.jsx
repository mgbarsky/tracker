import React, { useState } from "react";
import NewTaskTag from "../screens/NewTaskTag";
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

export default function TaskTags({ taskTags }) {
    const [tag, setTag] = useState(new Tag("taskTag"));
    const [editMode, setEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    async function deleteTag(tagID, docEvent) {
        docEvent.stopPropagation();
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
        toggleModal();
    }

    function newTag() {
        setEditMode(false);
        const colors = ColorArray();
        const colorID = Math.floor(Math.random() * colors.length);
        console.log("color index: "+colorID);
        setTag(new Tag("taskTag", colorID));
        toggleModal();
    }

    

    return (
        <>           
            <main>
                <header>
                    <h1>
                        Tracker
                    </h1>
                    <h3>Activity tags</h3>
                </header>
                <ul className="editlist">                    
                    {taskTags.map((obj) => (
                        <li key={obj.id} onClick={() => editTag(obj.id)}>
                            <span style={{backgroundColor: ColorGradient(obj.colorID)}}>  {obj.title.substring(0,1).toUpperCase()}</span>
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
                    <NewTaskTag
                        taskTags={taskTags}
                        toggleModal={toggleModal}
                        currentTag={tag}
                        editMode={editMode}
                    />
                </div>
            )}
        </>
    );
}
