var today = new Date()
var todate = today.getDate()
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();

var days = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];

showTodayTask(today, currentMonth, currentYear);

function showTodayTask(date, month, year) {
  today_box = document.getElementById('today-box');
  today_box.innerHTML = "";

  var tasks = document.getElementById('tasks');
  var taskHash = JSON.parse(tasks.getAttribute('data-task-status'));


  var today_content = "<h2 class='mx-auto'>" + (month + 1) + "月 " + todate + "日 " + "</h2>";

  for(var l = 0; l < taskHash.length; l++) {
    var task = taskHash[l];

    console.log(task[0]);
    console.log(task[1]);
    console.log(task[2]);
    console.log(year);
    console.log(month);
    console.log(todate);

    if (year === task[0] && month === task[1] && todate === task[2]) {
      today_content += "<p>" + task[9] + "</p>";
      console.log(today_content);
    }
  }

  console.log(task[9]);
  today_box.innerHTML = today_content;
}