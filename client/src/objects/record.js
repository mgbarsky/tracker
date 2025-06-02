export class TaskRecord {
    constructor(taskID) {
        this.id = window.crypto.randomUUID(); //this is record id
        this.taskID=taskID;
        this._start = new Date();  
        this._dateKey = this._start.toISOString().substring(0,10);
        this._end = this.startTime;   
        this.inProgress = true;   
        this._year = this._start.getFullYear();
        this._month = this._start.getMonth() + 1;  //(1...12) to correspond to string key
        this._day = this._start.getDate();
        this._weekDay = this._start.getDay(); //Sunday = 0, Monday = 1, ... 
        this._totalSecs = 0;        
    }  
    
    get totalSecs(){
        return this._totalSecs || 1;
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

    get dateKey(){
        return this._dateKey;
    }

    get year(){
        return this._year;
    }

    get month(){
        return this._month;
    }

    get day(){
        return this._day;
    }

    get weekDay(){
        return this._weekDay;
    }

    //setters set up when task is finished
    set totalSecs(secsPassed){
        this._totalSecs = secsPassed || 1;
    }

    set end(date){
        this._end= date;        
    }
}

export class MetricRecord {
    constructor(metricID, level) {
        this.id = window.crypto.randomUUID(); //this is record id
        this.metricID = metricID;
        this.metricLevel = level;
        this._start = new Date();
        this._dateKey = this._start.toISOString().substring(0,10);
        this._year = this._start.getFullYear();
        this._month = this._start.getMonth()+ 1;  //(1...12) to correspond to string key
        this._day = this._start.getDate();
        this._weekDay = this._start.getDay(); //Sunday = 0, Monday = 1, ...         
    }    

    get start() {
        return this._start;
    }

    get level(){
        return this.metricLevel;
    }

    get metric(){
        return this.metricID;
    }

    get dateKey(){
        return this._dateKey;
    }

    get year(){
        return this._year;
    }

    get month(){
        return this._month;
    }

    get day(){
        return this._day;
    }

    get weekDay(){
        return this._weekDay;
    }

}