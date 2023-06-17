import { Date, Time, TimeInterval } from "./utils.js";

export class Task {
    constructor() {
      this.tags=[];
      this.title="";
      this.details = "";
      this.start = {date:new Date(), time: new Time()};
      this.end = {date:new Date(), time: new Time()};
      this.targetDuration = 0;
      this.targetIntensity = 0;
      this.trackIntensity = false;
      this.trackMeasures = []; //array of measure objects with the track after a specific time interval
      this.weekdays = {"mon": true, "tue": true, "wed": true, "thu": true, "fri": true, "sat": true, "sun": true}; //which days of week repeat on - by default every day
      this.reminders = []; //array of Reminder objects
      this.monthly = {};
      this.yearly = {};
      this.enabled = true;
      this.id = window.crypto.randomUUID();
    }
  }

  