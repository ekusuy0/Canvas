var today = new Date()
var todate = today.getDate()
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();
var endDate = new Date(currentYear, currentMonth + 1, 0).getDate();

var days = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];

showTodayTask(todate, currentMonth, currentYear);

function next() {

  if (todate == endDate) {
    currentMonth = (currentMonth + 1) % 12;
    if (currentMonth == 11) {
      currentYear = currentYear + 1;
    }
  }

  todate = (todate == endDate) ? 1 : todate + 1;
  // endDate = new Date(currentYear, currentMonth + 1, 0).getDate();
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

function showTodayTask(todate, month, year) {
  today_box = document.getElementById('today-box');
  today_box.innerHTML = "";

  var tasks = document.getElementById('tasks');
  var taskHash = JSON.parse(tasks.getAttribute('data-task-status'));


  var now_day = today.getDate();
  var now_month = today.getMonth();
  var now_year = today.getFullYear();

  if (now_day == todate && now_month == month && now_year == year) {
    var today_content = "<div class='text-center py-4'><h4>今日のグループの予定です</h4></div>";
  } else {
    var today_content = "<div class='text-center py-4'><h4>" + (month + 1) + "月 " + todate + "日のグループの予定です" + "</h4></div>";
  }

  for(var i = 0; i < taskHash.length; i++) {
    var task = taskHash[i];


    if (year == task[0] && month == (task[1] - 1) && todate == task[2]) {
      today_content += "<div class='container'>"
      today_content += "<div class='row mx-auto'>"
      today_content += "<div class='col-2'><p class='round text-center' style='background: linear-gradient(to right, " + task[10] + ", #ffffff, " + task[10] + ");'>" + task[11] + "</p></div>";
      today_content += "<p class='col-2 text-center'>" + task[9] + "</p>"
      today_content += "<p class='col-7'>" + task[12] + "</p>"
      today_content += "<p class='col-1 p-0'><a href='/group_tasks/" + task[13] + "/edit' class='btn btn-outline-secondary btn-sm'>編集</a></p>"
      today_content += "</div></div>"
    }
   }

  today_box.innerHTML = today_content;
}