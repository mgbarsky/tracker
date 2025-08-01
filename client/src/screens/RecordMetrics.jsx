import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MetricRecord } from "../objects/record.js";
import { CurrentDate } from "../components/CurrentDate";
import { CurrentTime } from "../components/CurrentTime";
import { db } from "../data/db.js";

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

export default function RecordMetrics({ metrics }) {
   
    const [currentMetric, setCurrentMetric] = useState(null);
    const [currentRecord, setCurrentRecord] = useState(null);
      
    function startRecording(metricID) {       
        var mt = metrics.find((element) => element.id === metricID);
        setCurrentMetric(mt);   
        setCurrentRecord(null);  
    }

    async function saveCurrentRecord() {
        const elem = document.getElementById("I"+currentMetric.id);
        let newValue = elem.value;
        if (newValue !== currentMetric.lastValue) {
            db.metrics.update(currentMetric.id, {
                lastValue: newValue,
            });
        }
        var cr = new MetricRecord(currentMetric, newValue);
        setCurrentRecord(cr);  
        console.log(cr);      
        try {
            await db.records.add(cr);
            console.log(`added metric record to indexed db:`, cr);
        } catch (error) {
            console.error(error);
        }       
        setCurrentRecord(null);
        setCurrentMetric(null);               
    }

    function RecordPanel() {
        if (currentMetric) {
            return (
                <section className="ribbon" id="player">                    
                    <h3>{currentMetric.title}</h3> 
                    <h4>from {currentMetric.min} to {currentMetric.max}</h4>               
                    <div>
                        <input style={{fontSize:32+"px"}}
                            type="number"
                            id={"I" + currentMetric.id}
                            min={currentMetric.min}
                            max={currentMetric.max}
                            step={currentMetric.step}
                            defaultValue={currentMetric.lastValue}            
                        />                  
                    </div>                        
                    <nav>                    
                        <Link onClick={(e) => saveCurrentRecord(e)}>
                            <img src={SubmitIcon} />
                        </Link>                        
                    </nav>
                </section>
            );
        }
    }  

    return (
        <>
            <main>
                <header>
                    <h1>
                        Tracking
                    </h1>
                    <h3>Record metrics</h3>
                </header>
                <section id="moodlist">
                    <ul className="playlist">
                        {metrics
                            .filter((obj) => obj.enabled === true)
                            .map((obj) => (                                
                                <li key={obj.id}  id={"LI"+obj.id} onClick={() => startRecording(obj.id)}>
                                    <span>
                                        <label>{obj.title.substring(0, 1).toUpperCase()}</label>
                                    </span>
                                    {obj.title}
                                </li>                            
                            ))}
                    </ul>
                </section>
            </main>
            <RecordPanel />
            <nav>
                <Link to="/recordmetrics"><img src={MoodIcon} /></Link>
                <Link to="/"><img src={HomeIcon} /></Link>
                <Link to="/recordtasks"><img src={ActivityIcon} /></Link>
            </nav>
        </>
    );   
}
