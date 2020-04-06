export function $(selector){
    return document.querySelector(selector);
}

export function createElement(element){
    return document.createElement(element);
}

export function createTextNode(value) {
    return document.createTextNode(value)
}