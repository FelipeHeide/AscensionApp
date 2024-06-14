let cronometroInterval;
let segundos = 0;
let minutos = 0;
let micro = 0;

function formatearNumero(numero) {
   return (numero < 10 ? "0" : "") + numero;
}

function start_timer() {
   micro++;
   if (micro === 100) {
      segundos++;
      micro = 0;
   }
   if (segundos === 60) {
      segundos = 0;
      minutos++;
   }
   let minutosFormateados = formatearNumero(minutos);
   let segundosFormateados = formatearNumero(segundos);
   let microFormateados = formatearNumero(micro);

   document.getElementById("crono").innerHTML =
      minutosFormateados + ":" + segundosFormateados + ":" + microFormateados;
}

function start() {
   minutos = 0;
   segundos = 0;
   micro = 0;
   cronometroInterval = setInterval(start_timer, 10);
   document.getElementById("start").innerHTML = "STOP";
   document.getElementById("start").removeAttribute("onclick");
   document.getElementById("start").setAttribute("onclick", "stop();");
}

function re_start() {
   document.getElementById("crono").innerHTML = "00:00:00";

   document
      .getElementById("start")
      .style.setProperty("border-radius", "1000px");
   document.getElementById("start").style.setProperty("font-size", "80px");
   document.getElementById("start").removeAttribute("onclick");
   document.getElementById("start").setAttribute("onclick", "start();");
   document.getElementById("start").style.setProperty("width", "400px");

   document.getElementById("start").innerHTML = "START";
}

function stop() {
   clearInterval(cronometroInterval);
   tiempo = segundos + 60 * minutos + micro / 100;
   height = (tiempo * tiempo * 9.80665) / 2;
   height_formatted = height.toFixed(2);
   average_speed = ((tiempo * 9.80665) / 2 / 1000) * 3600;
   average_speed_formatted = average_speed.toFixed(2);
   impact_speed = ((tiempo * 9.80665) / 1000) * 3600;
   impact_speed_formatted = impact_speed.toFixed(2);

   document.getElementById("start").style.setProperty("border-radius", "10px");
   document.getElementById("start").style.setProperty("font-size", "25px");
   document.getElementById("start").style.setProperty("width", "500px");

   document.getElementById("start").innerHTML =
      "<b>Time:</b> " +
      tiempo.toString() +
      " seconds<br>" +
      "<b>Height:</b> " +
      height_formatted.toString() +
      " meters<br>" +
      "<b>Speed:</b> " +
      average_speed_formatted.toString() +
      " Km/H<br>" +
      "<b>Impact Speed:</b> " +
      impact_speed_formatted.toString() +
      " Km/H<br>Planet: Earth<br>Acceleration: 9.81 m/s²";

   document.getElementById("start").removeAttribute("onclick");
   document.getElementById("start").setAttribute("onclick", "re_start();");
}
