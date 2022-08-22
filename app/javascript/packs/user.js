function UserColor() {
  var color_name = document.getElementById("color-name");
  color_name.setAttribute("value", this.id);
  var selected_color = document.getElementById("selected-color");
  selected_color.setAttribute("style", "background-color:" + this.id + ";");
}

let red = document.getElementById("#F28C8E");
red.onclick = UserColor;

let orange = document.getElementById("#FF9E7D");
orange.onclick = UserColor;

let yellow = document.getElementById("#FCB869");
yellow.onclick = UserColor;

let yellow_green = document.getElementById("#EDD267");
yellow_green.onclick = UserColor;

let green = document.getElementById("#CACA61");
green.onclick = UserColor;

let dark_green = document.getElementById("#73C89C");
dark_green.onclick = UserColor;

let dark_blue = document.getElementById("#3FABA4");
dark_blue.onclick = UserColor;

let blue = document.getElementById("#52A6BF");
blue.onclick = UserColor;

let deep_blue = document.getElementById("#6591C0");
deep_blue.onclick = UserColor;

let purple = document.getElementById("#8E87BE");
purple.onclick = UserColor;

let red_purple = document.getElementById("#AC7EAE");
red_purple.onclick = UserColor;

let wine_red = document.getElementById("#D98295");
wine_red.onclick = UserColor;

let white = document.getElementById("#ffffff");
white.onclick = UserColor;

