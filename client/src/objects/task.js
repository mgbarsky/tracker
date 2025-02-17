import { CDate, CTime, CTimeInterval } from "./utils.js";

var i=1;

export class Task {
    
    constructor() {
      this.tags=[];
      this.title="";
      this.details = "";      
      this.enabled = true;
      this.id = window.crypto.randomUUID();
      
      //reserved for future version
      this.startDate = new CDate();
      this.startTime = new CTime();
      this.endDate = new CDate();
      this.endTime =  new CTime();
      this.targetDuration = new CTimeInterval();
      this.targetIntensity = 0;
      this.trackIntensity = false;
      this.trackMeasures = []; //array of measure objects with the track after a specific time interval
      this.weekdays = {"mon": true, "tue": true, "wed": true, "thu": true, "fri": true, "sat": true, "sun": true}; //which days of week repeat on - by default every day
      this.reminders = []; //array of Reminder objects
      this.monthly = {};
      this.yearly = {};
    }

    static get defaultTasks(){  
      const exID =  window.crypto.randomUUID(); 
      const medID =  window.crypto.randomUUID();     
      const a = new Task();
      a.title = "Aerobics";
      a.tags = [{id:exID, caption:"exercise"}];
      

      const y = new Task();
      y.title = "Yoga";
      y.tags = [{id:exID, caption:"exercise"}, {id:medID, caption:"meditation"}];
      y.min = 0;
      

      return [a, y];
    }
  }

  