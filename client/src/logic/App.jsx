import { useState } from "react";
import "./App.css";

import Schedule from "../screens/Schedule";
import Tasks from "../screens/Tasks";
import Metrics from "../screens/Metrics";
import { Metric } from "../objects/metric.js";
import { Task } from "../objects/task.js";

import { Routes, Route } from "react-router-dom";

import { db,  initializeDB } from "../data/db.js";

function App() {
  
    initializeDB()

    const [tasks, setTasks] = useState(Task.defaultTasks);
    const [metrics, setMetrics] = useState(Metric.defaultMetrics);
    const [records, setRecords] = useState([]);

    return (
        <>
            <Routes basename="/myapp">
                <Route
                    path="/"
                    element={
                        <Schedule
                            tasks={tasks}
                            metrics={metrics}
                            records={records}
                            setRecords={setRecords}
                        />
                    }
                ></Route>
                <Route
                    path="/tasks"
                    element={<Tasks tasks={tasks} setTasks={setTasks} />}
                ></Route>
                <Route
                    path="/metrics"
                    element={
                        <Metrics metrics={metrics} setMetrics={setMetrics} />
                    }
                ></Route>
            </Routes>
        </>
    );
}

export default App;
