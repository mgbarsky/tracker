import React from 'react'
import { Link } from 'react-router-dom';
import { useState , useEffect } from 'react'
import {MetricRecord } from '../objects/record.js';
import { CurrentTime } from '../components/CurrentTime';
import { db } from '../data/db.js'

export default function RecordMetrics({ metrics, records, setRecords  }) 
{ 
  //returns different GUI depending on the state of the task - in progress or idle
  function MetricRow({ metric }) {       
      return (
        <div key={metric.id}>           
            <span>
                <label>{metric.title}</label>
            </span> 
            <span>
                <input type="number" min={metric.min} max={metric.max} step={metric.step} defaultValue={metric.max/2} onChange={() => metricChanged(metric.id)}/>
                <label> out of {metric.max}</label>
            </span>       
        </div>      
      ) ;    
  }

  //adds all metric levels to the record
  async function recordAllMetrics(){
   
    
  }
  
  return (
    <>
      <header>
        <h1><a href="/"><img src="assets/home.svg"/></a>Tracking</h1>
        <h3>Record metrics</h3>
        </header>
      <ul className="playlist">        
      {
            metrics.map((obj) => (
                <li key={obj.id}>
                   <MetricRow 
                      metric={obj} 
                    />
                </li>
            ))
      }
      </ul>  
      <section>
        <div className="buttonpanel">                        
          <button><a href="/recordtasks"><img src="assets/activity.svg"/></a></button>
          <button><a><img src="assets/mood.svg"/></a></button>
        </div>   
      </section>       
    </>
  )
}
