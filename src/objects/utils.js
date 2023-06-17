export class Date {

}

export class Time{

}

export class TimeInterval{
    static  units = ["sec", "min", "hour", "day", "week"]
    constructor() {
        this.value = 1;
        this.units = 0;
    }
}

