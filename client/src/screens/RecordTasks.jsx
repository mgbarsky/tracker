import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TaskRecord } from "../objects/record.js";
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

export default function RecordTasks({ tasks }) {
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

    async function recordCurrentTask() {
        currentRecord.end = new Date();
        currentRecord.inProgress = false;
        currentRecord.totalSecs =
            totalSecs + secondsDiff(new Date(), currentTime);
        /*setRecords((prev) => {
            return [...prev, currentRecord];
t         });*/
        // add this record to the database
        try {
          await db.records.add(currentRecord);
          console.log(`added action record to indexed db:`, currentRecord);
        } catch (error) {
            console.error(error);
        }

        setTotalSecs(0);
        setCurrentRecord(null);
        setCurrentTask(null);
        setPlaying(false);
     
    }

    function TaskRow({ task }) {
        return (
            <li key={task.id}  onClick={() => startTask(task.id)}>
                <span>
                    <label>{task.title.substring(0, 1).toUpperCase()}</label>
                </span>
                {task.title}
            </li>
        );
    }

    function PlayPanel() {
        if (currentRecord) {
            return (
                <section key={currentRecord.id} className="ribbon" id="player">
                    <h4>Sun, May 3, 3 pm</h4>
                    <h3>{currentTask.title}</h3>
                    <h4>Elapsed time: {totalSecs} </h4>                  
                    <nav>
                        {playing ? (
                            <Link onClick={() => pauseCurrentTask()}>
                                <img src={PauseIcon} />
                            </Link>
                        ) : (
                            <Link onClick={() => restartCurrentTask()}>
                                <img src={PlayIcon} />
                            </Link>
                        )}
                        <Link onClick={() => recordCurrentTask()}>
                            <img src={StopIcon} />
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
                    <h3>Record activities</h3>
                </header>
                <section id="taskList">
                    <ul className="playlist">
                        {tasks
                            .filter((obj) => obj.enabled === true)
                            .map((obj) => (                                
                                <li key={obj.id}  onClick={() => startTask(obj.id)}>
                                    <span>
                                        <label>{obj.title.substring(0, 1).toUpperCase()}</label>
                                    </span>
                                    {obj.title}
                                </li>                            
                            ))}
                    </ul>
                </section>
            </main>
            <PlayPanel />
            <nav>
                <Link to="/recordmetrics"><img src={MoodIcon} /></Link>
                <Link to="/"><img src={HomeIcon} /></Link>
                <Link to="/recordtasks"><img src={ActivityIcon} /></Link>
            </nav>
        </>
    );
}
