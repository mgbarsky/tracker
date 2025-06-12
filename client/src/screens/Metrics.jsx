import React, { useState } from "react";
import NewMetric from "../screens/NewMetric";


import { Metric } from "../objects/metric";

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

export default function Metrics({ metrics, metricTags }) {
    const [metric, setMetric] = useState(new Metric());
    const [editMode, setEditMode] = useState(false);
    const [showMetricModal, setShowMetricModal] = useState(false);

    const navigate = useNavigate();

    const toggleMetricModal = () => {
        setShowMetricModal(!showMetricModal);
    };

    async function deleteMetric(id, docEvent) {
        docEvent.stopPropagation();
        try {
            await db.metrics.delete(id);
            console.log(`Deleted metric in indexed db: ${id}`);
        } catch (error) {
            console.error(error);
        }
    }

    function editMetric(id) {
        // console.log(metrics);
        const m = metrics.find((obj) => obj.id === id);
        setMetric(m);
        setEditMode(true);
        // console.log("edit metric", m);
        toggleMetricModal();
    }

    function newMetric() {
        setEditMode(false);
        setMetric(new Metric());
        toggleMetricModal();
    }

    async function toogleEnabled(id, docEvent) {
        docEvent.stopPropagation();
        const currentMetric = metrics.find((metric) => metric.id === id);
        const DOMElem = docEvent.target.parentElement;

        if (!currentMetric) {
            console.log("current metric is not found");
            return;
        }

        try {
            await db.metrics.update(id, {
                enabled: !currentMetric.enabled,
            });

            if (!currentMetric.enabled) {
                DOMElem.className ='';
            }
            else {
                DOMElem.className ='disabled';
            }
            // console.log(`toggle enabled: ${id}`);
        } catch (error) {
            console.error(error);
        }
    }    

    return (
        <>           
            <main>
                 <header>
                    <h1>                       
                        Tracker
                    </h1>
                    <h3>Metrics</h3>
                </header>
                <ul className="editlist">                
                    {metrics.map((obj) => (
                        <li key={obj.id} 
                            onClick={() => editMetric(obj.id)} 
                            className={obj.enabled ? "" : "disabled"}
                        >
                            <span 
                                onClick={(e) => toogleEnabled(obj.id, e)}>  
                                {obj.title.substring(0,1).toUpperCase()}
                            </span>
                            <h4>{obj.title}</h4>
                            <Link 
                                className='enable' 
                                onClick={(e) => toogleEnabled(obj.id, e)}>
                            </Link>
                            <Link className='delete' 
                                onClick={(e) => deleteMetric(obj.id,e)}>                                    
                            </Link>
                        </li>
                    ))}
                </ul>
            </main>
            <section className='ribbon' id='editor'>
                <nav>
                    <Link onClick={() => newMetric()}>
                        <img src={AddIcon} />
                    </Link>
                </nav>
	        </section>
            <nav>
                <Link to="/recordmetrics"><img src={MoodIcon} /></Link>
                <Link to="/"><img src={HomeIcon} /></Link>
                <Link to="/recordtasks"><img src={ActivityIcon} /></Link>
            </nav>

            {showMetricModal && (
                 <div id='backdrop'>
                    <NewMetric
                        metrics={metrics}
                        toggleModal={toggleMetricModal}
                        currentMetric={metric}
                        metricTags={metricTags}
                        editMode={editMode}
                    />
                </div>
            )}
        </>
    );
}
