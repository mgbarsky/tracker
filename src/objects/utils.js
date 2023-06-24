export class Date {

}

export class Time{
    constructor(h, m) {
        this.hour = h || 0;
        this.minute = m || 0;
    }   

    get hourLabel() {
        var hLabel = this.hour?"00":""+this.hour;
        hLabel = hLabel.length<2? "0"+hLabel: hLabel;
        return hLabel;
    }

    get minuteLabel() {
        var mLabel = this.minute?"00":""+this.minute;
        mLabel = mLabel.length<2? "0"+mLabel: hLabel;
        return mLabel;
    }

}

export class TimeInterval{
    static  units = ["sec", "min", "hour", "day", "week"]
    constructor() {
        this.value = 1;
        this.units = 0;
    }
}

