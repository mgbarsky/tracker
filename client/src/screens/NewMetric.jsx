import React, { useState } from "react";

import InputLine from "../components/InputLine";
import DetailsLine from "../components/DetailsLine";
import TagList from "../components/TagList";
import NumberLine from "../components/NumberLine";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";

import { Metric } from "../objects/metric.js";

import { db } from "../data/db";

/*
  {
    title: "",
    tags: [{}, {}]
  }
*/

function NewMetric({ currentMetric, metrics, toggleModal, editMode }) {
    const [metric, setMetric] = useState(currentMetric);

    const handleSave = async () => {
        console.log(metric);

        const metricToBeSaved = {
            id: metric.id,
            title: metric.title,
            description: metric.description,
            enabled: metric.enabled,
            max: metric.max,
            min: metric.min,
            step: metric.step,
            tags: [],
        };

        if (!editMode) {
            // TODO (later): handle what properties we want to save in indexed db

            // We still need mapping for tag id and tag title
            // TODO: add tags

            try {
                await db.metrics.add(metricToBeSaved);
                console.log(`added metric in indexed db:`, metricToBeSaved);
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                await db.metrics.put(metricToBeSaved);
                console.log(`updated metric in indexed db:`, metricToBeSaved);
            } catch (error) {
                console.error(error);
            }
        }

        toggleModal();
    };

    return (
        <>
            <h1>Metric</h1>
            <form className="input-form">
                <InputLine
                    task={metric}
                    setTask={setMetric}
                    taskAttribute="title"
                    labelText="Title"
                />
                <TagList task={metric} setTask={setMetric} />
                <DetailsLine
                    task={metric}
                    setTask={setMetric}
                    taskAttribute="description"
                    labelText="Details"
                />
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
                />
                {/* <DateTimeLine  task={task} setTask={setTask} dateAttribute="startDate" timeAttribute="startTime" dateLabel="Starts on" timeLabel="at"/> 
      <DateTimeLine  task={task} setTask={setTask} dateAttribute="endDate" timeAttribute="endTime" dateLabel="Ends by" timeLabel="at"/> 
      <InputLine  task={task} setTask={setTask} taskAttribute="targetIntensity" labelText="Target intensity"/>  
      <Switch  task={task} setTask={setTask} taskAttribute="trackIntensity" labelText="Track intensity"/>
      <TimeIntervalLine  task={task} setTask={setTask} taskAttribute="targetDuration" labelText="Target duration"/>   */}
                <div className="input-row submit">
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={toggleModal}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSave}
                    >
                        Done
                    </button>
                </div>
            </form>
        </>
    );
}

export default NewMetric;
