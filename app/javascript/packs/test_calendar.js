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

var user_color = document.getElementById('user_color');
var color = JSON.parse(user_color.getAttribute('data-user-status'));

for (let day in days) {
  dayNames += "<th class='text-center' title='" + days[day] + "' style='background-color:" + color + ";'>" + days[day] + "</th>";
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


  monthAndYear.innerHTML = "<h4>" + year + " / " + (month + 1) + "</h4>";
  selectYear.value = year;
  selectMonth.value = month;

  mv_event = document.getElementById("mvEventContainer2");
  mv_event.innerHTML = "";
  var date = 1;
  var task_date = 1;
  var box_count = 0;

  for(let i = 0; i < 6; i++) {


    month_row = document.createElement("div");
    month_row.className = 'month-row';


    var week_row = "<table cellpadding='0' cellspacing='0' class='st-bg-table table table-bordered row-10 mb-0'>";
    week_row += "<tbody>" + "<tr>";

    var date_row = "<table cellpadding='0' cellspacing='0' class='st-grid table table-borderless row-10 mb-0'>";
    date_row += "<thead class='date-number'>";

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
        box_count++;
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
    date_row += "</thead>" + "<tbody>";

    var tasks = document.getElementById('tasks');
    var taskHash = JSON.parse(tasks.getAttribute('data-task-status'));

    const count = [];

    for (var task_count = 0; task_count < taskHash.length; task_count++) {
      var task = taskHash[task_count];

      // 予定開始日が入る週とiが一致するとき
      if((i + 1) == task[15] && year == task[0] && month == (task[1] - 1)) {
        count.push(task[14]);
        console.log("ええええ");
      }

      // 予定終了日が入る週とiが一致するとき
      if ((i + 1) == task[16] && year == task[0] && month == (task[1] - 1)) {
        count.push(task[14]);
        console.log("ううううう");
      }

      // 今月の中で予定が週をまたぐとき
      if (task[16] > task[15]　&& (task[16] - task[15]) > 1) {
        for(var s = 1; s <= (task[16] - task[15]); s++) {
          if ((i + 1) == (task[15] + s) && year == task[0] && month == (task[1] - 1)) {
            count.push(task[14]);
            console.log("いいい");
          }
        }
      }

      // 他の月まで予定がまたぐときの予定開始日から月最終日まで
      if (task[0] == task[4] && task[1] < task[5] && (task[1] - 1) == month) {
        for (var s = 1; s <= (firstDay + endDate) / 6 - task[15]; s++) {
          if ((i + 1) == (task[15] + s)) {
            console.log("ああああああああ");
            count.push(task[14]);
          }
        }
      }

      // 前の月から予定が続いて今月初めから予定終了日まで
      if (task[0] == task[4] && task[1] < task[5] && (task[5] - 1) == month) {
        for (var s = 1; s <= task[16]; s++) {
          if ((i + 1) == s) {
            console.log("おおおお");
            count.push(task[14]);
          }
        }
      }

      // 前の月からの予定がその月の一週目で終わるとき
      if (i == 0 && task[6] < task[8] + 1 && year == task[4] && month == (task[5] - 1) && task[16] == 1) {
        count.push(task[14]);
        console.log(task[6]);
      }


      if (task[0] == task[4] && (task[5] - task[1]) > 1) {
        for (var s = 1; s <= (task[5] - task[1] - 1); s++) {
          if ((task[1] + s - 1) == month) {
            count.push(task[14]);
            console.log("きききききききっききいい");
          }
        }
      }
    }
    if (count.length) {
      const aryMax = function (a, b) {return Math.max(a, b);}
      let max = count.reduce(aryMax);
      for (var n = 0; n < max; n++) {
        var createTr = document.createElement("tr");
        createTr.className = "taskTr";



        for (var week = 0; week < 7; week++) {
          var task_cell = document.createElement("td");
          task_cell.className

          for (var task_count = 0; task_count < taskHash.length; task_count++) {
            var task = taskHash[task_count];
            if (task[0] == year && (task[1] - 1) == month) {


              if (week == task[3] && (n + 1) == task[14] && (i + 1) == task[15]) {
                if (task[8] == 0) { // 予定の長さが一日の時
                  task_cell.className = 'text-center p-0 round';
                  task_cell.setAttribute("style", "background-color: " + task[10] + ";");
                  task_cell.innerHTML = task[9];
                  createTr.appendChild(task_cell);

                } else if (task[3] + task[8] < 7) { // タスクがその週の間に日をまたぐとき
                  task_cell.className = 'text-center p-0 round';
                  task_cell.setAttribute("style", "background-color: " + task[10] + ";");
                  task_cell.setAttribute("colspan", task[8] + 1);
                  task_cell.innerHTML = task[9];
                  createTr.appendChild(task_cell);
                  week = week + task[8];

                } else { // タスクが週をまたぐとき
                  task_cell.setAttribute("colspan", 7 - task[3]);
                  task_cell.innerHTML = task[9];
                  task_cell.className = 'text-center p-0 left-round t';
                  task_cell.setAttribute("style", "background-color: " + task[10] + ";")
                  createTr.appendChild(task_cell);
                  week = week + 6 - task[3];
                }
              } else if (week == 0 && (n + 1) == task[14] && (i + 1) == task[16]) {
                if ((task[16] - task[15]) != 0 && (task[5] - 1) == month) { // 週をまたいだ終わりのところ

                  task_cell.className = "text-center p-0 right-round";
                  task_cell.setAttribute("style", "background-color: " + task[10] + ";");
                  task_cell.innerHTML = task[9];
                  task_cell.setAttribute("colspan", task[7] + 1);
                  createTr.appendChild(task_cell);
                  week = week + task[7];

                }
              }

              if (task[16] > task[15] && (task[16] - task[15]) > 1) { // 予定がその月の中で長い予定
                for(var s = 1; s < (task[16] - task[15]); s++) {
                  if ((i + 1) == (task[15] + s) && year == task[0] && month == (task[1] - 1) && (n + 1) == task[14]) {
                    if (week == 0) {
                      task_cell.className = "text-center p-0";
                      task_cell.setAttribute("style", "background-color: " + task[10] + ";");
                      task_cell.innerHTML = task[9];
                      task_cell.setAttribute("colspan", 7);
                      createTr.appendChild(task_cell);
                      week = week + 7;
                    }
                  }
                }
              }

              if (task[0] == task[4] && task[1] < task[5]) { // 予定が次の月にまたいでいるときの予定開始日から月の終わりまで
                for(var s = 1; s <= (firstDay + endDate) / 6 - task[15]; s++) {
                  if ((i + 1) == (task[15] + s) && year == task[0] && month == (task[1] - 1) && (n + 1) == task[14]) {
                    console.log("ああ");
                    if (week == 0) {
                      task_cell.className = "text-center p-0";
                      task_cell.setAttribute("style", "background-color: " + task[10] + ";");
                      task_cell.innerHTML = task[9];
                      task_cell.setAttribute("colspan", 7);
                      createTr.appendChild(task_cell);
                      week = week + 7;
                    }
                  }
                }
              }


            } else if (task[4] == year && (task[5] - 1) == month) { // 予定が前の月から続いていているとき
                if (i == 0 && week == (task[7] - task[8]) && (n + 1) == task[14] && task[16] == 1) { // 予定が前の月の最後の週から今月の最初の週までのとき
                  task_cell.className = "text-center p-0 round";
                  task_cell.setAttribute("style", "background-color: " + task[10] + ";");
                  task_cell.innerHTML = task[9];
                  task_cell.setAttribute("colspan", task[8] + 1);
                  createTr.appendChild(task_cell);
                  week = week + task[8];
                } else if (i != 0 && (i + 1) == task[16] && (task[1] - 1) < month && (n + 1) == task[14]){ // 長い予定の予定終了週のとき
                  if (week == 0) {
                    console.log("かかかっかか");
                    task_cell.className = "text-center p-0 right-round";
                    task_cell.setAttribute("style", "background-color: " + task[10] + ";");
                    task_cell.innerHTML = task[9];
                    task_cell.setAttribute("colspan", task[7] + 1);
                    createTr.appendChild(task_cell);
                    week = week + task[7];
                  }
                } else { // 前の月から予定が続いてるときの月初めから予定終了の週までうめるとき
                    for(var s = 1; s <= task[16] - 1; s++) {
                    if ((i + 1) == s && year == task[4] && month == (task[5] - 1) && (n + 1) == task[14]) {
                      if (week == 0 && week == task[3]) {
                        task_cell.className = "text-center p-0";
                        task_cell.setAttribute("style", "background-color: " + task[10] + ";");
                        task_cell.innerHTML = task[9];
                        task_cell.setAttribute("colspan", 7);
                        createTr.appendChild(task_cell);
                        week = week + 7;
                      } else if (week == task[3]) { // 前の月からの予定が今月の第一週目にふくまれるとき
                        task_cell.className = "text-center p-0 left-round";
                        task_cell.setAttribute("style", "background-color: " + task[10] + ";");
                        task_cell.innerHTML = task[9];
                        task_cell.setAttribute("colspan", 7 - task[3]);
                        createTr.appendChild(task_cell);
                        week = week + task[8];
                      }
                    }
                  }
                }
            } else if (task[0] == task[4] && (task[5] - task[1]) > 1) {
                for (var s = 1; s <= (task[5] - task[1] - 1); s++) {
                  if ((task[1] + s - 1) == month) {
                    if(week == 0) {
                      task_cell.className = "text-center p-0";
                      task_cell.setAttribute("style", "background-color: " + task[10] + ";");
                      task_cell.innerHTML = task[9];
                      task_cell.setAttribute("colspan", 7);
                      createTr.appendChild(task_cell);
                      week = week + 7;
                    }
                  }
                }
              }

          }
          createTr.appendChild(task_cell);

        }


        date_row += createTr.outerHTML;


      }
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

