import { useState, useEffect } from "react";

import "./App.css";

import RecordTasks from "../screens/RecordTasks";
import RecordMetrics from "../screens/RecordMetrics";
import Home from "./Home";
import Tasks from "../screens/Tasks";
import TaskTags from "../screens/TaskTags";
import Metrics from "../screens/Metrics";
import MetricTags from "../screens/MetricTags";
import { Metric } from "../objects/metric.js";
import { Task } from "../objects/task.js";

import { Routes, Route } from "react-router-dom";

import { db, initializeDB } from "../data/db.js";

import { useLiveQuery } from "dexie-react-hooks";

function App() {
    initializeDB();
    const tasks = useLiveQuery(() => db.tasks.toArray(), [], []);
    const taskTags = useLiveQuery(() => db.taskTags.toArray(), [], []);
    const metrics = useLiveQuery(() => db.metrics.toArray(), [], []);
    const metricTags = useLiveQuery(() => db.metricTags.toArray(), [], []);
    const records = useLiveQuery(() => db.records.toArray(), [], []);    
    //console.log(records)
    
    useEffect(() => {
        console.log(records)
    }, [records])

    return (
        <>
            <Routes basename="/tracker">
                <Route path="/" element={<Home records={records}/>}></Route>
                <Route
                    path="/tasks"
                    element={<Tasks tasks={tasks} taskTags={taskTags} />}
                ></Route>
                <Route
                    path="/tasktags"
                    element={<TaskTags taskTags={taskTags} />}
                ></Route>
                <Route
                    path="/metrics"
                    element={
                        <Metrics metrics={metrics} metricTags={metricTags} />
                    }
                ></Route>
                <Route
                    path="/metrictags"
                    element={<MetricTags metricTags={metricTags} />}
                ></Route>
                <Route
                    path="/recordtasks"
                    element={<RecordTasks tasks={tasks} />}
                ></Route>
                <Route
                    path="/recordmetrics"
                    element={<RecordMetrics metrics={metrics} />}
                ></Route>
            </Routes>
        </>
    );
}

export default App;
