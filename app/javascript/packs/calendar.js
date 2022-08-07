
// 'use strict'

// function generate_year_range(start, end) {
//   let years = "";
//   for(let year = start; year <= end; year++) {
//     years += "<option value='" + year + "'>" + year + "</option>";
//   }
//   return years;
// }

// const date = new Date();
// const currentYear = date.getFullYear();
// const currentMonth = date.getMonth() + 1;
// const firstDate = new Date(currentYear, currentMonth -1, 1);
// const firstDay = firstDate.getDay(); //曜日のデータが数字で入っている
// const lastDate = new Date(currentYear, currentMonth, 0);
// const lastDayCount = lastDate.getDate();
// const selectYear = document.getElementById("year");
// const selectYear = document.getElementById("year");


// let dayCount = 1;
// let createHtml = '';

// createHtml = '<h1>' + currentYear + '/' + currentMonth + '</h1>'
// createHtml += '<table class="table vh-100 w-100">' + '<thead>' + '<tr>';

// // weeksという変数に曜日の配列をあらかじめ入れてあげる
// const weeks = ['日','月','火','水','木','金','土'];

// // weeks.lengthは配列の個数
// for (let i = 0; i < weeks.length; i++) {
//   createHtml += '<th class="text-center">' + weeks[i] + '</th>';
// }
// createHtml += '</tr>' + '</thead>';

// // 行を６行作るためのfor文
// for (let n = 0; n < 6; n++) {
//   createHtml += '<tr>';

//   // 列を７列作るためのfor文
//     for (let d = 0; d < 7; d++) {
//       // dは列のことで、それが曜日のデータより小さいときは空の箱ができる
//       if (n == 0 && d < firstDay) {
//         createHtml += '<td></td>';
//       } else if (dayCount > lastDayCount) {
//         createHtml += '<td></td>';
//       } else {
//         createHtml += '<td class="text-center">' + dayCount + '</td>';
//         dayCount++
//       }
//     }
//   createHtml += '</tr>';
// }

// createHtml += '</table>'

// document.querySelector('#calendar').innerHTML = createHtml;

function generate_year_range(start, end) {
  var years = "";
  for (var year = start; year <= end; year++) {
    years += "<option value ='" + year + "'>" + year + "</option>";
  }
  return years;
}

var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();
var selectYear = document.getElementById("year");
var selectMonth = document.getElementById("month");
var lastMonthEndDate = new Date(currentMonth, currentMonth, 0).getDate();

var createYear = generate_year_range(1900, 2200);

document.getElementById("year").innerHTML = createYear;

var calendar = document.getElementById("calendar");
var lang = calendar.getAttribute('data-lang');

var months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
var days = ["日", "月", "火", "水", "木", "金", "土"];

var dayHeader = "<tr>";

for (day in days) {
  dayHeader += "<th class='text-center' data-days='" + days[day] + "'>" + days[day] + "</th>";
}
dayHeader += "</tr>";

document.getElementById("thead-month").innerHTML = dayHeader;

monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

function next() {
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}
let nexton = document.getElementById('next');
nexton.onclick = next;


function previous() {
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}
let previouson = document.getElementById('previous');
previouson.onclick = previous;

function jump() {
  // parseIntは、文字列を整数に変換する。
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear);
}
let jumpmonth = document.getElementById('month');
jumpmonth.onchange = jump;

let jumpyear = document.getElementById('year');
jumpyear.onchange = jump;

function showCalendar(month, year) {
  var firstDay = (new Date(year, month)).getDay();
  var endDate = new Date(year, month + 1, 0).getDate();
  tbl = document.getElementById("calendar-body");
  tbl.innerHTML = "";

  monthAndYear.innerHTML = months[month] + " " + year;
  selectYear.value = year;
  selectMonth.value = month;

  var date = 1;
  for (let i = 0; i < 6; i++) {
    var row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        cell = document.createElement("td");
        cell.className = 'disabled text-black-50 bg-light text-center'
        const lastMonthDate = (lastMonthEndDate - firstDay + j + 1);
        cellText = document.createTextNode(lastMonthDate);
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth(month, year)) {
        if (i == 5 && j == 0 && date > endDate) {
          break;
        }
        cell = document.createElement("td");
        cell.className = 'disabled text-black-50 bg-light text-center'
        const nextMonthDate = (date - endDate)
        cellText = document.createTextNode(nextMonthDate);
        cell.appendChild(cellText);
        row.appendChild(cell);
        date++;
      } else {
        cell = document.createElement("td");
        cell.setAttribute("data-date", date);
        cell.setAttribute("data-month", month + 1);
        cell.setAttribute("data-year", year);
        cell.setAttribute("data-month_name", months[month]);
        cell.className = "date-picker text-center";
        cell.innerHTML = "<span>" + date + "</span>";

        if(date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
          cell.className = "date-picker selected text-center";
        }
        row.appendChild(cell);
        date++;
      }
    }

    tbl.appendChild(row);
  }
}

function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}