import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TaskRecord } from "../objects/record.js";
import { CurrentTime } from "../components/CurrentTime";
import { db } from "../data/db.js";

import HomeIcon from "../assets/home.svg";
import PauseIcon from "../assets/pause.svg";
import PlayIcon from "../assets/play.svg";
import StopIcon from "../assets/stop.svg";
import EditIcon from "../assets/edit.svg";
import ActivityIcon from "../assets/activity.svg";
import MoodIcon from "../assets/mood.svg";
import AddIcon from "../assets/add.svg";
import TagIcon from "../assets/tag.svg";

export default function RecordTasks({ tasks, records, setRecords }) {
    const [currentTask, setCurrentTask] = useState(null);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [totalSecs, setTotalSecs] = useState(0);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [playing, setPlaying] = useState(false);

    const navigate = useNavigate();

    function secondsDiff(dateTimeValue2, dateTimeValue1) {
        var differenceValue =
            (dateTimeValue2.getTime() - dateTimeValue1.getTime()) / 1000;
        return Math.abs(Math.round(differenceValue));
    }

    function startTask(taskID) {
        //console.log("UPDATED RECORDS");
        //console.log(records);

        if (currentTask)
            // not allowing multiple tasks running at the same time
            return;
        var ct = tasks.find((element) => element.id === taskID);
        setCurrentTask(ct);
        var cr = new TaskRecord(taskID);
        setCurrentRecord(cr);
        setCurrentTime(new Date());
        setTotalSecs(0);
        setPlaying(true);
    }

    function pauseCurrentTask() {
        var nowTime = new Date();
        setTotalSecs((prev) => prev + secondsDiff(nowTime, currentTime));
        setPlaying(false);
    }

    function restartCurrentTask() {
        setCurrentTime(new Date());
        setPlaying(true);
    }

    function recordCurrentTask() {
        currentRecord.end = new Date();
        currentRecord.inProgress = false;
        currentRecord.totalSecs =
            totalSecs + secondsDiff(new Date(), currentTime);
        setRecords((prev) => {
            return [...prev, currentRecord];
        });

        setTotalSecs(0);
        setCurrentRecord(null);
        setCurrentTask(null);
        setPlaying(false);
        console.log(records);
    }

    function TaskRow({ task }) {
        return (
            <div key={task.id}>
                <span className="col">
                    <label>{task.title.substring(0, 1)}</label>
                </span>
                <span className="maincol">
                    <input
                        value={task.title}
                        readOnly
                        onClick={() => startTask(task.id)}
                    />
                </span>
            </div>
        );
    }

    function PlayPanel() {
        if (currentRecord) {
            return (
                <section id="player">
                    <div key={currentRecord.id}>
                        <h4>Sun, May 3, 3 pm</h4>
                        <h3>{currentTask.title}</h3>
                        <h4>Elapsed time: {totalSecs} </h4>
                    </div>

                    <div className="buttonpanel">
                        {playing ? (
                            <button onClick={() => pauseCurrentTask()}>
                                <img src={PauseIcon} />
                            </button>
                        ) : (
                            <button onClick={() => restartCurrentTask()}>
                                <img src={PlayIcon} />
                            </button>
                        )}
                        <button onClick={() => recordCurrentTask()}>
                            <img src={StopIcon} />
                        </button>
                    </div>
                </section>
            );
        }
    }

    return (
        <>
            <header>
                <h1>
                    <Link to="/">
                        <img src={HomeIcon} />
                    </Link>
                    Tracking
                </h1>
                <h3>Record activities</h3>
            </header>
            <section id="taskList">
                <ul className="playlist">
                    {tasks
                        .filter((obj) => obj.enabled === true)
                        .map((obj) => (
                            <li key={obj.id}>
                                <TaskRow task={obj} />
                            </li>
                        ))}
                </ul>
                <PlayPanel />
            </section>
            <section>
                <div className="buttonpanel">
                    <button onClick={() => navigate("/recordtasks")}>
                        <img src={ActivityIcon} />
                    </button>
                    <button onClick={() => navigate("/recordmetrics")}>
                        <img src={MoodIcon} />
                    </button>
                </div>
            </section>
        </>
    );
}
