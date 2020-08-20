export function compareDate(date1, date2) {
    let year1=date1.getUTCFullYear(), month1 = date1.getUTCMonth(), d1 = date1.getUTCDate()
    let year2=date2.getUTCFullYear(), month2 = date2.getUTCMonth(), d2 = date2.getUTCDate()
    return year1===year2 && month1===month2 && d1===d2
}

export function newUTCDate(time = null) {
    let date = time ? new Date(time) : new Date();
    let utc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),0,0,0))
    return utc
}

export function utcDate(year, month, date) {
    let utc = new Date(Date.UTC(year, month, date, 0, 0, 0))
    return utc
}

export function toUTCDateString(date) {
    let str = date.toUTCString()
    return str.substr(0, str.length - 13)
}

export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MONTHS = ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]