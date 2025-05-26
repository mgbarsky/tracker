import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MetricRecord } from "../objects/record.js";
import { CurrentTime } from "../components/CurrentTime";
import { db } from "../data/db.js";

export default function RecordMetrics({
    metrics,
    records,
    setRecords,
    metricValMap,
    setMetricValMap,
}) {
    const [currentMetric, setCurrentMetric] = useState(null);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [totalSecs, setTotalSecs] = useState(0);
    const [currentTime, setCurrentTime] = useState(new Date());

    const toggleSelectedMetric = (event, metricID) => {
        event.preventDefault();

        if (currentMetric?.id === metricID) {
            setCurrentMetric(null);
            return;
        }

        var cm = metrics.find((element) => element.id === metricID);
        setCurrentMetric(cm);

        startMetric(metricID);
    };

    function metricChanged(metricID, event) {
        const rawValue = event.target.value;
        setMetricValMap((prev) => ({
            ...prev,
            [metricID]: rawValue,
        }));
    }

    useEffect(() => {
        console.log(records);
    }, [records]);

    function secondsDiff(dateTimeValue2, dateTimeValue1) {
        const differenceValue =
            (dateTimeValue2.getTime() - dateTimeValue1.getTime()) / 1000;
        return Math.abs(Math.round(differenceValue));
    }

    function restartCurrentMetric() {
        setCurrentTime(new Date());
    }

    function pauseCurrentMetric() {
        const nowTime = new Date();
        setTotalSecs((prev) => prev + secondsDiff(nowTime, currentTime));
    }

    function recordCurrentMetric() {
        currentRecord.end = new Date();
        currentRecord.inProgress = false;
        currentRecord.totalSecs =
            totalSecs + secondsDiff(new Date(), currentTime);
        setRecords((prev) => {
            return [...prev, currentRecord];
        });
        setTotalSecs(0);
        setCurrentRecord(null);
        setCurrentMetric(null);
    }

    //returns different GUI depending on the state of the task - in progress or idle
    function MetricRow({ metric }) {
        return (
            <div
                key={metric.id}
                className={`cursor-pointer 
                ${currentMetric?.id === metric.id ? "selected-tag" : ""} `}
                onClick={(event) => toggleSelectedMetric(event, metric.id)}
            >
                <span>
                    <label>{metric.title}</label>
                </span>
                <span>
                    <input
                        type="number"
                        min={metric.min}
                        max={metric.max}
                        step={metric.step}
                        value={metricValMap[metric.id] ?? ""}
                        onChange={(e) => metricChanged(metric.id, e)}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <label> out of {metric.max}</label>
                </span>
            </div>
        );
    }

    function startMetric(metricID) {
        if (currentMetric)
            // not allowing multiple tasks running at the same time
            return;
        var cm = metrics.find((element) => element.id === metricID);
        setCurrentMetric(cm);
        var cr = new MetricRecord(metricID, metricValMap[metricID]);
        setCurrentRecord(cr);
        setCurrentTime(new Date());
        setTotalSecs(0);
    }

    //adds all metric levels to the record
    async function recordAllMetrics() {}

    function PlayPanel() {
        if (currentMetric) {
            return (
                <section id="player">
                    {/* <div key={currentRecord.id}>
                        <h4>Sun, May 3, 3 pm</h4>
                        <h3>{currentMetric.title}</h3>
                        <h4>Elapsed time: {currentRecord.totalTime} </h4>
                    </div> */}

                    <div className="buttonpanel">
                        <button onClick={() => restartCurrentMetric()}>
                            <img src="assets/play.svg" />
                        </button>
                        <button onClick={() => pauseCurrentMetric()}>
                            <img src="assets/pause.svg" />
                        </button>
                        <button onClick={() => recordCurrentMetric()}>
                            <img src="assets/stop.svg" />
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
                    <a href="/">
                        <img src="assets/home.svg" />
                    </a>
                    Tracking
                </h1>
                <h3>Record metrics</h3>
            </header>
            <ul className="playlist">
                {metrics.map((obj) => (
                    <li key={obj.id}>
                        <MetricRow metric={obj} />
                    </li>
                ))}
            </ul>
            <PlayPanel />
            <section>
                <div className="buttonpanel">
                    <button>
                        <a href="/recordtasks">
                            <img src="assets/activity.svg" />
                        </a>
                    </button>
                    <button>
                        <a>
                            <img src="assets/mood.svg" />
                        </a>
                    </button>
                </div>
            </section>
        </>
    );
}
