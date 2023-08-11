export class TaskRecord {
    constructor(taskID) {
        this.id = window.crypto.randomUUID();
        this.taskID=taskID;
        this.startTime = new Date();  
        this.endTime = this.startTime;   
        this.inProgress = true;   
    }  

    set end(date){
        this.endTime = date;
    }

    get start (){
        return this.startTime;
    }

    get end(){
        return this.endTime;
    }

    get task(){
        return this.taskID;
    }

}

export class MetricRecord {
    constructor(metricID) {
        this.id = window.crypto.randomUUID();
        this.metricID = metricID;
        this.timeStamp = new Date();
        this.metricLevel = 0;
    }  

    set time(date){
        this.timeStamp = date;
    }

    set level(value){
        this.metricLevel = value;
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