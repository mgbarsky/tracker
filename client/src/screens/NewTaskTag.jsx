import React, { useState } from "react";
import InputLine from "../components/InputLine";
import DetailsLine from "../components/DetailsLine";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";

import { Tag } from "../objects/tag.js";

import { db } from "../data/db.js";
import { Link, useNavigate } from "react-router-dom";
/*
  {
    title: "",
    tags: [{}, {}]
  }
*/

function NewTaskTag({ currentTag, taskTags, toggleModal, editMode }) {
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
                type:"taskTag"
            };

            try {
                await db.taskTags.add(tagToBeSaved);
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
                type:"taskTag"
            };

            try {
                await db.taskTags.put(tagToBeSaved);
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
                {editMode ?   
                (
                    <h2><img src="assets/edit.svg"/><img src="assets/activity.svg"/><img src="assets/tag.svg"/>Edit activity tag</h2>
                )
                :
                (
                    <h2><img src="assets/add.svg"/><img src="assets/activity.svg"/><img src="assets/tag.svg"/>New activity tag</h2>
                )
                }		       		
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
                    <button       
                        onClick={handleSave}
                    >
                        Save
                    </button>
                    <button 
                        onClick={toggleModal}
                    >
                        Cancel
                    </button>                    
                </div> 
            </main>           
        </>
    );
}

export default NewTaskTag;
