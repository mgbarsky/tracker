export class TaskRecord {
    constructor(taskID) {
        this.id = window.crypto.randomUUID(); //this is record id
        this.taskID=taskID;
        this._start = new Date();  
        this._end = this.startTime;   
        this.inProgress = true;   
        this._year = this._start.getFullYear();
        this._month = this._start.getMonth();
        this._day = this._start.getDate();
        this._weekDay = this._start.getDay(); //Sunday = 0, Monday = 1, ... 
        this._totalSecs = 0;        
    }  

    set totalSecs(secsPassed){
        this._totalSecs = secsPassed || 1;
    }

    get totalSecs(){
        return this._totalSecs || 1;
    }
    
    set end(date){
        this._end= date;        
    }

    get start (){
        return this._start;
    }

    get end(){
        return this._end;
    }

    get task(){
        return this.taskID;
    }
}

export class MetricRecord {
    constructor(metricID, level) {
        this.id = window.crypto.randomUUID(); //this is record id
        this.metricID = metricID;
        this.timeStamp = new Date();
        this.year = this.timeStamp.getFullYear();
        this.month = this.timeStamp.getMonth();
        this.day = this.timeStamp.getDate();
        this.weekDay = this.timeStamp.getDay(); //Sunday = 0, Monday = 1, ... 
        this.metricLevel = level;
    }    

    get time() {
        return this.timeStamp;
    }

    get level(){
        return this.metricLevel;
    }

    get metric(){
        return this.metricID;
    }
}