var days = ["日", "月", "火", "水", "木", "金", "土"];
var dayNames = "<tbody>" + "<tr>";

for (let day in days) {
  dayNames += "<th class='text-center' title='" + days[day] + "'>" + days[day] + "</th>";
}
dayNames += "</tr>" + "</tbody>";

document.getElementById('myDaynamesTable').innerHTML = dayNames;

var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();

showCalendar(currentMonth, currentYear);


function showCalendar(month, year) {
  mv_event = document.getElementById("mvEventContainer2");
  for(let i = 0; i < 6; i++) {
    month_row = document.createElement("div");
    month_row.className = 'month-row';
    // month_row.setAttribute("type", "top:"+ i * 16.666 + "%: height: 17.666%");


    var week_row = "<table cellpadding='0' cellspacing='0' class='st-bg-table table table-bordered row-10 mb-0'>";
    week_row += "<tbody>" + "<tr>";

    for(let j = 0; j < 7; j++) {

      if (j === 0) {
        week_row += "<td class='st-bg st-bg-fc'>&nbsp";

      } else {
        week_row += "<td class='st-bg'>&nbsp";
      }
      document.getElementsByClassName("st-bg").innerHTML;
      week_row += "</td>";
    }
    week_row += "</tr>" + "</tbody>" + "</table>";

    month_row.innerHTML = week_row;
    mv_event.appendChild(month_row);
  }

  var date_row = "<table cellpadding='0' cellspacing='0' class='st-grid table table-bordered row-10 mb-0'>";
  date_row += "<tbody>" + "<tr>";
}