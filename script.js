const dob = document.querySelector("#dob");
const displayPalindrome = document.querySelector("#display-palindrome");
const nextPalindromeDate = document.querySelector("#display-next-palindrome");
const checkPalindromeBtn = document.querySelector("#check-palindrome-btn");

const isBirthdayPalindrome = () => {
  let birthDay = dob.value.split("-");
  let [year, month, day] = birthDay;
  let userBirthDate = {
    day: Number(day),
    month: Number(month),
    year: Number(year),
  };

  if (checkPalindromeForAllDateFormats(userBirthDate)) {
    displayPalindrome.innerText = " 🎉 hurray! your birthday is palindrome";
    nextPalindromeDate.innerText = "";
  } else {
    let [remaingDay, datenxt] = getNextPalindromeDate(userBirthDate);
    displayPalindrome.innerText = "🙁 Sorry! Your birthday is not a palindrome";
    nextPalindromeDate.innerText = `The next palindrome date is ${datenxt.day}-${datenxt.month}-${datenxt.year}. You missed it by ${remaingDay} days. `;
  }
};

const checkPalindrome = () => {
  dob.value
    ? isBirthdayPalindrome()
    : (displayPalindrome.innerText = "Birth Date field cannot be empty");
};

checkPalindromeBtn.addEventListener("click", checkPalindrome);

const reverseStr = (str) => [...str].reverse().join("");

const isPalindrome = (str) => str === reverseStr(str);

const convertDateToString = (date) => {
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
};

const getDateInAllFormats = (date) => {
  let dateInStr = convertDateToString(date);

  let ddmmyyyy = dateInStr.day + dateInStr.month + dateInStr.year;
  let mmddyyyy = dateInStr.month + dateInStr.day + dateInStr.year;
  let yyyymmdd = dateInStr.year + dateInStr.month + dateInStr.day;
  let ddmmyy = dateInStr.day + dateInStr.month + dateInStr.year.slice(-2);
  let mmddyy = dateInStr.month + dateInStr.day + dateInStr.year.slice(-2);
  let yymmdd = dateInStr.year.slice(-2) + dateInStr.month + dateInStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
};

const checkPalindromeForAllDateFormats = (date) => {
  let dateFormatList = getDateInAllFormats(date);

  for (let x of dateFormatList) {
    return isPalindrome(x);
  }
};

const isLeapYear = (year) => {
  year % 400 ? true : year % 100 === 0 ? false : year % 4 === 0 ? true : false;
};

const getNextDate = (date) => {
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
};

const getNextPalindromeDate = (date) => {
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
};
