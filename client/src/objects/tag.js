export class Tag {
    constructor(taskType) {
        this.title = "";       
        this.description = "";        
        this.id = window.crypto.randomUUID();
        this.type = taskType?taskType:"taskTag";  
        this.enabled = true;   
    }
}
