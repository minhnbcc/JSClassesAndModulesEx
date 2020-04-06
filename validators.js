export function notNullOrEmpty(value){
    if(value == undefined || value === '' || value == null){
        return false;
    }
    
    return true;
}

export function isValidNumeric(value){
    if(notNullOrEmpty(value)){
        return !isNaN(value);
    }

    return false;
}

export function isValidDate(value){
    return !isNaN(Date.parse(new Date(value)));
}