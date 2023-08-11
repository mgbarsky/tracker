export class Metric {
    constructor() {
        this.title="";
        this.description = "";
        this.tags=[];
        this.min = -10;
        this.max = 10;
        this.step = 1;

        this.enabled = true;

        this.id = window.crypto.randomUUID();
    }  
    
    static get defaultMetrics(){  
        const emID =  window.crypto.randomUUID();     
        const m = new Metric();
        m.title = "Mood";
        m.tags = [{id:emID, caption:"emotions"}];
        m.min = -5;
        m.max = 5;

        const a = new Metric();
        a.title = "Anxiety";
        a.tags = [{id:emID, caption:"emotions"}, {id:window.crypto.randomUUID(), caption:"serenity"}];
        a.min = 0;
        
        const t = new Metric();
        t.title = "Weight";
        t.min = 50;
        t.max = 150;
        t.step = 5;
        return [m, a, t];
    }
  }