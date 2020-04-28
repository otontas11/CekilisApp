"use strict";

// Change to false if you don't want a timer
const showTimer = true;

// Set timer countdown time here in minutes : seconds format
const time = 0 + ":" + 50000;

// Add list of names here
var namesList = [ 
];
function checknameList(values){

	let getvalues=values.filter(function (e) {return e != null;});
	console.log("getval : ",getvalues)
	for(let i of values)
	{
		namesList.push(i)
	}
	namesList = namesList.filter((v) => v != '')
	console.log(",list",namesList)



	if(namesList.length>0){
		startButton.style.display="block"
	}
	else
	startButton.style.display="none"


listeleme(namesList)
	document.getElementById('kisiListesi').value=""

}

function listeleme(kisiler)
{
	const list = document.getElementById('course-list');
	var toplam=1

	for(let kisi of kisiler)
	{
		var html = `
		<tr> 
		   <td style="color:white">${toplam} - ${kisi}</td>  
		</tr>    
	  
   ` 

   console.log("html ",html)
		 toplam++;
 list.innerHTML += html;
	}


	
	  



}


// Default variables
let i = 0;
let x = 0;
let intervalHandle = null;
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const headerOne = document.getElementById('headerNames');
const timesUp = document.getElementById('timesUp');
const timerWrapper = document.getElementById('timerWrapper');
const timer = document.getElementById('timer');
const addPerson=document.getElementById('addPerson');
const kisiListesi=document.getElementById('kisiListesi')

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

const startTimer = function() {
  const presentTime = timer.innerHTML;
  const timeArray = presentTime.split(/[:]+/);
  let m = timeArray[0];
  let s = checkSecond((timeArray[1] - 1));
	
  if (s==59) {
		m = m-1;
	}
  if (m < 0) {
		timesUp.style.display = "block";
	}
  
  timer.innerHTML = m + ":" + s;
	
	setTimeout(startTimer, 1000);
}

// Start or stop the name shuffle on button click
startButton.addEventListener('click', function() {
	this.style.display = "none";
	stopButton.style.display = "block";
	intervalHandle = setInterval(function () {
		headerNames.textContent = namesList[i++ % namesList.length];
	}, 1);
	if (showTimer===true) {
		timerWrapper.classList.remove('visible');
	}
});
stopButton.addEventListener('click', function() {
	this.style.display = "none";
	startButton.style.display = "block";
	clearInterval(intervalHandle);
	timer.innerHTML = time;
	if (showTimer===true) {
		timerWrapper.classList.add('visible');
	}
	startTimer();
});

// Allow use of spacebar to start/stop name shuffle
// document.body.onkeyup = function(e) {
// 	if (e.keyCode == 32) {
// 		if (x%2===0) {
// 			startButton.style.display = "none";
// 			stopButton.style.display = "block";
// 			intervalHandle = setInterval(function () {
// 				headerNames.textContent = namesList[i++ % namesList.length];
// 			}, 50);
// 			if (showTimer===true) {
// 				timerWrapper.classList.remove('visible');
// 			}
// 		} else {
// 			startButton.style.display = "block";
// 			stopButton.style.display = "none";
// 			clearInterval(intervalHandle);
// 			timer.innerHTML = time;
// 			if (showTimer===true) {
// 				timerWrapper.classList.add('visible');
// 			}
// 			startTimer();
// 		}
// 		x++; 
// 	}
// } 

// Blinking warning
var backgroundInterval = setInterval(function() {
  timesUp.classList.toggle("backgroundRed");
}, 1000)

$( document ).ready(function() {
checkempty();

	
	

function checkempty(){
	$('#addPerson').prop('disabled',true);

	$('#kisiListesi').keyup(function(){
        if($(this).val().length !=0){
            $('.addPerson').attr('disabled', false);
        }
        else
        {
            $('.addPerson').attr('disabled', true);        
        }
    })
}

document.getElementById("addPerson").addEventListener("click", function(){
	
	let getList=document.getElementById('kisiListesi').value;
	 
	let newList=getList.split(',')
 
    checknameList(newList)
 

  });
});
