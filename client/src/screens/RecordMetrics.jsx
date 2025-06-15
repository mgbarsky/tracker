import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MetricRecord } from "../objects/record.js";
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

export default function RecordMetrics({ metrics }) {
    const InputHandler = (() => {
        let cursorPosX = null,
            target = null,
            cursorDelta = 0;

        addEventListener('pointerup', (e) => {
            if (target === null) {
                return;
            } else if (cursorDelta === 0) {
                console.log('open input');
            } else {
                let userWidth = target.querySelector('.user').style.width;
                target.querySelector('.actual').style.width = `${userWidth}`;
            }

            cursorDelta = 0;
            target = null;
        });

        addEventListener('touchend', (e) => {
            if (target === null) {
                return;
            } else if (cursorDelta === 0) {
                console.log('open input');
            } else {
                let userWidth = target.querySelector('.user').style.width;
                target.querySelector('.actual').style.width = `${userWidth}`;
            }

            cursorDelta = 0;
            target = null;
        });
        addEventListener('pointerrawupdate', (e) => {
            cursorPosX = e.x;
            if (target === null) {
                return;
            } else {
                let totalWidth = target.getBoundingClientRect().right - target.getBoundingClientRect().left,
                    calcWidth = cursorPosX - target.getBoundingClientRect().left;
                target.querySelector('.user').style.width = `${calcWidth}px`;

                cursorDelta += e.movementX;
            }
        });

        return {
            get target() {
                return target;
            },
            set target(t) {
                while (t.nodeName !== 'LI') {
                    t = t.parentElement;
                }
                target = t;
            },
        };
    })();

    const navigate = useNavigate();

    async function handleInputChange(id, newValue) {
        try {
            await db.metrics.update(id, {
                lastValue: newValue,
            });
        } catch (error) {
            console.error(error);
        }
    }

    function MetricRow({ metric }) {
        return (
            <>
                <h4>{metric.title}</h4>               
                <span>
                    <input 
                        type="number"
                        id={metric.id}
                        min={metric.min}
                        max={metric.max}
                        step={metric.step}
                        defaultValue={metric.lastValue}                       
                    />
                     / {metric.max}
                </span>
                <div className='user'></div>
				<div className='actual'></div>
            </>
        );
    }

    //adds all metric levels to the records (even the ones that did not change)
    async function recordAllMetrics() {
        // build an array of all metric records
        const metricRecords = [];
        for (const metric of metrics) {
            if(metric.enabled){
                const elem = document.getElementById(metric.id);
                let newValue = elem.value;
                if (newValue !== metric.lastValue) {
                    db.metrics.update(metric.id, {
                        lastValue: newValue,
                    });
                }
                const metricRecord = new MetricRecord(metric.id, newValue);
                metricRecords.push(metricRecord);
            }
        }

        // add all these records of mood to the database
        try {
          await db.records.bulkAdd(metricRecords);
          console.log(`added all mood records to indexed db:`, metricRecords);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <main>
              <header>
                <h1>                    
                    Tracking
                </h1>
                <h3>Record metrics</h3>
              </header>
              <section>
                  <ul className="moodlist">
                      {metrics
                          .filter((obj) => obj.enabled === true)
                          .map((obj) => (
                              <li key={obj.id} onPointerDown={e => InputHandler.target = e.target}>
                                  <MetricRow metric={obj} />
                              </li>
                          ))}
                  </ul>
                </section>
            </main>
            <section className='ribbon' id='submit'>
                <nav>
                    <a onClick={() => recordAllMetrics()}><img src={SubmitIcon} /></a>
                </nav>
            </section>
            <nav>
                <Link to="/recordmetrics"><img src={MoodIcon} /></Link>
                <Link to="/"><img src={HomeIcon} /></Link>
                <Link to="/recordtasks"><img src={ActivityIcon} /></Link>
            </nav>
        </>
    );
}
