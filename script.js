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
    console.log(namesList, "namelist");
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
var audioElement = document.createElement("audio");
audioElement.setAttribute("src", "kahoot.mp3");
audioElement.setAttribute("autoplay", "autoplay");

audioElement.pause();
//winners
const winners = document.querySelector(".winners");
 

var winnerList = new Set([]);

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
startButton.addEventListener("click",function() {
  if (!audioElement) return;
  audioElement.currentTime = 0;
  audioElement.play();
//bittikten sonra tekrar calsın
  // audioElement.addEventListener("ended", function () {
  //   audioElement.play();
  // });

  this.style.display = "none";
  stopButton.style.display = "block";
  intervalHandle = setInterval(function () {
    headerNames.textContent = namesList[i++ % namesList.length];
  }, 1);

  console.log("oktay", headerNames.textContent);

  if (showTimer === true) {
    timerWrapper.classList.remove("visible");
  }

  iphone.style.display = "none";
  headerOne.style.display="block";
//geri syımß
  setTimeout( () => {
    
    $(stopButton).trigger('click');
 
    
  }, 2000);
      
    
   
});
 

 


stopButton.addEventListener("click",function () {
 var html=""; 
 

  var wins = document.querySelector("#headerNames").innerHTML;
  setTimeout(function () {
    console.log("son kazanan", wins);
    showWinners(wins);
  }, 3000);
  //audioElement.pause();  
  console.log("wins", wins);

  this.style.display = "none";
  startButton.style.display = "block";
  clearInterval(intervalHandle);
  timer.innerHTML = time;
  if (showTimer === true) {
    timerWrapper.classList.add("visible");
  }
  startTimer();

  //box işlemleri
  iphone.style.display = "block";
  mw.style.visibility = "visible";

  for (i = 0; i < wins.length; i++) {
    html += `<div class="row rowLetter" style="margin-right:5px;margin-left:5px">
     
    <span class="letter">${wins[i]}</span>
    
</div>

 `;
  }  document.getElementById("iconlar").innerHTML = html;
  console.log("null mı?", html);
  headerOne.style.display="none"
 
  giftAnimation(wins); 
 
});

 
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
function showWinners(wins) {
  let winnerListArray = [...winnerList.add(wins)]; //set i array e çevir
  let colors = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "active",
  ];
  console.log("winnerListArray", winnerListArray);

  const list = document.getElementById("winners");
  $("#winners tr").empty();

  ///////

  var perrow = 1, // 3 cells per row
    html = "<tr class='wins'>";

  for (var i = 0; i < winnerListArray.length; i++) {
    html +=
      "<td class='winning table-" +
      colors[i % 6] +
      " '>" +
      `${i + 1}. Kazanan : ` +
      winnerListArray[i] +
      "</td></tr><tr>";

    // If you need to click on the cell and do something
    // html += "<td onclick='FUNCTION()'>" + data[i] + "</td>";

    // Break into next row
    var next = i + 1;
    if (next % perrow == 0 && next != winnerListArray.length) {
      html += "</tr><tr>";
    }
  }
  html += "</tr>";

  list.innerHTML += html;
}

document.getElementById("addPerson").addEventListener("click", function () {
  let getList = document.getElementById("kisiListesi").value;

  let newList = getList.split("\n");
  console.log("newList--> ", typeof newList, newList);
  const ui = new UI();
  ui.kisileriEkle(newList);
  document.getElementById("kisiListesi").value = "";
  $(".addPerson").attr("disabled", true);
});

// <!-- GIFT BOX SOURCE CODE: https://tympanus.net/codrops/2013/12/24/merry-christmas-with-a-bursting-gift-box/ -->

function giftAnimation(lastwin) {
  let myarray = [lastwin];
  console.log("last winner", lastwin);
  var merrywrap = document.getElementById("merrywrap");
  var box = merrywrap.getElementsByClassName("giftbox")[0];
  var step = 1;
  var stepMinutes = [2000, 2000, 1000, 1000];
  
  function init() {
    
    openBox();
  }
  function stepClass(step) {
    console.log("stepclass");
    merrywrap.className = "merrywrap";
    merrywrap.className = "merrywrap step-" + step;
    
  }
  function openBox() {
  
    if (step === 1) {
      console.log(myarray, "myarray");

      box.removeEventListener("click", openBox, false);
    }
    stepClass(step);
    if (step === 3) {
      console.log("step 2");
    }
    if (step === 4) {
      console.log("step 4");
      setTimeout(function () {
       // audioElement.pause();  
      }, 2000);
     
      return;
    
    }
    setTimeout(openBox, stepMinutes[step - 1]);
    step++;
  }

  init();
}

// =====================

$(document).ready(function () {
  iphone.style.display = "none";
  


});

var mw = document.getElementById("merrywrap");
var iphone = document.getElementById("iphone");
var icons = document.getElementById("#iconlar");

 