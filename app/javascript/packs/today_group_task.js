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


function showTodayTask(date, month, year) {
  today_box = document.getElementById('today-box');
  today_box.innerHTML = "";

  var tasks = document.getElementById('tasks');
  var taskHash = JSON.parse(tasks.getAttribute('data-task-status'));

  var now_day = today.getDate();
  if (now_day == todate) {
    var today_content = "<div class='text-center'><h2 class='mb-4'>今日のグループの予定です！！</h2></div>";
  } else {
    var today_content = "<div class='text-center'><h2 class='mb-4'>" + (month + 1) + "月 " + todate + "日のグループの予定です！！" + "</h2></div>";
  }

  for(var i = 0; i < taskHash.length; i++) {
    var task = taskHash[i];


    if (year == task[0] && month == (task[1] - 1) && todate == task[2]) {
      today_content += "<div class='container'>"
      today_content += "<div class='row mx-auto'>"
      today_content += "<p class='col-2 round text-center " + task[10] + "'>" + task[11] + "</p>";
      today_content += "<p class='col-2 text-center'>" + task[9] + "</p>"
      today_content += "<p class='col-8'>" + task[12] + "</p>"
      today_content += "</div></div>"
    }
   }

  today_box.innerHTML = today_content;
}