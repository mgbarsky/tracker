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
    constructor(metricID, level) {
        this.id = window.crypto.randomUUID();
        this.metricID = metricID;
        this.timeStamp = new Date();
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