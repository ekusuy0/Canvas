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


var user_calendar_status = document.getElementById('user_calendar_status');
var check = JSON.parse(user_calendar_status.getAttribute('data-calendar-status'));

var calendar_user = document.getElementById('calendar_user');
var calendar = JSON.parse(calendar_user.getAttribute('data-calendar'));

if (check) {

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

} else {

  var days = ["月", "火", "水", "木", "金", "土", "日"];
  var months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
  var dayNames = "<tbody>" + "<tr>";

  var user_color = document.getElementById('user_color');
  var color = JSON.parse(user_color.getAttribute('data-user-status'));

  for (let day in days) {
    dayNames += "<th class='text-center' title='" + days[day] + "' style='background-color:" + color + ";'>" + days[day] + "</th>";
  }
  dayNames += "</tr>" + "</tbody>";

  document.getElementById('myDaynamesTable').innerHTML = dayNames;

}

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
  if (check) {
    var firstDay = (new Date(year, month)).getDay(); // 月の最初の曜日
    var lastFirstDay = (new Date(year, month - 1)).getDay();
  } else {
    var firstDay = (new Date(year, month)).getDay(); // 月曜日始まりだから-１している
    if (firstDay == 0) {
      firstDay = 6;
    } else {
      firstDay = firstDay - 1;
    }
    var lastFirstDay = (new Date(year, month - 1)).getDay();
    if (lastFirstDay == 0) {
      lastFirstDay = 6;
    } else {
      lastFirstDay = lastFirstDay - 1;
    }
  }
  var endDate = new Date(year, month + 1, 0).getDate();
  var lastMonthEndDay = new Date(year, month, 0).getDate();
  var lastMonthEndDate = new Date(year, month, 0).getDate();


  monthAndYear.innerHTML = "<h4>" + year + " / " + (month + 1) + "</h4>";
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
        cell.className = "date-picker text-center p-0 under_border day_picker";
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
      if((i + 1) == task['week_count'] && year == task['start_time_year'] && month == (task['start_time_month'] - 1)) {
        count.push(task['task_day_count']);
      }

      // 予定終了日が入る週とiが一致するとき
      if ((i + 1) == task['week_of_month'] && year == task['start_time_year'] && month == (task['start_time_month'] - 1)) {
        count.push(task['task_day_count']);
      }

      // 今月の中で予定が週をまたぐとき
      if (task['week_of_month'] > task['week_count']　&& (task['week_of_month'] - task['week_count']) > 1) {
        for(var s = 1; s <= (task['week_of_month'] - task['week_count']); s++) {
          if ((i + 1) == (task['week_count'] + s) && year == task['start_time_year'] && month == (task['start_time_month'] - 1)) {
            count.push(task['task_day_count']);
          }
        }
      }

      // 他の月まで予定がまたぐときの予定開始日から月最終日まで
      if (task['start_time_year'] == task['end_time_year'] && task['start_time_month'] < task['end_time_month'] && (task['start_time_month'] - 1) == month) {
        for (var s = 1; s <= (firstDay + endDate) / 6 - task['week_count']; s++) {
          if ((i + 1) == (task['week_count'] + s)) {
            count.push(task['task_day_count']);
          }
        }
      }

      // 前の月から予定が続いて今月初めから予定終了日まで
      if (task['start_time_year'] == task['end_time_year'] && task['start_time_month'] < task['end_time_month'] && (task['end_time_month'] - 1) == month) {
        for (var s = 1; s <= task['week_of_month']; s++) {
          if ((i + 1) == s) {
            count.push(task['task_day_count']);
          }
        }
      }

      // 前の月からの予定がその月の一週目で終わるとき
      if (i == 0 && task['end_time_day'] < task['task_span'] + 1 && year == task['end_time_year'] && month == (task['end_time_month'] - 1) && task['week_of_month'] == 1) {
        count.push(task['task_day_count']);
      }


      if (task['start_time_year'] == task['end_time_year'] && (task['end_time_month'] - task['start_time_month']) > 1) {
        for (var s = 1; s <= (task['end_time_month'] - task['start_time_month'] - 1); s++) {
          if ((task['start_time_month'] + s - 1) == month) {
            count.push(task['task_day_count']);
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
            if (task['start_time_year'] == year && (task['start_time_month'] - 1) == month) {


              if (week == task['start_time_wday'] && (n + 1) == task['task_day_count'] && (i + 1) == task['week_count']) {
                if (task['task_span'] == 0) { // 予定の長さが一日の時
                  task_cell.className = 'text-center p-0 round';
                  task_cell.setAttribute("style", "background-color: " + task['tag_color'] + ";");
                  if (calendar == "user") {
                    if (task['group_id']) {
                      task_cell.innerHTML = "★" + task['title'];
                    } else {
                      task_cell.innerHTML = task['title'];
                    }
                  } else {
                    task_cell.innerHTML = task['title'];
                  }
                  createTr.appendChild(task_cell);

                } else if (task['start_time_wday'] + task['task_span'] < 7) { // タスクがその週の間に日をまたぐとき
                  task_cell.className = 'text-center p-0 round';
                  task_cell.setAttribute("style", "background-color: " + task['tag_color'] + ";");
                  task_cell.setAttribute("colspan", task['task_span'] + 1);
                  if (calendar == "user") {
                    if (task['group_id']) {
                      task_cell.innerHTML = "★" + task['title'];
                    } else {
                      task_cell.innerHTML = task['title'];
                    }
                  } else {
                    task_cell.innerHTML = task['title'];
                  }
                  createTr.appendChild(task_cell);
                  week = week + task['task_span'];

                } else { // タスクが週をまたぐとき
                  task_cell.setAttribute("colspan", 7 - task['start_time_wday']);
                  if (calendar == "user") {
                    if (task['group_id']) {
                      task_cell.innerHTML = "★" + task['title'];
                    } else {
                      task_cell.innerHTML = task['title'];
                    }
                  } else {
                    task_cell.innerHTML = task['title'];
                  }
                  task_cell.className = 'text-center p-0 left-round t';
                  task_cell.setAttribute("style", "background-color: " + task['tag_color'] + ";")
                  createTr.appendChild(task_cell);
                  week = week + 6 - task['start_time_wday'];
                }
              } else if (week == 0 && (n + 1) == task['task_day_count'] && (i + 1) == task['week_of_month']) {
                if ((task['week_of_month'] - task['week_count']) != 0 && (task['end_time_month'] - 1) == month) { // 週をまたいだ終わりのところ

                  task_cell.className = "text-center p-0 right-round";
                  task_cell.setAttribute("style", "background-color: " + task['tag_color'] + ";");
                  if (calendar == "user") {
                    if (task['group_id']) {
                      task_cell.innerHTML = "★" + task['title'];
                    } else {
                      task_cell.innerHTML = task['title'];
                    }
                  } else {
                    task_cell.innerHTML = task['title'];
                  }
                  task_cell.setAttribute("colspan", task['end_time_wday'] + 1);
                  createTr.appendChild(task_cell);
                  week = week + task['end_time_wday'];

                }
              }

              if (task['week_of_month'] > task['week_count'] && (task['week_of_month'] - task['week_count']) > 1) { // 予定がその月の中で長い予定
                for(var s = 1; s < (task['week_of_month'] - task['week_count']); s++) {
                  if ((i + 1) == (task['week_count'] + s) && year == task['start_time_year'] && month == (task['start_time_month'] - 1) && (n + 1) == task['task_day_count']) {
                    if (week == 0) {
                      task_cell.className = "text-center p-0";
                      task_cell.setAttribute("style", "background-color: " + task['tag_color'] + ";");
                      if (calendar == "user") {
                        if (task['group_id']) {
                          task_cell.innerHTML = "★" + task['title'];
                        } else {
                          task_cell.innerHTML = task['title'];
                        }
                      } else {
                        task_cell.innerHTML = task['title'];
                      }
                      task_cell.setAttribute("colspan", 7);
                      createTr.appendChild(task_cell);
                      week = week + 7;
                    }
                  }
                }
              }

              if (task['start_time_year'] == task['end_time_year'] && task['start_time_month'] < task['end_time_month']) { // 予定が次の月にまたいでいるときの予定開始日から月の終わりまで
                for(var s = 1; s <= (firstDay + endDate) / 6 - task['week_count']; s++) {
                  if ((i + 1) == (task['week_count'] + s) && year == task['start_time_year'] && month == (task['start_time_month'] - 1) && (n + 1) == task['task_day_count']) {
                    if (week == 0) {
                      task_cell.className = "text-center p-0";
                      task_cell.setAttribute("style", "background-color: " + task['tag_color'] + ";");
                      if (calendar == "user") {
                        if (task['group_id']) {
                          task_cell.innerHTML = "★" + task['title'];
                        } else {
                          task_cell.innerHTML = task['title'];
                        }
                      } else {
                        task_cell.innerHTML = task['title'];
                      }
                      task_cell.setAttribute("colspan", 7);
                      createTr.appendChild(task_cell);
                      week = week + 7;
                    }
                  }
                }
              }


            } else if (task['end_time_year'] == year && (task['end_time_month'] - 1) == month) { // 予定が前の月から続いていているとき
                if (i == 0 && week == (task['end_time_wday'] - task['task_span']) && (n + 1) == task['task_day_count'] && task['week_of_month'] == 1) { // 予定が前の月の最後の週から今月の最初の週までのとき
                  task_cell.className = "text-center p-0 round";
                  task_cell.setAttribute("style", "background-color: " + task['tag_color'] + ";");
                  if (calendar == "user") {
                    if (task['group_id']) {
                      task_cell.innerHTML = "★" + task['title'];
                    } else {
                      task_cell.innerHTML = task['title'];
                    }
                  } else {
                    task_cell.innerHTML = task['title'];
                  }
                  task_cell.setAttribute("colspan", task['task_span'] + 1);
                  createTr.appendChild(task_cell);
                  week = week + task['task_span'];
                } else if (i != 0 && (i + 1) == task['week_of_month'] && (task['start_time_month'] - 1) < month && (n + 1) == task['task_day_count']){ // 長い予定の予定終了週のとき
                  if (week == 0) {
                    task_cell.className = "text-center p-0 right-round";
                    task_cell.setAttribute("style", "background-color: " + task['tag_color'] + ";");
                    if (calendar == "user") {
                      if (task['group_id']) {
                        task_cell.innerHTML = "★" + task['title'];
                      } else {
                        task_cell.innerHTML = task['title'];
                      }
                    } else {
                      task_cell.innerHTML = task['title'];
                    }
                    task_cell.setAttribute("colspan", task['end_time_wday'] + 1);
                    createTr.appendChild(task_cell);
                    week = week + task['end_time_wday'];
                  }
                } else { // 前の月から予定が続いてるときの月初めから予定終了の週までうめるとき
                    for(var s = 1; s <= task['week_of_month'] - 1; s++) {
                    if ((i + 1) == s && year == task['end_time_year'] && month == (task['end_time_month'] - 1) && (n + 1) == task['task_day_count']) {
                      if (week == 0 && (i + 1) != task['week_of_month'] && task['week_count'] != Math.floor((lastFirstDay + lastMonthEndDay) / 6)) {
                        task_cell.className = "text-center p-0";
                        task_cell.setAttribute("style", "background-color: " + task['tag_color'] + ";");
                        if (calendar == "user") {
                          if (task['group_id']) {
                            task_cell.innerHTML = "★" + task['title'];
                          } else {
                            task_cell.innerHTML = task['title'];
                          }
                        } else {
                          task_cell.innerHTML = task['title'];
                        }
                        task_cell.setAttribute("colspan", 7);
                        createTr.appendChild(task_cell);
                        week = week + 7;
                      } else if (week == task['start_time_wday']) { // 前の月からの予定が今月の第一週目にふくまれるとき
                        task_cell.className = "text-center p-0 left-round";
                        task_cell.setAttribute("style", "background-color: " + task['tag_color'] + ";");
                        if (calendar == "user") {
                          if (task['group_id']) {
                            task_cell.innerHTML = "★" + task['title'];
                          } else {
                            task_cell.innerHTML = task['title'];
                          }
                        } else {
                          task_cell.innerHTML = task['title'];
                        }
                        task_cell.setAttribute("colspan", 7 - task['start_time_wday']);
                        createTr.appendChild(task_cell);
                        week = week + task['task_span'];
                      } else if (week == 0 && task['end_time_month'] - task['start_time_month'] > 1) {
                        task_cell.className = "text-center p-0";
                        task_cell.setAttribute("style", "background-color: " + task['tag_color'] + ";");
                        if (calendar == "user") {
                          if (task['group_id']) {
                            task_cell.innerHTML = "★" + task['title'];
                          } else {
                            task_cell.innerHTML = task['title'];
                          }
                        } else {
                          task_cell.innerHTML = task['title'];
                        }
                        task_cell.setAttribute("colspan", 7);
                        createTr.appendChild(task_cell);
                        week = week + 7;
                      }
                    }
                  }
                }
            } else if (task['start_time_year'] == task['end_time_year'] && (task['end_time_month'] - task['start_time_month']) > 1) {
                for (var s = 1; s <= (task['end_time_month'] - task['start_time_month'] - 1); s++) {
                  if ((task['start_time_month'] + s - 1) == month) {
                    if((n + 1) == task['task_day_count'] && task['week_count']) {
                      if (i == 0 && task['week_count'] == Math.floor((lastFirstDay + lastMonthEndDay) / 6)) {
                        if (week == task['start_time_wday']) {
                          task_cell.className = "text-center p-0 left-round ekjij@";
                          task_cell.setAttribute("style", "background-color: " + task['tag_color'] + ";");
                          if (calendar == "user") {
                            if (task['group_id']) {
                              task_cell.innerHTML = "★" + task['title'];
                            } else {
                              task_cell.innerHTML = task['title'];
                            }
                          } else {
                            task_cell.innerHTML = task['title'];
                          }
                          task_cell.setAttribute("colspan", 7 - task['start_time_wday']);
                          createTr.appendChild(task_cell);
                          week = week + task['task_span'];
                        }
                      } else if (week == 0 ) {
                        task_cell.className = "text-center p-0 mmak";
                        task_cell.setAttribute("style", "background-color: " + task['tag_color'] + ";");
                        if (calendar == "user") {
                          if (task['group_id']) {
                            task_cell.innerHTML = "★" + task['title'];
                          } else {
                            task_cell.innerHTML = task['title'];
                          }
                        } else {
                          task_cell.innerHTML = task['title'];
                        }
                        task_cell.setAttribute("colspan", 7);
                        createTr.appendChild(task_cell);
                        week = week + 7;
                      }
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
