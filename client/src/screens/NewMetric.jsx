import React, { useState } from "react";

import InputLine from "../components/InputLine";
import DetailsLine from "../components/DetailsLine";
import TagList from "../components/TagList";
import NumberLine from "../components/NumberLine";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";

import { Metric } from "../objects/metric.js";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../data/db";

import EditIcon from "../assets/edit.svg";
import MoodIcon from "../assets/mood.svg";
import AddIcon from "../assets/add.svg";

/*
  {
    title: "",
    tags: [{}, {}]
  }
*/

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
        console.log(metric);

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

        if (!editMode) {
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
            <header>
                {editMode ? (
                    <h2>
                        <img src={EditIcon} />
                        <img src={MoodIcon} />
                        Edit metric
                    </h2>
                ) : (
                    <h2>
                        <img src={AddIcon} />
                        <img src={MoodIcon} />
                        New metric
                    </h2>
                )}
            </header>
            <main>
                <InputLine
                    task={metric}
                    setTask={setMetric}
                    taskAttribute="title"
                    labelText="Title"
                />

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
                <TagList
                    task={metric}
                    setTask={setMetric}
                    taskTags={metricTags}
                />
                <div className="buttonpanel">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={toggleModal}>Cancel</button>
                </div>
            </main>
        </>
    );
}

export default NewMetric;
