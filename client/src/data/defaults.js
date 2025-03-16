const metrics = [
    {
        id:"5ffc91a3-f01d-4160-82d3-72ee03a6c793", 
        title:"Mood",
        description:"",
        enabled:true,
        max:5, min:-5, step:1,
        tags:["fe32edc9-20c1-4b12-b938-345b464bf841"]
    },
    {
        id:"c482ca3f-6079-4852-8a1c-f0d887eb241c", 
        title:"Anxiety",
        description:"",
        enabled:true,
        max:0, min:10, step:1,
        tags:[
            "fe32edc9-20c1-4b12-b938-345b464bf841", 
            "ab150a75-ef16-46d4-8fdc-36a32e032ed2"
        ]
    },
    {
        id:"ccd32eaf-6d8d-4f72-8eb4-3a1806d1e7c9", 
        title:"Weight",
        description:"",
        enabled:true,
        max:40, min:200, step:1,
        tags:["a4576238-4ac5-45d6-a10f-5ec915df10e7"]
    }
];    

const metricTypes = [
    {id:"fe32edc9-20c1-4b12-b938-345b464bf841", caption:"emotions"},
    {id:"ab150a75-ef16-46d4-8fdc-36a32e032ed2", caption:"mind"},
    {id:"a4576238-4ac5-45d6-a10f-5ec915df10e7", caption:"body"},
    {id:"83800840-c170-46ef-b79c-120b4c717b32", caption:"beauty"}
];

const tasks =  [
    {
        id:"740aed9d-dacb-4437-bdc5-9aa0fc3d805b", 
        title:"Swimming",
        enabled:true,
        description:"",       
        tags:["2d7cf458-cbf6-4c25-b8b0-22d60c0f3315"]
    },
    {
        id:"444c8341-6ab4-420e-8a73-4756abd6f1a2", 
        title:"Meditation",
        description:"",
        enabled:true,       
        tags:["2963e30e-bbcd-4f64-86d6-335da29fff61"]
    }
];

const taskTypes = [
    {id:"2d7cf458-cbf6-4c25-b8b0-22d60c0f3315", caption:"physical exercise"},
    {id:"2963e30e-bbcd-4f64-86d6-335da29fff61", caption:"mindfulness"},
];


function getDefaults(){
    return ({
        "defaultTasks":tasks,
        "defaultMetrics":metrics,
        "defaultTaskTypes":taskTypes,
        "defaultMetricTypes":metricTypes
    });
}
export { tasks, getDefaults };