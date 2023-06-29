export class CDate {
    constructor(y,m,d){
        this.day = d || 0; //one of 1-30(31)
        this.month = m || 0; // from 1 to 12
        this.year = y || 0; // actual year
    }
}

export class CTime{
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

export class CTimeInterval{
    static  units = [{id:0, label:"sec"}, {id:1, label:"min"}, {id:2, label:"hour"}, {id:3, label:"day"}, {id:4, label:"week"}];
    
    constructor(v, u) {
        this.value = v || 1;
        this.units = u || 0;
    }

    set value(v){
        this.value = v;
    }

    set units(u){
        this.units = u;
    }
}

