export class TaskRecord {
    constructor(taskID) {
        this.id = window.crypto.randomUUID(); //this is record id
        this.taskID=taskID;
        this.start = new Date();  
        
        this.end = this.startTime;   
        this.inProgress = true;   
        this.year = this.start.getFullYear();
        this.month = this.start.getMonth() + 1;  //(1...12) to correspond to string key
        this.day = this.start.getDate();
        this.weekDay = this.start.getDay(); //Sunday = 0, Monday = 1, ... 
        this.totalSecs = 0;  
        let ystr = String(this.year).padStart(4, "0");
        let mstr = String(this.month).padStart(2, "0");
        let dstr = String(this.day).padStart(2, "0");
        this.dateKey = ystr+"-"+mstr+"-"+dstr;    
    }  
}

export class MetricRecord {
    constructor(metricID, level) {
        this.id = window.crypto.randomUUID(); //this is record id
        this.metricID = metricID;
        this.metricLevel = level;
        this.start = new Date();      
        this.year = this.start.getFullYear();
        this.month = this.start.getMonth()+ 1;  //(1...12) to correspond to string key
        this.day = this.start.getDate();
        this.weekDay = this.start.getDay(); //Sunday = 0, Monday = 1, ...   
        let ystr = String(this.year).padStart(4, "0");
        let mstr = String(this.month).padStart(2, "0");
        let dstr = String(this.day).padStart(2, "0");
        this.dateKey = ystr+"-"+mstr+"-"+dstr;          
    }   
  
}