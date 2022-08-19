function TagColor() {
  var color_name = document.getElementById("color-name");
  color_name.setAttribute("value", this.id);
  var selected_color = document.getElementById("selected-color");
  selected_color.setAttribute("style", "background-color:" + this.id + ";");
  console.log(this.id)
}

let red = document.getElementById("#FF4000");
red.onclick = TagColor;

let orange = document.getElementById("#FF8C00");
orange.onclick = TagColor;

let yellow = document.getElementById("#FFE500");
yellow.onclick = TagColor;

let yellow_green = document.getElementById("#B2DB11");
yellow_green.onclick = TagColor;

let green = document.getElementById("#1B9850");
green.onclick = TagColor;

let dark_green = document.getElementById("#017E74");
dark_green.onclick = TagColor;

let dark_blue = document.getElementById("#006881");
dark_blue.onclick = TagColor;

let blue = document.getElementById("#0C419A");
blue.onclick = TagColor;

let deep_blue = document.getElementById("#3D258E");
deep_blue.onclick = TagColor;

let purple = document.getElementById("#6B1687");
purple.onclick = TagColor;

let red_purple = document.getElementById("#AE0158");
red_purple.onclick = TagColor;

let wine_red = document.getElementById("#F80040");
wine_red.onclick = TagColor;

