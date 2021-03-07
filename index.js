let createEmployeeRecord = function (info) {
    return {
        firstName: info[0], 
        familyName: info[1],
        title: info[2], 
        payPerHour: info[3], 
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function (arr) {
   return arr.map(function(r) {
        return createEmployeeRecord(r)
    })
}

let createTimeInEvent = function (stamp) {
    let [date, hour] = stamp.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10), 
        date: date
    })
    return this
}

let createTimeOutEvent = function (stamp) {
    let [date, hour] = stamp.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10), 
        date: date
    })
    return this
}

let hoursWorkedOnDate = function (stamp) { 
    let inTime = this.timeInEvents.find(function(e){
        return e.date === stamp
    })

    let outTime = this.timeOutEvents.find(function(e){
       return e.date === stamp
    })

    return (outTime.hour - inTime.hour) / 100
}

let wagesEarnedOnDate = function(date) {
    let rate = this.payPerHour
    let hours = hoursWorkedOnDate.call(this,date)
    return rate * hours
}

let calculatePayroll = function(arr) {
    let payroll = arr.reduce(function(total, rec) {
        return allWagesFor.call(rec) + total
    }, 0)
    return payroll
}

let findEmployeeByFirstName = function (arr, name) {
    let employee = arr.find(function(e) {
        return e.firstName === name
    })
    return employee
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}