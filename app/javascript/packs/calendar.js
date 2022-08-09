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

var createYear = generate_year_range(1900, 2200);
document.getElementById("year").innerHTML = createYear;

var days = ["日", "月", "火", "水", "木", "金", "土"];
var months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
var dayNames = "<tbody>" + "<tr>";

for (let day in days) {
  dayNames += "<th class='text-center' title='" + days[day] + "'>" + days[day] + "</th>";
}
dayNames += "</tr>" + "</tbody>";

document.getElementById('myDaynamesTable').innerHTML = dayNames;


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
  var endDate = new Date(year, month + 1, 0).getDate()
  var lastMonthEndDate = new Date(year, month, 0).getDate();

  monthAndYear.innerHTML = months[month] + " " + year;
  selectYear.value = year;
  selectMonth.value = month;;

  mv_event = document.getElementById("mvEventContainer2");
  mv_event.innerHTML = "";
  var date = 1;
  var task_date = 1;

  for(let i = 0; i < 6; i++) {


    month_row = document.createElement("div");
    month_row.className = 'month-row';
    // month_row.setAttribute("type", "top:"+ i * 16.666 + "%: height: 17.666%");


    var week_row = "<table cellpadding='0' cellspacing='0' class='st-bg-table table table-bordered row-10 mb-0'>";
    week_row += "<tbody>" + "<tr>";

    var date_row = "<table cellpadding='0' cellspacing='0' class='st-grid table table-bordered row-10 mb-0'>";
    date_row += "<tbody class='date-number'>";

    var row = document.createElement("tr");


    for(let j = 0; j < 7; j++) {

      if (j === 0) {
        week_row += "<td class='st-bg st-bg-fc'>&nbsp";

      } else {
        week_row += "<td class='st-bg'>&nbsp";
      }
      // document.getElementsByClassName("st-bg").innerHTML;
      week_row += "</td>";


      if (i === 0 && j < firstDay) {
        cell = document.createElement("td");
        cell.className = 'disabled text-black-50 bg-light st-bg text-center p-0'
        const lastMonthDate = (lastMonthEndDate - firstDay + j + 1);
        cellText = document.createTextNode(lastMonthDate);
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth(month, year)) {
        if (i == 5 && j == 0 && date > endDate) {
          break;
        }
        cell = document.createElement("td");
        cell.className = 'disabled text-black-50 bg-light st-bg text-center p-0'
        const nextMonthDate = (date - endDate);
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
        cell.className = "date-picker text-center p-0";
        cell.innerHTML = "<span class='mb-0'>" + date + "</span>";



        if(date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
          cell.className = "date-picker selected text-center p-0";
        }

        row.appendChild(cell);
        date++;
      }
    }

    week_row += "</tr>" + "</tbody>" + "</table>";
    date_row += row.outerHTML;

    var tasks = document.getElementById('tasks');
    var taskHash = JSON.parse(tasks.getAttribute('data-task-status'));
    for(var l = 0; l < taskHash.length; l++) {
      var task = taskHash[l];
      if((date - 7) <= task[2] < date && year === task[0] && month === (task[1] - 1)) {
        console.log(date);
        console.log(task[2]);
        var createTr = document.createElement("tr");
        for (var count = 0; count < 7; count++) {
          task_cell = document.createElement("td");
          task_cell.className = count;
            if (count === task[3]) {
              task_cell.className = task[8] + ' text-center p-0';
              task_cell.innerHTML = task[7];
            }
              // } else {
          // taskCellText = document.createTextNode("&nbsp");
          // console.log(taskCellText);
          // task_cell.appendChild(taskCellText);
              // }
          createTr.appendChild(task_cell);
        }
        date_row += createTr.outerHTML;
      }
    }
    date_row += "</tbody>" + "</table>";

    // trの中のtdの個数を調べてる
    if (row.children.length === 7) {
      month_row.innerHTML = week_row;
      month_row.innerHTML += date_row;
      mv_event.appendChild(month_row);
    }
  }
}


function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}