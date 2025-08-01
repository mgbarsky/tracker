import { useState } from "react";
//import "./App.css";

import RecordTasks from "../screens/RecordTasks";
import Tasks from "../screens/Tasks";
import Metrics from "../screens/Metrics";
import { Metric } from "../objects/metric.js";
import { Task } from "../objects/task.js";
import { downloadData } from "../utils/data.js";

import { Routes, Route } from "react-router-dom";

import { db, initializeDB } from "../data/db.js";

import { useLiveQuery } from "dexie-react-hooks";
import { Link, useNavigate } from "react-router-dom";

import ActivityIcon from "../assets/activity.svg";
import AddIcon from "../assets/add.svg";
import DeleteIcon from "../assets/delete.svg";
import ExploreIcon from "../assets/explore.svg";
import GearIcon from "../assets/gear.svg";
import GearIconM from "../assets/gearM.svg";
import HomeIcon from "../assets/home.svg";
import MoodIcon from "../assets/mood.svg";
import PauseIcon from "../assets/pause.svg";
import PlayIcon from "../assets/play.svg";
import StopIcon from "../assets/stop.svg";
import SubmitIcon from "../assets/submit.svg";
import TagIcon from "../assets/tag.svg";
import TagIconM from "../assets/tagM.svg";

function Home({ records }) {
    const navigate = useNavigate();

    const localData = async () => {
        downloadData(records, db);
    }

    const clearLocalRecords = async () => {
        // Alternatively, to clear a specific table
        db.table('records').clear().then(() => {
            alert('Records cleared successfully');
        }).catch((error) => {
            console.error('Error clearing records:', error);
        });
    }

    return (
        <>
            <main>
                <header>
                <h1>                    
                    Tracker
                </h1>
                <h3>A Self-Study Exercise</h3>
            </header>            
                <section>
                    <h2>                      
                        Setup
                    </h2>
                    <ul className="menulist">
                        <li id='setActivity' onClick={() => navigate('/tasks')}><span><img src={GearIcon} /></span>
                            Activities
                        </li>
                        <li id='setActivityTag' onClick={() => navigate('/taskTags')}><span><img src={TagIcon} /></span>
                            Activity tags
                        </li>
                        <li id='setMood' onClick={() => navigate('/metrics')}><span><img src={GearIconM} /></span>
                            Metrics
                        </li>
                        <li id='setMoodTag' onClick={() => navigate('/metricTags')}><span><img src={TagIconM} /></span>
                            Metric tags
                        </li>
                    </ul>
                </section>               
                <section>
                    <h2>                        
                        Explore
                    </h2>
                    <ul className="menulist">
                        <li id='deleterecords' onClick={clearLocalRecords}>
                           <span></span>Clear records
                        </li>
                        <li id='download' onClick={localData}>
                           <span></span>Download data
                        </li>
                        <li id='reports' style={{opacity:"0.3"}}>
                           <span></span>Reports
                        </li>
                    </ul>
                </section>
            </main>
            <nav>
                <Link to="/recordmetrics"><img src={MoodIcon} /></Link>
                <Link to="/"><img src={HomeIcon} /></Link>
                <Link to="/recordtasks"><img src={ActivityIcon} /></Link>
	        </nav>
        </>
    );
}

export default Home;
