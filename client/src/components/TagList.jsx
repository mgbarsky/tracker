import React, { useState } from "react";

/*
    [
        {id: 1, caption: book},

    ]
*/

export default function TagList({ task, setTask, taskTags }) {
    const toggleSelectedTag = (event, tagId) => {
        event.preventDefault();

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
            <div className="row">
                <label>Tags:</label>
                <ul className="menulist">
                    {taskTags.map((obj) => (
                        <li
                            key={obj.id}
                            className={`cursor-pointer 
                                ${
                                    isSelectedTag(obj.id) ? "selected-tag" : ""
                                } `}
                            onClick={(event) =>
                                toggleSelectedTag(event, obj.id)
                            }
                        >
                            {obj.title}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
