import { useState } from "react";
import "./App.css";

import RecordTasks from "../screens/RecordTasks";
import Tasks from "../screens/Tasks";
import Metrics from "../screens/Metrics";
import { Metric } from "../objects/metric.js";
import { Task } from "../objects/task.js";

import { Routes, Route } from "react-router-dom";

import { db, initializeDB } from "../data/db.js";

import { useLiveQuery } from "dexie-react-hooks";
import { Link, useNavigate } from "react-router-dom";

function Home() {  
    const navigate = useNavigate();
    return (
        <>          
            <header>
                <h1><Link><img src="assets/home.svg"/></Link>Tracker</h1>
                <h3>Self-study exercise</h3>
            </header>
            <main>
                <section>
                    <h2><img src="assets/setup.svg"/>Setup</h2>
                    <ul className='menulist'>
                        <li><Link to="/tasks">Activities</Link></li>
                        <li><Link to="/taskTags">Activity tags</Link></li>
                        <li><Link to="/metrics">Metrics</Link></li>
                        <li><Link to="/metricTags">Metric tags</Link></li>
                    </ul>
                </section>
                <section>
                    <h2><img src="./assets/track.svg"/>Track</h2>	
                    <div className="buttonpanel">                        
                        <button onClick={() => navigate("/recordtasks")}><img src="assets/activity.svg"/></button>
                        <button onClick={() => navigate("/recordmetrics")}><img src="assets/mood.svg"/></button>
                    </div>
                </section>
                <section>
                    <h2><img src="assets/report.svg"/>Explore</h2>	
                    <div className="buttonpanel">
                        <button><img src="assets/explore.svg"/></button>				
                    </div>
                </section>	
            </main>    
        </>
    );
}

export default Home;