'use strict'

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const firstDate = new Date(year,month -1, 1);
const firstDay = firstDate.getDay(); //曜日のデータが数字で入っている
const lastDate = new Date(year, month, 0);
const lastDayCount = lastDate.getDate();


let dayCount = 1;
let createHtml = '';

createHtml = '<h1>' + year + '/' + month + '</h1>'
createHtml += '<table class="table vh-100 w-100">' + '<thead>' + '<tr>';

// weeksという変数に曜日の配列をあらかじめ入れてあげる
const weeks = ['日','月','火','水','木','金','土'];

// weeks.lengthは配列の個数
for (let i = 0; i < weeks.length; i++) {
  createHtml += '<th class="text-center">' + weeks[i] + '</th>';
}
createHtml += '</tr>' + '</thead>';

// 行を６行作るためのfor文
for (let n = 0; n < 6; n++) {
  createHtml += '<tr>';

  // 列を７列作るためのfor文
    for (let d = 0; d < 7; d++) {
      // dは列のことで、それが曜日のデータより小さいときは空の箱ができる
      if (n == 0 && d < firstDay) {
        createHtml += '<td></td>';
      } else if (dayCount > lastDayCount) {
        createHtml += '<td></td>';
      } else {
        createHtml += '<td class="text-center">' + dayCount + '</td>';
        dayCount++
      }
    }
  createHtml += '</tr>';
}

createHtml += '</table>'

document.querySelector('#calendar').innerHTML = createHtml;


