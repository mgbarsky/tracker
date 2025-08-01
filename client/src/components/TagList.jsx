import React, { useState } from "react";
import { ColorArray, ColorGradient, ColorStyle } from "../utils/colors.js";
/*
    [
        {id: 1, caption: book},

    ]
*/

export default function TagList({ task, setTask, taskTags, listClassName }) {
    const toggleSelectedTag = (event, tagId) => {
        //event.preventDefault();

        const isTagSelected = isSelectedTag(tagId);

        const selectedTags = [...task.tags];

        if (isTagSelected) {
            // currently, the tag becomes unselected so remove from tags list
            const index = selectedTags.findIndex(
                (selectedTag) => selectedTag === tagId
            );

            if (index !== -1) {
                selectedTags.splice(index, 1);
            }
        } else {
            // add to tags
            selectedTags.push(tagId);
        }

        setTask((prev) => {
            return { ...prev, tags: selectedTags };
        });
    };

    const isSelectedTag = (tagId) => {
        const isSelected = task.tags.includes(tagId);
        return isSelected;
    };

    return (
        <>
            <ul className={listClassName}>
                {taskTags.map((obj) => (
                    <li
                        key={obj.id}
                        className={ isSelectedTag(obj.id) ? "on" : "" } 
                        onClick={(event) =>
                            toggleSelectedTag(event, obj.id)
                        }
                    > 
                        {obj.title}
                    </li>
                ))}
            </ul>            
        </>
    );
}

     /**/