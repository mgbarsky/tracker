export class TaskRecord {
    constructor(task) {
        this.id = window.crypto.randomUUID(); //this is record id
        this.taskID=task.id;
        this.taskTitle = task.title;
        this.taskTag = task.tags.length >0 ? task.tags[0] : "";
        this.start = new Date();  
        
        this.end = this.start;   
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
        let hstr = String(this.start.getHours()).padStart(2, "0");
        let minstr = String(this.start.getMinutes()).padStart(2, "0");
        this.timeKey  = hstr+":"+ minstr;
    }  
}

export class MetricRecord {
    constructor(metric, level) {
        this.id = window.crypto.randomUUID(); //this is record id
        this.metricID = metric.id;
        this.metricTitle = metric.title;
        this.metricTag = metric.tags.length >0 ? metric.tags[0] : "";
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
        let hstr = String(this.start.getHours()).padStart(2, "0");
        let minstr = String(this.start.getMinutes()).padStart(2, "0");
        this.timeKey  = hstr+":"+ minstr;         
    }   
  
}