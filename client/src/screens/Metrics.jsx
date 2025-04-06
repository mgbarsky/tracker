import React, { useState } from "react";
import NewMetric from "../screens/NewMetric";
import { Modal } from "react-bootstrap";

import { Metric } from "../objects/metric";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import { db } from "../data/db";

export default function Metrics({ metrics }) {
    const [metric, setMetric] = useState(new Metric());
    const [editMode, setEditMode] = useState(false);
    const [showMetricModal, setShowMetricModal] = useState(false);

    const navigate = useNavigate();

    function MetricRow({ obj }) {
        if (obj.enabled) {
            return (
                <>
                    <input
                        type="text"
                        className="form-control"
                        value={obj.title}
                        readOnly={true}
                    />
                    <div className="input-group-btn">
                        <button
                            className="btn btn-outline-dark"
                            onClick={() => editMetric(obj.id)}
                        >
                            ...
                        </button>
                    </div>
                    <div className="input-group-btn">
                        <button
                            className="btn btn-outline-danger"
                            onClick={() => deleteMetric(obj.id)}
                        >
                            x
                        </button>
                    </div>
                </>
            );
        }
        return (
            <input
                className="form-control "
                value={obj.title}
                readOnly={true}
                disabled
            />
        );
    }

    const toggleMetricModal = () => {
        setShowMetricModal(!showMetricModal);
    };

    async function deleteMetric(id) {
        try {
            await db.metrics.delete(id);
            console.log(`Deleted metric in indexed db: ${id}`);
        } catch (error) {
            console.error(error);
        }
    }

    function editMetric(id) {
        console.log(metrics);
        const m = metrics.find((obj) => obj.id === id);
        setMetric(m);
        setEditMode(true);
        console.log("edit metric", m);
        toggleMetricModal();
    }

    async function toogleEnabled(id) {
        const currentMetric = metrics.find((metric) => metric.id === id);

        if (!currentMetric) {
            console.log("current metric is not found");
            return;
        }

        try {
            await db.metrics.update(id, {
                enabled: !currentMetric.enabled,
            });

            console.log(`toggle enabled: ${id}`);
        } catch (error) {
            console.error(error);
        }
    }

    function newMetric() {
        setEditMode(false);
        setMetric(new Metric());
        toggleMetricModal();
    }

    return (
        <>
            <header>
                <h1><a href="/"><img src="assets/home.svg"/></a>Tracker</h1>
                <h3>Metrics</h3>
	        </header>
            <main>		
		        <ul className='menulist'>
                    <li>
                        <span className="col">&nbsp;</span>
                        <span className="maincol">&nbsp;</span>
                        <span className="col"><a onClick={() => newMetric()}>
                            <img src="assets/add.svg"/></a>
                        </span>
                    </li>     
            
                    {metrics.map((obj) => (
                        <li key={obj.id}>
                            <span className="col">
                                <input                                    
                                    type="range"
                                    min="0"
                                    max="1"
                                    value={obj.enabled?"1":"0"}
                                    onChange={() => toogleEnabled(obj.id)}
                                />
                                {obj.enabled}
                            </span>
                            <span className="maincol">
                                <input                           
                                    value={obj.title} 
                                    readOnly
                                    onClick={() => editMetric(obj.id)}                          
                                />
                            </span>
                            <span className="col">
                                <a onClick={() => deleteMetric(obj.id)}>
                                    <img src="assets/delete.svg"/>
                                </a>
                            </span>
                        </li>
                    ))}
                </ul>
            </main>                

            {showMetricModal && (
                <Modal show={showMetricModal} fullscreen={false}>                    
                    <NewMetric
                        metrics={metrics}
                        toggleModal={toggleMetricModal}
                        currentMetric={metric}
                        editMode={editMode}
                    />                    
                </Modal>
            )}
            
        </>
    );
}
