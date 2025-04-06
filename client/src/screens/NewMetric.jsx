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
            <header>
                {editMode ?   
                (
                    <h2><img src="assets/edit.svg"/><img src="assets/mood.svg"/>Edit metric</h2>
                )
                :
                (
                    <h2><img src="assets/add.svg"/><img src="assets/mood.svg"/>New metric</h2>
                )
                }		       		
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
                <TagList task={metric} setTask={setMetric} />
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

export default NewMetric;
