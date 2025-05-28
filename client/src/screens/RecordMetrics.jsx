import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MetricRecord } from "../objects/record.js";
import { CurrentTime } from "../components/CurrentTime";
import { db } from "../data/db.js";

export default function RecordMetrics({ metrics, records, setRecords }) {
    const navigate = useNavigate();
    const [metricValues, setMetricValues] = useState({});

    const handleInputChange = (id, value) => {
        setMetricValues((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    useEffect(() => {
        console.log(records);

        const initialValues = {};
        metrics.forEach((metric) => {
            initialValues[metric.id] = metric.value;
        });
        setMetricValues(initialValues);
    }, [records, metrics]);

    const recordChangedMetrics = async (e) => {
        e.preventDefault();

        const changedMetrics = [];

        for (const metric of metrics) {
            const current = Number(metricValues[metric.id]);
            if (current !== metric.value) {
                changedMetrics.push({
                    ...metric,
                    value: current,
                });
            }
        }

        if (changedMetrics.length === 0) {
            console.log("No metrics got changed so no record updates");
            return;
        }

        const metricRecords = [];
        for (const changedMetric of changedMetrics) {
            const metricRecord = new MetricRecord(
                changedMetric.id,
                changedMetric.value
            );
            metricRecords.push(metricRecord);

            try {
                await db.metrics.update(changedMetric.id, {
                    value: changedMetric.value,
                });
            } catch (error) {
                console.error(error);
            }
        }

        setRecords((prev) => {
            return [...prev, ...metricRecords];
        });

        console.log("Changed metrics:", changedMetrics);
    };

    //returns different GUI depending on the state of the task - in progress or idle
    function MetricRow({ metric }) {
        return (
            <div key={metric.id}>
                <span>
                    <label>{metric.title}</label>
                </span>
                <span>
                    <input
                        type="number"
                        min={metric.min}
                        max={metric.max}
                        step={metric.step}
                        value={metricValues[metric.id]}
                        onChange={(e) =>
                            handleInputChange(metric.id, e.target.value)
                        }
                    />
                    <label> out of {metric.max}</label>
                </span>
            </div>
        );
    }

    //adds all metric levels to the record
    async function recordAllMetrics() {}

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
            <button onClick={recordChangedMetrics}>
                <img src="assets/record.svg" />
            </button>
            <section>
                <div className="buttonpanel">
                    <button onClick={() => navigate("/recordtasks")}>
                        <img src="assets/activity.svg" />
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
