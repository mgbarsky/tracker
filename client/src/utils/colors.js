const bgcolors = [
        "90 109 61",
        "102 23 42",
        "67 87 110",
        "112 58 40",        
        "120 132 79",        
        "33 54 73",
        "214 148 87",
        "61 66 74",
        "110 110 114",
        "143 120 176",
        "99 82 115",        
        "160 92 59",
        "196 188 81",
        "59 123 143",
        "222 210 80",
        "105 181 194",
        "184 135 140",
        "222 196 199",
    ]; 
    
export function ColorArray() {
    return bgcolors;
}

export function ColorStyle(i) {
    let value = bgcolors[i];
    return `rgb(${value} / .87)`;
}

export function ColorGradient(i){
    let value = bgcolors[i];
    return `radial-gradient(circle at 0 0, (${value} / .6), rgb(${value} / .87))`;
}
