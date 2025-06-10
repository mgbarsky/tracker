const bgcolors = [
        '90 109 61',
        '102 23 42',
        '67 87 110',
        '112 58 40',        
        '120 132 79',        
        '33 54 73',
        '214 148 87',
        '61 66 74',
        '110 110 114',
        '143 120 176',
        '99 82 115',        
        '160 92 59',
        '196 188 81',
        '59 123 143',
        '222 210 80',
        '105 181 194',
        '184 135 140',
        '222 196 199',
    ]; 
    
export function ColorArray() {
    return bgcolors;
}

export function ColorStyle(i) {
    let result = 'rgb('+ bgcolors[i] +'/ .87)';
    console.log(result);
    return result;
}

export function ColorGradient(i){
    let result = 'radial-gradient(circle at 0 0, rgb('+ bgcolors[i] +' / .4), rgb('+bgcolors[i]+' / .97))';    
    return result;
}
