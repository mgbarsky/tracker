import React, { useState } from 'react'


import InputLine from '../components/InputLine';
import DetailsLine from '../components/DetailsLine';
import TagList from '../components/TagList';
import NumberLine from '../components/NumberLine';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';

import { Metric } from "../objects/metric.js"

/*
  {
    title: "",
    tags: [{}, {}]
  }
*/

function NewMetric({ currentMetric, metrics, setMetrics, toggleModal, editMode}) {  

  const [metric, setMetric] = useState(currentMetric)

  const handleSave = () => {
    console.log(metric)

    if (!editMode) {
        setMetrics((prev) => {      
          return [...prev, metric]
        }) 
    } 
    else {       
      const nextMetrics = metrics.map((c, i) => {
        if (c.id === currentMetric.id) {
          // update to a new updated task
          return metric;
        } else {
          // The rest haven't changed
          return c;
        }
      });
       
      setMetrics(nextMetrics) 
    }  

    toggleModal()
  } 

  return (
    <> 
    <h1>Metric</h1>
    <form className="input-form">
      <InputLine  task={metric} setTask={setMetric} taskAttribute="title" labelText="Title"/>      
      <TagList task={metric} setTask={setMetric}/> 
      <DetailsLine  task={setMetric} setTask={setMetric} taskAttribute="details" labelText="Details"/>
      <NumberLine  task={metric} setTask={setMetric} taskAttribute="min" labelText="Min value"/> 
      <NumberLine  task={metric} setTask={setMetric} taskAttribute="max" labelText="Max value"/> 
      <NumberLine  task={metric} setTask={setMetric} taskAttribute="step" labelText="Increments"/> 
      {/* <DateTimeLine  task={task} setTask={setTask} dateAttribute="startDate" timeAttribute="startTime" dateLabel="Starts on" timeLabel="at"/> 
      <DateTimeLine  task={task} setTask={setTask} dateAttribute="endDate" timeAttribute="endTime" dateLabel="Ends by" timeLabel="at"/> 
      <InputLine  task={task} setTask={setTask} taskAttribute="targetIntensity" labelText="Target intensity"/>  
      <Switch  task={task} setTask={setTask} taskAttribute="trackIntensity" labelText="Track intensity"/>
      <TimeIntervalLine  task={task} setTask={setTask} taskAttribute="targetDuration" labelText="Target duration"/>   */}
      <div className="input-row submit">
          <button type="button" className="btn btn-outline-secondary" onClick={toggleModal}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleSave}>Done</button>
      </div>
            
    </form>  
    </>
  )
}

export default NewMetric