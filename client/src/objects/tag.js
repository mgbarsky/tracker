export class Tag {
    constructor(taskType, colorID) {
        this.title = "";       
        this.description = "";        
        this.id = window.crypto.randomUUID();
        this.type = taskType?taskType:"taskTag";  
        this.enabled = true;   
        this.colorID = colorID?colorID:0;
    }
}
