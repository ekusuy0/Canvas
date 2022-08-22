function TagColor() {
  var color_name = document.getElementById("color-name");
  color_name.setAttribute("value", this.id);
  var selected_color = document.getElementById("selected-color");
  selected_color.setAttribute("style", "background-color:" + this.id + ";");
}


let red = document.getElementById("#F28C8E");
red.onclick = TagColor;

let orange = document.getElementById("#FF9E7D");
orange.onclick = TagColor;

let yellow = document.getElementById("#FCB869");
yellow.onclick = TagColor;

let yellow_green = document.getElementById("#EDD267");
yellow_green.onclick = TagColor;

let green = document.getElementById("#CACA61");
green.onclick = TagColor;

let dark_green = document.getElementById("#73C89C");
dark_green.onclick = TagColor;

let dark_blue = document.getElementById("#3FABA4");
dark_blue.onclick = TagColor;

let blue = document.getElementById("#52A6BF");
blue.onclick = TagColor;

let deep_blue = document.getElementById("#6591C0");
deep_blue.onclick = TagColor;

let purple = document.getElementById("#8E87BE");
purple.onclick = TagColor;

let red_purple = document.getElementById("#AC7EAE");
red_purple.onclick = TagColor;

let wine_red = document.getElementById("#D98295");
wine_red.onclick = TagColor;