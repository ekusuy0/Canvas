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
var selsecDay = document.getElementById("date");


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
  currentYear = (currentMonth == 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}
let nexton = document.getElementById('next');
nexton.onclick = next;


function previous() {
  currentYear = (currentMonth == 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth == 0) ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}
let previouson = document.getElementById('previous');
previouson.onclick = previous;

function jump() {
  // parseIntは、文字列を整数に変換する。
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  console.log(currentMonth);
  showCalendar(currentMonth, currentYear);
}
let jumpmonth = document.getElementById('month');
jumpmonth.onchange = jump;

let jumpyear = document.getElementById('year');
jumpyear.onchange = jump;


function showCalendar(month, year) {
  var firstDay = (new Date(year, month)).getDay();
  var endDate = new Date(year, month + 1, 0).getDate();
  var lastMonthEndDate = new Date(year, month, 0).getDate();

  monthAndYear.innerHTML = year + " / " + (month + 1);
  selectYear.value = year;
  selectMonth.value = month;

  mv_event = document.getElementById("mvEventContainer2");
  mv_event.innerHTML = "";
  var date = 1;
  var task_date = 1;

  for(let i = 0; i < 6; i++) {


    month_row = document.createElement("div");
    month_row.className = 'month-row';


    var week_row = "<table cellpadding='0' cellspacing='0' class='st-bg-table table table-bordered row-10 mb-0'>";
    week_row += "<tbody>" + "<tr>";

    var date_row = "<table cellpadding='0' cellspacing='0' class='st-grid table table-borderless row-10 mb-0'>";
    date_row += "<tbody class='date-number'>";

    var row = document.createElement("tr");


    for(let j = 0; j < 7; j++) {

      if (j == 0) {
        week_row += "<td class='st-bg st-bg-fc'>&nbsp";

      } else {
        week_row += "<td class='st-bg'>&nbsp";
      }
      week_row += "</td>";


      if (i == 0 && j < firstDay) {
        cell = document.createElement("td");
        cell.className = 'disabled text-black-50 bg-light st-bg text-center p-0';
        const lastMonthDate = (lastMonthEndDate - firstDay + j + 1);
        cellText = document.createTextNode(lastMonthDate);
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth(month, year)) {
        if (i == 5 && j == 0 && date > endDate) {
          break;
        }
        cell = document.createElement("td");
        cell.className = 'disabled text-black-50 bg-light st-bg text-center p-0';
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
        cell.className = "date-picker text-center p-0 under_border";
        cell.innerHTML = "<span class='date-picker' data-date='" + date + "' data-month='" + month + "' data-year='" + year + "'>" + date + "</span>";


        if(date == today.getDate() && year == today.getFullYear() && month == today.getMonth()) {
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

    for(var m = 0; m < 6; m++) {

      for(var l = 0; l < taskHash.length; l++) {
        var task = taskHash[l];

        if((task_date - firstDay) == task[2] && year == task[0] && month == (task[1] - 1)) {
          var createTr = document.createElement("tr");
          createTr.className = "taskTr";

          for (var count = 0; count < 7; count++) {
            var task_cell = document.createElement("td");
            task_cell.className = count;

            if (count == task[3]) {
              if (task[8] == 0) {

                task_cell.className = task[10] + ' text-center p-0 round';
                task_cell.innerHTML = task[9];
              } else {
                if (task[3] + task[8] <= 7) {
                  task_cell.className = task[10] + " text-center p-0 round";
                  task_cell.setAttribute("colspan", task[8] + 1);
                  task_cell.innerHTML = task[9];
                  createTr.appendChild(task_cell);
                } else {
                  task_cell.setAttribute("colspan", 7 - task[3]);
                  task_cell.innerHTML = task[9];
                  task_cell.className = task[10] + ' text-center p-0 left-round t';
                  createTr.appendChild(task_cell);
                }
                var last_td = (7 - task[3] - task[8] - 1);

                for (let n = 0; n < last_td; n++) {
                  var task_null_cell = document.createElement("td");
                  let taskCellText = document.createTextNode("");
                  task_null_cell.appendChild(taskCellText);
                  createTr.appendChild(task_null_cell);
                }
                break;
              }
            } else {
              taskCellText = document.createTextNode("");
              task_cell.appendChild(taskCellText);
            }

            createTr.appendChild(task_cell);

          }
          date_row += createTr.outerHTML;

        }

        if ((task_date - firstDay) == task[6] && year == task[4] && month == (task[5] - 1)) {
          if (task[8] > (task[7] + 1)) {
            var createTr = document.createElement("tr");
            for (var datecount = 0; datecount < 7; datecount++) {
              if (datecount == 1) {
                var end_cell = document.createElement("td");
                end_cell.className = task[10] + " text-center p-0 right-round";
                end_cell.innerHTML = task[9];
                end_cell.setAttribute("colspan", task[7] + 1);
                let taskCellText = document.createTextNode("");
                end_cell.appendChild(taskCellText);
                createTr.appendChild(end_cell);

                var last_end_td = (7 - task[7] - 1);
                for (let p = 0; p < last_end_td; p++) {
                  var task_null_end_cell = document.createElement("td");
                  task_null_end_cell.className = task[7] + 2 + p;
                  let taskEndCellText = document.createTextNode("");
                  task_null_end_cell.appendChild(taskEndCellText);
                  createTr.appendChild(task_null_end_cell);
                }
              }
            }
            date_row +=  createTr.outerHTML;
          }
        }
      }

      task_date++;
    }
    date_row += "</tbody>" + "</table>";

    // trの中のtdの個数を調べてる
    if (row.children.length == 7) {
      month_row.innerHTML = week_row;
      month_row.innerHTML += date_row;
      mv_event.appendChild(month_row);
    }
  }
}


function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}
