var today = new Date()
var todate = today.getDate()
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();
var endDate = new Date(currentYear, currentMonth + 1, 0).getDate();



showTodayTask(todate, currentMonth, currentYear);

function next() {

  if (todate == endDate) {
    currentMonth = (currentMonth + 1) % 12;
    if (currentMonth == 11) {
      currentYear = currentYear + 1;
    }
  }

  todate = (todate == endDate) ? 1 : todate + 1;
  endDate = new Date(currentYear, currentMonth + 1, 0).getDate();
  showTodayTask(todate, currentMonth, currentYear);

}

let nexton = document.getElementById('day-next');
nexton.onclick = next;


function previous() {

  currentYear = (currentMonth == 0) ? currentYear - 1 : currentYear;
  currentMonth = (todate == 1) ? (currentMonth == 0) ? 11 : currentMonth - 1 : currentMonth;
  endDate = new Date(currentYear, currentMonth + 1, 0).getDate();endDate = new Date(currentYear, currentMonth + 1, 0).getDate();
  endDate = new Date(currentYear, currentMonth + 1, 0).getDate();
  todate = (todate == 1) ? endDate : todate - 1;
  showTodayTask(todate, currentMonth, currentYear);

}
let previouson = document.getElementById('day-previous');
previouson.onclick = previous;

document.addEventListener("click", function(e) {
  if(e.target.classList.contains("date-picker")) {
    todate = parseInt(e.target.dataset.date, 10);
    currentMonth = parseInt(e.target.dataset.month, 10) - 1;
    currentYear = parseInt(e.target.dataset.year, 10);
    showTodayTask(todate, currentMonth, currentYear);
  }
})

document.addEventListener("click", scroll_to_top);

function scroll_to_top(){
  window.scroll({top: 0, behavior: 'smooth'});
};


function showTodayTask(todate, month, year) {
  today_box = document.getElementById('today-box');
  today_box.innerHTML = "";

  var tasks = document.getElementById('tasks');
  var taskHash = JSON.parse(tasks.getAttribute('data-task-status'));

  var id_count = 0
  for (var i = 0; i < taskHash.length; i++) {
    var task = taskHash[i];
    if (year == task['start_time_year'] && month == (task['start_time_month'] - 1) && todate == task['start_time_day']) {
      if (task['group_id']) {
        id_count++;
      }
    }

    if (year == task['start_time_year'] && month == (task['start_time_month'] - 1) || month == (task['end_time_month'] - 1)) {
      for (var j = 0; j <= task['task_span']; j++) {
        if (task['start_time_day'] + j <= endDate) {
          if (todate == task['start_time_day'] + j) {
            if (task['group_id']) {
              id_count++;
            }
          }
        }
      }
    }

    if (year == task['start_time_year'] && month == (task['end_time_month'] - 1) && (task['start_time_month'] - 1) < month) {
      for (var h = 1; h <= task['end_time_day']; h++) {
        if (todate == h) {
          if (task['group_id']) {
            id_count++;
          }
        }
      }
    }
  }

  var now_day = today.getDate();
  var now_month = today.getMonth();
  var now_year = today.getFullYear();

  var calendar_user = document.getElementById('calendar_user');
  var calendar = JSON.parse(calendar_user.getAttribute('data-calendar'));

  if (calendar == "user") {
    if (now_day == todate && now_month == month && now_year == year) {
      var today_content = "<div class='text-center py-4'><h4>今日のあなたの予定です</h4></div>";
    } else {
      var today_content = "<div class='text-center py-4'><h4>" + (month + 1) + "月 " + todate + "日のあなたの予定です" + "</h4></div>";
    }
    if (id_count > 0) {
      today_content += "<div class='text-center'><p class='m-0'>※★マークはグループでのあなたの予定です</p></div>";
    }
  } else {
    if (now_day == todate && now_month == month && now_year == year) {
      var today_content = "<div class='text-center py-4'><h4>今日のグループの予定です</h4></div>";
    } else if (calendar == "group") {
      var today_content = "<div class='text-center py-4'><h4>" + (month + 1) + "月 " + todate + "日のグループの予定です" + "</h4></div>";
    }
  }

  for(var i = 0; i < taskHash.length; i++) {
    var task = taskHash[i];


    if(task['task_span'] == 0) {
      if (year == task['start_time_year'] && month == (task['start_time_month'] - 1) && todate == task['start_time_day']) {
        today_content += "<div class='row m-0'>"
        if (calendar == "user") {
          if (task['group_id']) {
            today_content += "<div class='col-2'><p class='round text-center' style='background-color: " + task['tag_color'] + ";'>★" + task['tag_name'] + "</p></div>";
          } else {
            today_content += "<div class='col-2'><p class='round text-center' style='background-color: " + task['tag_color'] + ";'>" + task['tag_name'] + "</p></div>";
          }
        } else {
          today_content += "<div class='col-2'><p class='round text-center' style='background-color: " + task['tag_color'] + ";'>" + task['tag_name'] + "</p></div>";
        }
        today_content += "<p class='col-2 text-center'>" + task['title'] + "</p>"
        today_content += "<p class='col-7'>" + task['content'] + "</p>"
        if (task['group_id']) {
          today_content += "<p class='col-1 p-0 text-center tttt'><a href='/group_tasks/" + task['task_id'] + "/edit' class='btn btn-outline-secondary btn-sm'>編集</a></p>"
        } else {
          today_content += "<p class='col-1 p-0 text-center'><a href='/tasks/" + task['task_id'] + "/edit' class='btn btn-outline-secondary btn-sm'>編集</a></p>"
        }
        today_content += "</div>"
      }
    } else {
      if (year == task['start_time_year'] && month == (task['start_time_month'] - 1) || month == (task['end_time_month'] - 1)) {
        for (var j = 0; j <= task['task_span']; j++) {
          if (task['start_time_day'] + j <= endDate) {
            if (todate == task['start_time_day'] + j) {
              today_content += "<div class='row m-0'>"
              if (calendar == "user") {
                if (task['group_id']) {
                  today_content += "<div class='col-2'><p class='round text-center' style='background-color: " + task['tag_color'] + ";'>★" + task['tag_name'] + "</p></div>";
                } else {
                  today_content += "<div class='col-2'><p class='round text-center mmm' style='background-color: " + task['tag_color'] + ";'>" + task['tag_name'] + "</p></div>";
                }
              } else {
                today_content += "<div class='col-2'><p class='round text-center tt' style='background-color: " + task['tag_color'] + ";'>" + task['tag_name'] + "</p></div>";
              }
              today_content += "<p class='col-2 text-center'>" + task['title'] + "</p>"
              today_content += "<p class='col-7'>" + task['content'] + "</p>"
              if (task['group_id']) {
                today_content += "<p class='col-1 p-0 text-center tttt'><a href='/group_tasks/" + task['task_id'] + "/edit' class='btn btn-outline-secondary btn-sm'>編集</a></p>"
              } else {
                today_content += "<p class='col-1 p-0 text-center'><a href='/tasks/" + task['task_id'] + "/edit' class='btn btn-outline-secondary btn-sm'>編集</a></p>"
              }
              today_content += "</div>"
            }
          }
        }
      }
      if (year == task['start_time_year'] && month == (task['end_time_month'] - 1) && (task['start_time_month'] - 1) < month) {
        for (var h = 1; h <= task['end_time_day']; h++) {
          if (todate == h) {
            today_content += "<div class='row m-0'>"
            if (calendar == "user") {
              if (task['group_id']) {
                today_content += "<div class='col-2'><p class='round text-center' style='background-color: " + task['tag_color'] + ";'>★" + task['tag_name'] + "</p></div>";
              } else {
                today_content += "<div class='col-2'><p class='round text-center' style='background-color: " + task['tag_color'] + ";'>" + task['tag_name'] + "</p></div>";
              }
            } else {
              today_content += "<div class='col-2'><p class='round text-center' style='background-color: " + task['tag_color'] + ";'>" + task['tag_name'] + "</p></div>";
            }
            today_content += "<p class='col-2 text-center'>" + task['title'] + "</p>"
            today_content += "<p class='col-7'>" + task['content'] + "</p>"
            if (task['group_id']) {
              today_content += "<p class='col-1 p-0 text-center tttt'><a href='/group_tasks/" + task['task_id'] + "/edit' class='btn btn-outline-secondary btn-sm'>編集</a></p>"
            } else {
              today_content += "<p class='col-1 p-0 text-center'><a href='/tasks/" + task['task_id'] + "/edit' class='btn btn-outline-secondary btn-sm'>編集</a></p>"
            }
            today_content += "</div>"
          }
        }
      }
    }
  }

  today_box.innerHTML = today_content;
}