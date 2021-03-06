
var submit = document.getElementById("submit");
var fitDisplay = document.getElementById("fitLevel");


window.onload = function() {
	getCookie();
	document.getElementById("navbarItems").children[1].classList.add("active")
}


function getCookie(){
	var decodedCookie = decodeURIComponent(document.cookie);
	var cookieList = decodedCookie.split(';');
	for (var i= 0; i < cookieList.length; i++){
		cookie = cookieList[i].split("=")[0];
		if (cookie.trim() == "fitLevel"){
			cookieValue = cookieList[i].split("=")[1];
			display(cookieValue);
			submit.textContent = "Update Fitness Level";
			return;
		}
	}
}


function setCookie(fitLevel){
	document.cookie = "fitLevel=" + fitLevel;
}


submit.addEventListener("click", function(){
	var height = document.getElementById("height").value;
	var weight = document.getElementById("lbs").value;
	if (height && weight != ''){
		event.preventDefault();
		var fitLevel = calcFit(height, weight);
		if (submit.textContent == "Update Fitness Level"){
			while(fitDisplay.firstChild){
				fitDisplay.removeChild(fitDisplay.firstChild);
			}
		}
		display(fitLevel);
		setCookie(fitLevel); 
		submit.textContent = "Update Fitness Level";
	}
	else{
		return;
	}
});


function calcFit(height, weight){
	var bmi = (weight / height / height) * 703;
	if (bmi >= 30){
		var level = "beginner";
	}
	else if (25 <= bmi){
		var level = "intermediate";
	}
	else{
		var level = "expert";
	}
	return level;
};


function display(fitLevel){
	fitLvlDisplay(fitLevel);
	fitLvlMeaningDisplay();
	lvlsExplainedDisplay();
	bmiCalcImgDisplay();
};


function fitLvlDisplay(fitLevel){
	var heading = document.createElement("H1");
	var htext = document.createTextNode("Your estimated current fitness level is " + fitLevel + "!");
	heading.appendChild(htext);
	fitDisplay.appendChild(heading);
}


function fitLvlMeaningDisplay(){
	var ptag = document.createElement("p");
	var fitTxt = document.createTextNode("This means that whenever you are trying to personalize your hike to your current fitness level, the app will best match you with your preferred difficulty when compared to your estimated fitness level. For example, if your fitness level is estimated to be beginner and you choose that you want to be challeneged during the hike, the app will then match you with nearby hiking trails that are more challenging than beginner trails.");
    var ptag2 = document.createElement("p");
	var bmiTxt = document.createTextNode("This is calcualted based off your Body Mass Index (BMI).")
	ptag.appendChild(fitTxt);
	ptag2.appendChild(bmiTxt);
	fitDisplay.appendChild(ptag);
	fitDisplay.appendChild(ptag2);
}


function lvlsExplainedDisplay(){
	var list = document.createElement("UL");
	var liBeg = document.createElement("LI"); 
	var liInt = document.createElement("LI"); 
	var liExp = document.createElement("LI");                 
	var liBegTxt = document.createTextNode("If your BMI is 30 or over, your estimated fitness level is beginner.");         
	var liIntTxt = document.createTextNode("If your BMI is 25 to 30, your estimated fitness level is intermediate.");
   	var liExpTxt = document.createTextNode("If your BMI is under 25, your estimated fitness level is expert.");
  	liBeg.appendChild(liBegTxt);     
	liInt.appendChild(liIntTxt); 
	liExp.appendChild(liExpTxt);                          
	list.appendChild(liBeg);
	list.appendChild(liInt);
	list.appendChild(liExp);
	fitDisplay.appendChild(list);
}


function bmiCalcImgDisplay(){
	var img = document.createElement("img");
    img.src = "./static/images/bmi.jpg";
    fitDisplay.appendChild(img);
}
