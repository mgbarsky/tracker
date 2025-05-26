import { useEffect, useState } from "react";
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

    //const [tasks, setTasks] = useState(Task.defaultTasks);
    // const [metrics, setMetrics] = useState(Metric.defaultMetrics);
    const [records, setRecords] = useState([]);

    // temporary. Will need more persistent way of storing
    const [metricValMap, setMetricValMap] = useState({});

    useEffect(() => {
        if (metrics?.length) {
            const initialMap = {};
            for (const metric of metrics) {
                initialMap[metric.id] = metric.max / 2;
            }
            setMetricValMap(initialMap);
        }
    }, [metrics]);

    return (
        <>
            <Routes basename="/myapp">
                <Route path="/" element={<Home />}></Route>
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
                    element={
                        <RecordTasks
                            tasks={tasks}
                            records={records}
                            setRecords={setRecords}
                        />
                    }
                ></Route>
                <Route
                    path="/recordmetrics"
                    element={
                        <RecordMetrics
                            metrics={metrics}
                            records={records}
                            setRecords={setRecords}
                            metricValMap={metricValMap}
                            setMetricValMap={setMetricValMap}
                        />
                    }
                ></Route>
            </Routes>
        </>
    );
}

export default App;
