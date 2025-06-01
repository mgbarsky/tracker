import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useState , useEffect } from 'react'
import {MetricRecord } from '../objects/record.js';
import { CurrentTime } from '../components/CurrentTime';
import { db } from '../data/db.js'

export default function RecordMetrics({ metrics, records, setRecords  }) { 
  
  const navigate = useNavigate();
  
  async function handleInputChange(id, newValue) {      
      try {
          await db.metrics.update(id, {
              lastValue: newValue,
          });         
      } catch (error) {
          console.error(error);
      }
  };

  function MetricRow({ metric }) {       
      return  (
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
                  value={metric.lastValue} 
                  onChange = 
                    {(e) =>
                      handleInputChange(metric.id, e.target.value)
                    }
                />
                <label> out of {metric.max}</label>
            </span>       
        </div>      
      ) ;    
  }

  //adds all metric levels to the records (even the ones that did not change)
  async function recordAllMetrics(){
    
    // build an array of all metric records
    const metricRecords = [];
    for (const metric of metrics) {
      const metricRecord = new MetricRecord(
          metric.id,
          metric.lastValue
      );
      metricRecords.push(metricRecord);
    }

    // transfer this array into records array
    setRecords((prev) => {
      return [...prev, ...metricRecords];
    });    
  }
  
  return (
    <>
      <header>
        <h1><Link to="/"><img src="assets/home.svg"/></Link>Tracking</h1>
        <h3>Record metrics</h3>
	    </header>
      <section id="metricList">
      <ul className="metriclist">        
      {
            metrics.filter(obj =>
              obj.enabled === true).map((obj) => (
                <li key={obj.id}>
                   <MetricRow 
                      metric={obj} 
                    />
                </li>
            ))
      }
      </ul>
      <button onClick={() => recordAllMetrics()}>SAVE</button>
      </section>
      <section>
        <div className="buttonpanel">                        
          <button onClick={() => navigate("/recordtasks")}><img src="assets/activity.svg"/></button>
          <button onClick={() => navigate("/recordmetrics")}><img src="assets/mood.svg"/></button>
        </div>   
      </section>   
    </>
  )
}
