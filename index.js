function createEmployeeRecord(row) {
  return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}
function createEmployeeRecords(employeeRowData) {
  return employeeRowData.map(function (row) {
    return createEmployeeRecord(row);
  });
}
function createTimeInEvent(dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });
  return this;
}
function createTimeOutEvent(dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });
  return this;
}
function hoursWorkedOnDate(date) {
  let dateTimeIn = this.timeInEvents.find((d) => d.date == date);
  let dateTimeOut = this.timeOutEvents.find((d) => d.date == date);
  let timeIn = dateTimeIn.hour;
  let timeOut = dateTimeOut.hour;
  let hoursWorked = (timeOut - timeIn) / 100;
  return hoursWorked;
}
function wagesEarnedOnDate(date) {
  let hoursWorked = hoursWorkedOnDate.call(this, date);
  let payOwed = hoursWorked * this.payPerHour;
  return payOwed;
}
const findEmployeeByFirstName = (Array, firstName) => {
  let employee = Array.find((e) => (e.firstName = firstName));
  return employee;
};
function calculatePayroll(array) {
  let Total = 0;
  for (const employee of array) {
    Total += allWagesFor.call(employee);
  }
  return Total;
}
const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });
  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  );
  return payable;
};
