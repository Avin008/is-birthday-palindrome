const dob = document.querySelector("#dob");
const displayPalindrome = document.querySelector("#display-palindrome");
const displayNextPalindrome = document.querySelector(
  "#display-next-palindrome"
);
const palindromeBtn = document.querySelector("#check-palindrome-btn");

palindromeBtn.addEventListener("click", function () {
  if (dob.value) {
    let birthDay = dob.value.split("-");
    let dateX = {
      day: Number(birthDay[2]),
      month: Number(birthDay[1]),
      year: Number(birthDay[0]),
    };
    //check palindrome
    if (checkPalindromeForAllDateFormats(dateX)) {
      displayPalindrome.innerText = " 🎉 hurray! your birthday is palindrome";
      displayNextPalindrome.innerText = "";
    } else {
      let [remaingDay, datenxt] = getNextPalindromeDate(dateX);
      displayPalindrome.innerText =
        "🙁 Sorry! Your birthday is not a palindrome";
      displayNextPalindrome.innerText = `The next palindrome date is ${datenxt.day}-${datenxt.month}-${datenxt.year}. You missed it by ${remaingDay} days. `;
    }
  } else {
    displayPalindrome.innerText = "Birth Date field cannot be empty";
  }
});

function reverseStr(str) {
  return [...str].reverse().join("");
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
  let dateInStr = convertDateToString(date);

  let ddmmyyyy = dateInStr.day + dateInStr.month + dateInStr.year;
  let mmddyyyy = dateInStr.month + dateInStr.day + dateInStr.year;
  let yyyymmdd = dateInStr.year + dateInStr.month + dateInStr.day;
  let ddmmyy = dateInStr.day + dateInStr.month + dateInStr.year.slice(-2);
  let mmddyy = dateInStr.month + dateInStr.day + dateInStr.year.slice(-2);
  let yymmdd = dateInStr.year.slice(-2) + dateInStr.month + dateInStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
  let dateFormatList = getDateInAllFormats(date);

  for (let i = 0; i < dateFormatList.length; i++) {
    return isPalindrome(dateFormatList[i]);
  }
}

function isLeapYear(year) {
  if (year % 400 === 0) return true;

  if (year % 100 === 0) return false;

  if (year % 4 === 0) return true;

  return false;
}

function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  let nextDate = getNextDate(date);

  let ctr = 0;
  while (1) {
    ctr++;

    if (checkPalindromeForAllDateFormats(nextDate)) {
      return [ctr, nextDate];
    } else {
      nextDate = getNextDate(nextDate);
    }
  }
}
