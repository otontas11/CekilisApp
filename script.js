"use strict";

// Change to false if you don't want a timer
const showTimer = true;

// Set timer countdown time here in minutes : seconds format
const time = 0 + ":" + 50000;

// Add list of names here
let namesList = [];

checkempty();

class Kisiler {
  constructor(name) {
    this.name = name;
  }
}
class UI {
  kisileriEkle(kisiler) {
    //eklenen kişiler boş elemanları silme
    var kisilerimBos = kisiler.filter((v) => v.trim() != "");
    console.log("kisilerimBos", kisilerimBos);

    //yeni ekleme yapıldığında üsütne ekle ve denetle eğer aynı elema var ise bir tane al sadece
    let names = [...new Set(kisilerimBos)];
    
    for (let kisi of names) {
      namesList.push(kisi.trim());
    }
    console.log("guncel", names);

    //names set inden farklı değişkenler namesliste gittikten sonra tekrar filtrele

    namesList = [...new Set(namesList)];
console.log(namesList,"namelist")
    //names bir taraftan son gelen değişkenleri tutar buyuzden bunu ekrana yazdıralaım
    //eklendikçe göstersin
    kisisListesiEkranaYaz(namesList);

    console.log("guncel namelist", typeof namesList, namesList);
  }
}

function kisisListesiEkranaYaz(data) {
  const list = document.getElementById("course-list");
  $("tbody tr").empty();
  var perrow = 3, // 3 cells per row
    html = "<tr >";

  if (data.length > 0) {
    startButton.style.display = "block";
  } else startButton.style.display = "none";

  for (var i = 0; i < data.length; i++) {
    html += "<td>" + `${i + 1} : ` + data[i] + "</td>";

    // If you need to click on the cell and do something
    // html += "<td onclick='FUNCTION()'>" + data[i] + "</td>";

    // Break into next row
    var next = i + 1;
    if (next % perrow == 0 && next != data.length) {
      html += "</tr><tr>";
    }
  }
  html += "</tr>";

  list.innerHTML += html;
}

// Default variables
let i = 0;
let x = 0;
let intervalHandle = null;
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const headerOne = document.getElementById("headerNames");
const timesUp = document.getElementById("timesUp");
const timerWrapper = document.getElementById("timerWrapper");
const timer = document.getElementById("timer");
//mine
const addPerson = document.getElementById("addPerson");
const kisiListesi = document.getElementById("kisiListesi");
//audi
var audioElement = document.createElement('audio');
audioElement.setAttribute('src', 'msc.mp3');
audioElement.setAttribute('autoplay', 'autoplay');

// Optional countdown timer
// Add zero in front of numbers < 10
function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {
    sec = "0" + sec;
  }
  if (sec < 0) {
    sec = "59";
  }
  return sec;
}

const startTimer = function () {
  const presentTime = timer.innerHTML;
  const timeArray = presentTime.split(/[:]+/);
  let m = timeArray[0];
  let s = checkSecond(timeArray[1] - 1);

  if (s == 59) {
    m = m - 1;
  }
  if (m < 0) {
    timesUp.style.display = "block";
  }

  timer.innerHTML = m + ":" + s;

  setTimeout(startTimer, 1000);
};

// Start or stop the name shuffle on button click
startButton.addEventListener("click", function () {
  audioElement.play();

  audioElement.addEventListener("ended", function(){
  
    audioElement.play();
});


  this.style.display = "none";
  stopButton.style.display = "block";
  intervalHandle = setInterval(function () {
    headerNames.textContent = namesList[i++ % namesList.length];
  }, 1);
  if (showTimer === true) {
    timerWrapper.classList.remove("visible");
  }
});

stopButton.addEventListener("click", function () {
  audioElement.pause();
  this.style.display = "none";
  startButton.style.display = "block";
  clearInterval(intervalHandle);
  timer.innerHTML = time;
  if (showTimer === true) {
    timerWrapper.classList.add("visible");
  }
  startTimer();
});

// // Allow use of spacebar to start/stop name shuffle
// document.body.onkeyup = function (e) {
//   if (e.keyCode == 32) {
//     if (x % 2 === 0) {
//       startButton.style.display = "none";
//       stopButton.style.display = "block";
//       intervalHandle = setInterval(function () {
//         headerNames.textContent = namesList[i++ % namesList.length];
//       }, 50);
//       if (showTimer === true) {
//         timerWrapper.classList.remove("visible");
//       }
//     } else {
//       startButton.style.display = "block";
//       stopButton.style.display = "none";
//       clearInterval(intervalHandle);
//       timer.innerHTML = time;
//       if (showTimer === true) {
//         timerWrapper.classList.add("visible");
//       }
//       startTimer();
//     }
//     x++;
//   }
// };

// Blinking warning
var backgroundInterval = setInterval(function () {
  timesUp.classList.toggle("backgroundRed");
}, 1000);

function checkempty() {
  $("#addPerson").prop("disabled", true);

  $("#kisiListesi").keyup(function () {
    if ($(this).val().length != 0) {
      $(".addPerson").attr("disabled", false);
    } else {
      $(".addPerson").attr("disabled", true);
    }
  });
}

document.getElementById("addPerson").addEventListener("click", function () {
  let getList = document.getElementById("kisiListesi").value;

  let newList = getList.split(",");
  console.log("newList--> ", typeof newList, newList);
  const ui = new UI();
  ui.kisileriEkle(newList);
  document.getElementById("kisiListesi").value = "";
  $(".addPerson").attr("disabled", true);
});
