export class CDate {
    constructor(y,m,d){
        const now = new Date();
        this.day = d || now.getDate(); //one of 1-30(31)
        this.month = m || now.getMonth() + 1; // from 1 to 12
        this.year = y || now.getFullYear(); // actual year
    }

    get date() {
        return this.year.toString().padStart(4,"0") + "-"
        + this.month.toString().padStart(2, '0')+"-"+this.day.toString().padStart(2, '0');
    }
}

export class CTime{
    constructor(h, m) {
        this._hour = h || 0;
        this._minute = m || 0;
    }   

    get hourLabel() {
        var hLabel = this._hour?"00":""+this._hour;
        hLabel = hLabel.length<2? "0"+hLabel: hLabel;
        return hLabel;
    }

    get minuteLabel() {
        var mLabel = this._minute?"00":""+this._minute;
        mLabel = mLabel.length<2? "0"+mLabel: hLabel;
        return mLabel;
    }

    get hour() { return this._hour; }
    get minute() { return this._minute; }

    set hour(h) {this._hour = h;}
    set minute(m) {this._minute = m;}
}

export class CTimeInterval{
    static  units = [{id:0, label:"sec"}, {id:1, label:"min"}, {id:2, label:"hour"}, {id:3, label:"day"}, {id:4, label:"week"}];
    
    constructor(v, u) {
        this.howMany = v || 0;
        this.units = u || 0;
    }

    set value(v){
        this.howMany = v;
    }

    set unitID(u){
        this.units = u;
    }

    get value(){
        return this.howMany;
    }

    get unitID(){
        return this.units;
    }
}

