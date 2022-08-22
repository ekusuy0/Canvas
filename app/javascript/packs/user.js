function UserColor() {
  var color_name = document.getElementById("color-name");
  color_name.setAttribute("value", this.id);
  var selected_color = document.getElementById("selected-color");
  selected_color.setAttribute("value", this.id);
}

let red = document.getElementById("style=background-color:#FF4000;");
red.onclick = UserColor;

let orange = document.getElementById("style=background-color:#FF8C00;");
orange.onclick = UserColor;

let yellow = document.getElementById("style=background-color:#FFE500;");
yellow.onclick = UserColor;

let yellow_green = document.getElementById("style=background-color:#B2DB11;");
yellow_green.onclick = UserColor;

let green = document.getElementById("style=background-color:#1B9850;");
green.onclick = UserColor;

let dark_green = document.getElementById("style=background-color:#017E74;");
dark_green.onclick = UserColor;

let dark_blue = document.getElementById("style=background-color:#006881;");
dark_blue.onclick = UserColor;

let blue = document.getElementById("style=background-color:#0C419A;");
blue.onclick = UserColor;

let deep_blue = document.getElementById("style=background-color:#3D258E;");
deep_blue.onclick = UserColor;

let purple = document.getElementById("style=background-color:#6B1687;");
purple.onclick = UserColor;

let red_purple = document.getElementById("style=background-color:#AE0158;");
red_purple.onclick = UserColor;

let wine_red = document.getElementById("style=background-color:#F80040;");
wine_red.onclick = UserColor;

