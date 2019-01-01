function calcPercentage() {
  var yearstart = moment().startOf("year").format("x") * 1;
  var yearend = moment().endOf("year").format("x") * 1;
  var yeardur = yearend - yearstart;
  var now = moment().format("x");
  var nowinyear = now - yearstart;
  var fraction = nowinyear / yeardur;
  var percentage = fraction * 100;
  return percentage;
}

function updateDisplay(percentage) {
  document.getElementById("text").innerText = percentage.toFixed(10) + "%";
  document.getElementById("processbarinner").style.width = percentage + "%";
}

setInterval(() => updateDisplay(calcPercentage()), 25);
