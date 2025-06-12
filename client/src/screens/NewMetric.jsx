import React, { useState } from "react";

import InputLine from "../components/InputLine";
import DetailsLine from "../components/DetailsLine";
import TagList from "../components/TagList";
import NumberLine from "../components/NumberLine";

import { Metric } from "../objects/metric.js";
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

function NewMetric({
    currentMetric,
    metrics,
    toggleModal,
    editMode,
    metricTags,
}) {
    const [metric, setMetric] = useState(currentMetric);
    const navigate = useNavigate();

    const handleSave = async () => {
        // console.log(metric);

        const metricToBeSaved = {
            id: metric.id,
            title: metric.title,
            description: metric.description,
            enabled: metric.enabled,
            max: metric.max,
            min: metric.min,
            step: metric.step,
            tags: metric.tags,
        };

        if (!editMode) { //new mwtric
            try {
                await db.metrics.add(metricToBeSaved);
                // console.log(`added metric in indexed db:`, metricToBeSaved);
            } catch (error) {
                console.error(error);
            }
        } else {    //edit existing metric
            try {
                await db.metrics.put(metricToBeSaved);
                // console.log(`updated metric in indexed db:`, metricToBeSaved);
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
                        Edit metric
                    </h2>
                ) : (
                    <h2>                       
                        New metric
                    </h2>
                )}     
                <InputLine
                    task={metric}
                    setTask={setMetric}
                    taskAttribute="title"
                    labelText="Metric Title"
                />
                <div className='editRange'>
                    <NumberLine
                        task={metric}
                        setTask={setMetric}
                        taskAttribute="min"
                        labelText="min"
                    />
                    <div style={{flex: '0 1 32px', alignItems: 'center'}}>...</div>
                    <NumberLine
                        task={metric}
                        setTask={setMetric}
                        taskAttribute="max"
                        labelText="max"
                    />
                    <div style={{flex: '0 1 16px', alignItems: 'center'}}>:</div>
                    <NumberLine
                        task={metric}
                        setTask={setMetric}
                        taskAttribute="step"
                        labelText="step"
                    />
                </div> 
                <DetailsLine
                    task={metric}
                    setTask={setMetric}
                    taskAttribute="description"
                    labelText="Notes"
                />
                <TagList task={metric} setTask={setMetric} taskTags={metricTags} />
            </div>
           <nav>
                <a onClick={handleSave}>Save</a>
                <a onClick={toggleModal}>Cancel</a>
            </nav>             
        </>
    );
}

export default NewMetric;

/*
<NumberLine
                    task={metric}
                    setTask={setMetric}
                    taskAttribute="min"
                    labelText="Min value"
                />
                <NumberLine
                    task={metric}
                    setTask={setMetric}
                    taskAttribute="max"
                    labelText="Max value"
                />
                <NumberLine
                    task={metric}
                    setTask={setMetric}
                    taskAttribute="step"
                    labelText="Increments"
                />*/

/*
<section class='editRange'>
                                    <div>
                                        <label>min</label>
                                        <input type='number' />
                                    </div>
                                    <div>...</div>
                                    <div>
                                        <label>max</label>
                                        <input type='number' />
                                    </div>
                                    <div>:</div>
                                    <div>
                                        <label>step</label>
                                        <input type='number' />
                                    </div>
                                </section>  */