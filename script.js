function reverseStr(str) {
  let reverse = [...str].reverse().join("");
  return reverse;
}

function isPalindrome(str) {
  return str === reverseStr(str);
}

function convertDateToString(date) {
  const dateStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();

  return dateStr;
}

function getDateInAllFormats(date) {
  let dateStr = convertDateToString(date);
  // DD-MM-YYYY
  // MM-DD-YYYY
  // YYYY-MM-DD
  // DD-MM-YY
  // MM-DD-YY
  // YY-MM-DD

  let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
  let listOfDates = getDateInAllFormats(date);
  for (let x = 0; x < listOfDates.length; x++) {
    return isPalindrome(listOfDates[x]);
  }
}

function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;
  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 28) {
        month;
      }
    } else if (day > 28) {
      day = 1;
      month++;
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
    if (month > daysInMonth.length) {
      day = 1;
      month = 1;
      year++;
    }
  }
  return { day: day, month: month, year: year };
}

function isLeapYear(year) {
  return year % 4 === 0;
}

const date = { day: 13, month: 2, year: 2021 };
