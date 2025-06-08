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

import HomeIcon from "../assets/home.svg";
import SetUpIcon from "../assets/setup.svg";
import TrackIcon from "../assets/track.svg";
import ReportIcon from "../assets/report.svg";
import ExploreIcon from "../assets/explore.svg";
import ActivityIcon from "../assets/activity.svg";
import MoodIcon from "../assets/mood.svg";
import { saveCSVFile } from "../utilities/save_to_csv_file.js";

// const sampleRecords = [
//     {
//         id: "1f1d231c-c1c7-4010-b9b6-1bb92d975d63",
//         metricID: "c482ca3f-6079-4852-8a1c-f0d887eb241c",
//         metricLevel: "2",
//         start: "2025-06-08T18:07:37.590Z",
//         dateKey: "2025-06-08",
//         year: 2025,
//         month: 6,
//         day: 8,
//         weekDay: 0,
//     },
//     {
//         id: "a048b22e-3b85-4819-9493-3b593ea0e2d7",
//         taskID: "444c8341-6ab4-420e-8a73-4756abd6f1a2",
//         start: "2025-06-08T18:07:20.528Z",
//         dateKey: "2025-06-08",
//         end: "2025-06-08T18:07:22.135Z",
//         inProgress: false,
//         year: 2025,
//         month: 6,
//         day: 8,
//         weekDay: 0,
//         totalSecs: 2,
//     },
//     {
//         id: "a3b3aa53-eee6-44d9-b9cc-e1c29a31bf97",
//         metricID: "5ffc91a3-f01d-4160-82d3-72ee03a6c793",
//         metricLevel: "3",
//         start: "2025-06-08T18:07:37.590Z",
//         dateKey: "2025-06-08",
//         year: 2025,
//         month: 6,
//         day: 8,
//         weekDay: 0,
//     },
//     {
//         id: "be1a37a6-e586-417d-8e7f-2f0e6ffcc3a2",
//         metricID: "ccd32eaf-6d8d-4f72-8eb4-3a1806d1e7c9",
//         metricLevel: "100",
//         start: "2025-06-08T18:07:37.590Z",
//         dateKey: "2025-06-08",
//         year: 2025,
//         month: 6,
//         day: 8,
//         weekDay: 0,
//     },
// ];

function Home({ records }) {
    const navigate = useNavigate();

    const generateCsv = async () => {
        const generatedJsonData = [];
        for (const record of records) {
            const generatedJsonObj = {};
            if ("metricID" in record) {
                // query metric
                const metric = await db.metrics.get(record.metricID);

                generatedJsonObj["title"] = metric.title;
                generatedJsonObj["type"] = "metric";
                generatedJsonObj["level"] = record.metricLevel;
                generatedJsonObj["dateKey"] = record.dateKey;
                generatedJsonObj["start"] = record.start;
                generatedJsonObj["year"] = record.year;
                generatedJsonObj["month"] = record.month;
                generatedJsonObj["day"] = record.day;
                generatedJsonObj["weekDay"] = record.weekDay;
            } else if ("taskID" in record) {
                // query task
                const task = await db.tasks.get(record.taskID);

                generatedJsonObj["title"] = task.title;
                generatedJsonObj["type"] = "task";
                generatedJsonObj["totalSecs"] = record.totalSecs;
                generatedJsonObj["dateKey"] = record.dateKey;
                generatedJsonObj["start"] = record.start;
                generatedJsonObj["year"] = record.year;
                generatedJsonObj["month"] = record.month;
                generatedJsonObj["day"] = record.day;
                generatedJsonObj["weekDay"] = record.weekDay;
            }

            generatedJsonData.push(generatedJsonObj);
        }

        console.log(generatedJsonData);

        const headers = [
            "title",
            "type",
            "totalSecs",
            "level",
            "dateKey",
            "start",
            "year",
            "month",
            "day",
            "weekDay",
        ];

        await saveCSVFile(generatedJsonData, headers);
    };

    return (
        <>
            <header>
                <h1>
                    <Link>
                        <img src={HomeIcon} />
                    </Link>
                    Tracker
                </h1>
                <h3>Self-study exercise</h3>
            </header>
            <main>
                <section>
                    <h2>
                        <img src={SetUpIcon} />
                        Setup
                    </h2>
                    <ul className="menulist">
                        <li>
                            <Link to="/tasks">Activities</Link>
                        </li>
                        <li>
                            <Link to="/taskTags">Activity tags</Link>
                        </li>
                        <li>
                            <Link to="/metrics">Metrics</Link>
                        </li>
                        <li>
                            <Link to="/metricTags">Metric tags</Link>
                        </li>
                    </ul>
                </section>
                <section>
                    <h2>
                        <img src={TrackIcon} />
                        Track
                    </h2>
                    <div className="buttonpanel">
                        <button onClick={() => navigate("/recordtasks")}>
                            <img src={ActivityIcon} />
                        </button>
                        <button onClick={() => navigate("/recordmetrics")}>
                            <img src={MoodIcon} />
                        </button>
                    </div>
                </section>
                <section>
                    <h2>
                        <img src={ReportIcon} />
                        Explore
                    </h2>
                    <div className="buttonpanel">
                        <button onClick={generateCsv}>
                            <img src={ExploreIcon} />
                        </button>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Home;
