import React, { useState } from 'react'
import NewMetric from '../screens/NewMetric';
import { Modal } from 'react-bootstrap';

import { Metric } from '../objects/metric';

import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

export default function Metrics({ metrics, setMetrics }) {
    const [metric, setMetric] = useState(new Metric())
    const [editMode, setEditMode] = useState(false);
    const [showMetricModal, setShowMetricModal] = useState(false);

    const navigate = useNavigate()

    console.log(metrics)  
  
    function MetricRow({ obj }) {
        if (obj.enabled) {
          return (
            <>            
                <input  type="text" className="form-control" value={obj.title} readOnly={true}/>                                                         
                <div className="input-group-btn">
                    <button  className="btn btn-outline-dark"                        
                        onClick={() => editMetric(obj.id)}>...
                    </button> 
                </div>
                <div className="input-group-btn">
                    <button className="btn btn-outline-danger"                        
                        onClick={() => deleteMetric(obj.id)}>x
                    </button>                             
                </div>                                                                                  
            </>)
        }
        return (<input  className="form-control " value={obj.title} readOnly={true} disabled/>) 
    }

    const toggleMetricModal = () => {
        setShowMetricModal(!showMetricModal)
    }
    
    function deleteMetric(id){
        setMetrics((prev) => {
            return prev.filter((obj) => obj.id !== id)
        })  
    }

    function editMetric(id){
        const m = metrics.find((obj) => obj.id === id)
        setMetric(m)
        setEditMode(true)
        console.log("edit metric", metric)
        toggleMetricModal()
    }

    function toogleEnabled(id){
        const nextMetrics = metrics.map((c) => {
            if (c.id === id) {
              // toogle the enabled property
              c.enabled = !c.enabled
              return c;
            } else {
              // The rest haven't changed
              return c;
            }
          });
           
          setMetrics(nextMetrics)        
     
    }

    function newMetric() {
        setEditMode(false)
        setMetric(new Metric())
        toggleMetricModal()
    }
    
    return (
        <>
            <ul className="nav bg-primary">
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/">&larr;            
                    </Link>
                </li>            
            </ul>   
            <div className="container">                 
                <h1>Metrics</h1>                
                {
                    metrics.map((obj) => (  
                                                                      
                        <div className="input-group" key={obj.id}> 
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch"  
                                    checked={obj.enabled} 
                                    
                                    onChange={() => toogleEnabled(obj.id)}
                                />  
                                {obj.enabled}                               
                            </div>
                              
                            <MetricRow 
                                obj={obj} 
                            />
                                                                                                      
                        </div>
                    ))
                }  
                <div className="input-row submit">          
                    <button type="button" className="btn btn-primary" onClick={() => newMetric()}>+</button>
                </div>
                {/* <button onClick={() => navigate('/')}>Home</button> */}
                
                {
                    showMetricModal && (
                        <Modal show={showMetricModal} fullscreen={false}>
                        <div className="container">   
                            <NewMetric metrics={metrics} setMetrics={setMetrics} toggleModal={toggleMetricModal} currentMetric={metric} editMode={editMode}/> 
                        </div>
                        </Modal>          
                    )
                }                 
            </div>
        </> 
    )
}
