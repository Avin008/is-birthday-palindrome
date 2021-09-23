function reverseStr(str) {
  let reverse = [...str].reverse().join("");
  console.log(reverse);
  return reverse;
}

function isPalindrome(str) {
  return str === reverseStr(str);
}

const date = { day: 22, month: 2, year: 2021 };

function dateTostring(dateObj) {
  const dateInString = {
    day: "",
    month: "",
    year: "",
  };

  if (dateObj.day < 10) {
    dateInString.day = 0 + dateObj.day.toString();
  } else {
    dateInString.day = dateObj.day.toString();
  }

  if (dateObj.month < 10) {
    dateInString.month = 0 + dateObj.month.toString();
  } else {
    dateInString.month = dateObj.month.toString();
  }

  dateInString.year = dateObj.year = dateObj.year.toString();

  return dateInString;
}

// Your function will return an array of strings for these date formats

// DD-MM-YYYY
// MM-DD-YYYY
// YYYY-MM-DD
// DD-MM-YY
// MM-DD-YY
// YY-MM-DD

// use dateTOString function to convert date obj to string to pass it as an arg
function dateInAllVariations(dateObj) {
  const ddMmYyyy = dateObj.day + dateObj.month + dateObj.year;
  const mmDdYyyy = dateObj.month + dateObj.day + dateObj.year;
  const yyyyMmDd = dateObj.year + dateObj.month + dateObj.day;
  const ddMmYy = dateObj.day + dateObj.month + dateObj.year;
  const mmDdYy = dateObj.month + dateObj.day + dateObj.year;
  const yyMmDd = dateObj.year + dateObj.month + dateObj.day;
  return [ddMmYyyy, mmDdYyyy, yyyyMmDd, ddMmYy, mmDdYy, yyMmDd];
}

//function to check palindrome for all dates //
function checkPalindromeForAllDates(dateObj) {
  let listOfPalindrome = dateInAllVariations(dateObj);
  let flag = false;
  for (let x = 0; x < listOfPalindrome.length; x++) {
    if (isPalindrome(listOfPalindrome[x])) {
      flag = true;
      break;
    }
  }
  return flag;
}
