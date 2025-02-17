class Reminder {
    constructor() {
        this.weekdays = {"mon": true, "tue": true, "wed": true, "thu": true, "fri": true, "sat": true, "sun": true}; //which days of week repeat on - by default every day
        this.startTime = new Time();
    }
}