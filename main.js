var mode = "year";
var times = ["7:55","8:00","8:45","8:50","9:35","9:50","9:55","10:40","10:45","11:30","11:45","11:50","12:35","12:40","13:25","13:30","14:10","14:15","15:00","15:05","15:50"];

function calcPercentage() {
  var start, end;
  if(mode == "year") {
    // * 1 um den String zu einem Number-Objekt zu konvertieren
    start = moment().startOf("year").format("x") * 1;
    end = moment().endOf("year").format("x") * 1;
  } else if(mode == "day") {
    start = moment().startOf("day").format("x") * 1;
    end = moment().endOf("day").format("x") * 1;
  } else if(mode == "lesson") {
    // ich weiß dass das hier richtig ineffizient ist aber naja ist halt "beta" xd
    var hour = moment().hours();
    var minute = moment().minutes();
    for(var i = 0; i < times.length; i++) {
      var splited = times[i].split(":");
      if(splited[0] < hour) {
        continue;
      }
      if(splited[1] <= minute) {
        continue;
      }
      if(i > 0) {
        var splited_start = times[i-1].split(":");
        start = moment().hours(splited_start[0]).minutes(splited_start[1]).startOf("minute").format("x") * 1;
        end = moment().hours(splited[0]).minutes(splited[1]).startOf("minute").format("x") * 1;
        break;
      }
    }
    if(!start && !end) {
      alert("Error. Please retry while a lesson is ongoing. Switching to Year Progress Mode...");
      setMode("year","Year Progress")
    }
  } else if(mode == "lifetime") {
    start = moment("26.08.2003","DD.MM.YYYY").format("x") * 1;
    // Ausgegangen von 77 Jahren Lebenserwartung (haha so lang leb ich niemals...)
    end = moment("26.08.2080","DD.MM.YYYY").format("x") * 1;
  }
  var dur = end - start;
  var now = moment().format("x");
  var nowrelative = now - start;
  var fraction = nowrelative / dur;
  var percentage = fraction * 100;
  return percentage;
}

function updateDisplay(percentage) {
  document.getElementById("text").innerText = percentage.toFixed(10) + "%";
  document.getElementById("processbarinner").style.width = percentage + "%";
}

function update() {
   updateDisplay(calcPercentage());
   window.requestAnimationFrame(update);
}

function init() {
  window.requestAnimationFrame(update);
  addModeBtn("year","Year Progress");
  addModeBtn("day","Day Progress");
  addModeBtn("lesson","Lesson Progress (Beta)");
  addModeBtn("lifetime","Lifespan");
}

window.onload = init;

//setInterval(() => updateDisplay(calcPercentage()), 25);

function addModeBtn(name, displayName, title) {
  if(!displayName) {
    displayName = name;
  }
  if(!title) {
    title = displayName;
  }
  var elem = document.createElement("div");
  elem.className = "switch";
  elem.innerText = displayName;
  elem.onclick = function(){setMode(name,title)};
  document.getElementById("switchcontainerinner").appendChild(elem);
}

function setMode(modename,modetitle) {
  mode = modename;
  document.getElementById("title").innerText = modetitle;
  document.title = modetitle;
}
