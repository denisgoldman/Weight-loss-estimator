
var weight = 128;
var age = 26;
var height = 182;
var days = 0;
var calorieIntake = 2000;
var goalWeight = 90;
var activityLevel = 2;
var female = false;
var date = new Date();
var checkPassed = true;
var labels = []; //this needs to be cleared before filling again
var data = []; //this needs to be cleared before filling again

//clicking the button calls this
function calculate() {
  showStartingData();
  readInputValues();
  //checkValues();
  //calculateWeightLoss();

  //this doesn't work for some reason
  if(checkPassed) {
    calculateWeightLoss();
  }

  console.log("Labels array: " + labels);
  console.log("Data array: " + data);

  if (typeof Chart != "undefined") {
    //console.log("chart exists");
    //ctx.clearRect(0,0,canvas.width, canvas.height);
  }

  //old chart needs to be destroyed!
  /*if (document.getElementById("myChart") !== null) {
    drawChart();
  }*/

  //check if chart already exists, if not, don't call this
  if (typeof Chart != "undefined") {
  }



  if (typeof Chart == "undefined") {
    console.log("chart doesn't exist");
  }




}

//Adds specified number of days to current date
function addDays(days) {
  date.setDate(date.getDate() + days);
}

function showStartingData() {
  console.log("*STARTING PARAMETERS*");
  console.log("TDEE is: " + calculateTDEE());
  console.log("Current BMI is: " + calculateBMI().toFixed(1));
  console.log("Goal weight is probably: " + calculateGoalWeight());
  console.log("Actual activity level: " + activityLevel);
  console.log("--------------------------");
}

function readInputValues() {
  console.log("read input values executed");
  weight = parseFloat(document.getElementById("currentWeightInput").value);
  age = parseFloat(document.getElementById("ageInput").value);
  height = parseFloat(document.getElementById("heightInput").value);
  calorieIntake = parseFloat(document.getElementById("calorieIntakeInput").value);
  goalWeight = parseFloat(document.getElementById("goalWeightInput").value);

  var genderSelector = document.getElementById("genderSelect");
  console.log("Selected gender: " + genderSelector.options[genderSelector.selectedIndex].value);

  //this works
  if (genderSelector.options[genderSelector.selectedIndex].value == "Female") {
    female = true;
  } else {
    female = false;
  }

  activityLevel = parseInt(getActivityLevel());
  console.log("New activity level is: " + activityLevel);

  //alert("Weight: " + weight + " Age: " + age + " Height: " + height + " Calorie intake: " + calorieIntake + " Goal weight: " + goalWeight);
}

function checkValues() {
  if (weight <= 0) {
    myApp.alert("Weight cannot be negative or zero.", "Oops!");
    checkPassed = false;
  }

  if (weight >= 1000) {
    myApp.alert("You are not THAT big, are you?", "Oops!");
  }

  if (weight == null || weight == "") {
    myApp.alert("Weight input cannot be empty!", "Oops!");
  }

}

function getActivityLevel() {
  var radios = document.getElementsByName("my-radio");

  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
      break;
    }
  }

}

function calculateTDEE() {

  var bmr;

  if(female) {
    bmr = (10*weight) + (6.25*height) - (5*age) - 161;
    console.log("tdee entered loop as female");
  } else {
    bmr = (10*weight) + (6.25*height) - (5*age) + 5; //<-- this happens way too many times, optimize
    //console.log("tdee entered loop as male");
  }

  var tdee = 0;

  switch (activityLevel) {
    case 1: tdee = parseInt(bmr*1.20);
    break;

    case 2: tdee = parseInt(bmr*1.375);
    break;

    case 3: tdee = parseInt(bmr*1.550);
    break;

    case 4: tdee = parseInt(bmr*1.725);
    break;

    case 5: tdee = parseInt(bmr*1.900);
    break;

    default: tdee = parseInt(bmr*1.20);
    break;

  }

  return tdee;

}

//this works correctly
function calculateBMI() {
  return (weight/(height ** 2))*10000;
}

function calculateGoalWeight() {
  return (height ** 2)*23/10000;
}

function calculateWeightLoss() {

  labels = [];
  data = [];

  date = new Date();

  //these do 2 times a month
  /*labels.push(date.getDate() + "/" + parseMonth(date.getMonth()) + "/" + date.getFullYear());
  data.push(weight.toFixed(1));*/

  //these do 1 time per month
  labels.push(parseMonth(date.getMonth()) + " " + date.getFullYear());
  data.push(weight.toFixed(1));

while(parseFloat(weight) >= parseFloat(goalWeight-3)) {

  var deficit = calculateTDEE() - calorieIntake;
  var kgDeficit = deficit/7700;
  weight = weight - kgDeficit;
  addDays(1);
  age = age + 1/365;

  //this does two times a month
  /*if(date.getDate() == 1 || date.getDate() == 14) {
    console.log("TDEE is: " + calculateTDEE());
		console.log("Current age: " + age);
		console.log("Day " + days + ": Current weight is: " + weight);
    console.log("The date is: " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());
    console.log("---------------------")
    labels.push(date.getDate() + "/" + parseMonth(date.getMonth()) + "/" + date.getFullYear());
    data.push(weight.toFixed(1));
  }*/

  if(date.getDate() == 14) {
    console.log("TDEE is: " + calculateTDEE());
		console.log("Current age: " + age);
    console.log("Activity: " + activityLevel);
		console.log("Day " + days + ": Current weight is: " + weight);
    console.log("The date is: " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());
    console.log("---------------------")
    labels.push(parseMonth(date.getMonth()) + " " + date.getFullYear());
    data.push(weight.toFixed(1));
  }

  if (calculateTDEE() <= calorieIntake) {
				console.log("Your TDEE is now less than calorie intake, this is the lowest weight you can achieve.");
				console.log("Weight: " +  weight);
        weight = 0; //this seems to stop the while loop
				//break; //this needs to be here!!
			}

    }

    //this works
    getMainView().router.loadPage('about.html');

    drawChart(); //this throws an error on the first time because canvas doesn't exist
}

function getLabels() {
  return labels;
}

function getData() {
  return data;
}

function parseMonth(month) {
  switch (month) {
    case 0: return "Jan";
    break;

    case 1: return "Feb";
    break;

    case 2: return "Mar";
    break;

    case 3: return "Apr";
    break;

    case 4: return "May";
    break;

    case 5: return "Jun";
    break;

    case 6: return "Jul";
    break;

    case 7: return "Aug";
    break;

    case 8: return "Sep";
    break;

    case 9: return "Oct";
    break;

    case 10: return "Nov";
    break;

    case 11: return "Dec";
    break;

    default: return "N/A";
    break;

  }
}
