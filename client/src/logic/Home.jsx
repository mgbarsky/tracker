import { useState } from "react";
import "./App.css";

import RecordTasks from "../screens/RecordTasks";
import Tasks from "../screens/Tasks";
import Metrics from "../screens/Metrics";
import { Metric } from "../objects/metric.js";
import { Task } from "../objects/task.js";

import { Routes, Route, useNavigate } from "react-router-dom";

import { db, initializeDB } from "../data/db.js";

import { useLiveQuery } from "dexie-react-hooks";

function Home() {
    const navigate = useNavigate();
    return (
        <>
            <header>
                <h1>
                    <a>
                        <img src="assets/home.svg" />
                    </a>
                    Tracker
                </h1>
                <h3>Self-study exercise</h3>
            </header>
            <main>
                <section>
                    <h2>
                        <img src="assets/setup.svg" />
                        Setup
                    </h2>
                    <ul className="menulist">
                        <li>
                            <a href="/tasks">Activities</a>
                        </li>
                        <li>
                            <a href="/taskTags">Activity tags</a>
                        </li>
                        <li>
                            <a href="/metrics">Metrics</a>
                        </li>
                        <li>
                            <a href="/metricTags">Metric tags</a>
                        </li>
                    </ul>
                </section>
                <section>
                    <h2>
                        <img src="./assets/track.svg" />
                        Track
                    </h2>
                    <div className="buttonpanel">
                        <button onClick={() => navigate("/recordtasks")}>
                            <img src="assets/activity.svg" />
                        </button>
                        <button onClick={() => navigate("/recordmetrics")}>
                            <img src="assets/mood.svg" />
                        </button>
                    </div>
                </section>
                <section>
                    <h2>
                        <img src="assets/report.svg" />
                        Explore
                    </h2>
                    <div className="buttonpanel">
                        <button>
                            <img src="assets/explore.svg" />
                        </button>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Home;
