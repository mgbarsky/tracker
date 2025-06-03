export class TaskRecord {
    constructor(taskID) {
        this.id = window.crypto.randomUUID(); //this is record id
        this.taskID=taskID;
        this.start = new Date();  
        this.dateKey = this.start.toISOString().substring(0,10);
        this.end = this.startTime;   
        this.inProgress = true;   
        this.year = this.start.getFullYear();
        this.month = this.start.getMonth() + 1;  //(1...12) to correspond to string key
        this.day = this.start.getDate();
        this.weekDay = this.start.getDay(); //Sunday = 0, Monday = 1, ... 
        this.totalSecs = 0;        
    }  
}

export class MetricRecord {
    constructor(metricID, level) {
        this.id = window.crypto.randomUUID(); //this is record id
        this.metricID = metricID;
        this.metricLevel = level;
        this.start = new Date();
        this.dateKey = this.start.toISOString().substring(0,10);
        this.year = this.start.getFullYear();
        this.month = this.start.getMonth()+ 1;  //(1...12) to correspond to string key
        this.day = this.start.getDate();
        this.weekDay = this.start.getDay(); //Sunday = 0, Monday = 1, ...         
    }   
  
}