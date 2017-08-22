
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

  var t0 = performance.now();

  checkPassed = true; //otherwise value will be permanently stuck in false if one of the checks failed

  //showStartingData();
  readInputValues();
  checkValues();
  checkIntake();

  //this doesn't work for some reason
  if(checkPassed) {
    myApp.showPreloader();
    calculateWeightLoss();
  }

  var t1 = performance.now();
  console.log("Calculation took: " + (t1-t0).toFixed(3) + " ms");
}

//Adds specified number of days to current date
function addDays(days) {
  date.setDate(date.getDate() + days);
}

/*function showStartingData() {
  console.log("*STARTING PARAMETERS*");
  console.log("TDEE is: " + calculateTDEE());
  console.log("Current BMI is: " + calculateBMI().toFixed(1));
  console.log("Goal weight is probably: " + calculateGoalWeight());
  console.log("Actual activity level: " + activityLevel);
  console.log("--------------------------");
}*/

function readInputValues() {

  //assign all text input fields to variables
  //console.log("read input values executed");
  weight = parseFloat(document.getElementById("currentWeightInput").value);
  age = parseFloat(document.getElementById("ageInput").value);
  height = parseFloat(document.getElementById("heightInput").value);
  calorieIntake = parseFloat(document.getElementById("calorieIntakeInput").value);
  goalWeight = parseFloat(document.getElementById("goalWeightInput").value);
  //console.log("Weight: " + weight);

  //get selected gender
  var genderSelector = document.getElementById("genderSelect");
  //console.log("Selected gender: " + genderSelector.options[genderSelector.selectedIndex].value);

  if (genderSelector.options[genderSelector.selectedIndex].value == "Female") {
    female = true;
  } else {
    female = false;
  }

  //get activity level
  activityLevel = parseInt(getActivityLevel());
  //console.log("New activity level is: " + activityLevel);

  //alert("Weight: " + weight + " Age: " + age + " Height: " + height + " Calorie intake: " + calorieIntake + " Goal weight: " + goalWeight);
}

//checks input and throws errors in case some values are inadequate
function checkValues() {
  if (weight < 40 || weight > 600) {
    myApp.alert("Weight must be between 40 and 600.", "Oops!");
    checkPassed = false;
  }

  if (weight == null || weight == "" || isNaN(weight)) {
    myApp.alert("Weight input cannot be empty!", "Oops!");
    checkPassed = false;
  }

  if (age == null || age == "" || isNaN(age)) {
    myApp.alert("Age input cannot be empty!", "Oops!");
    checkPassed = false;
  }

  if (age < 10 || age > 110) {
    myApp.alert("Age must be between 10 and 110.", "Oops!");
    checkPassed = false;
  }

  if (height == null || height == "" || isNaN(height)) {
    myApp.alert("Height cannot be empty.", "Oops!");
    checkPassed = false;
  }

  if (height < 100 || height > 250) {
    myApp.alert("Height must be between 100 and 250.", "Oops!");
    checkPassed = false;
  }

  if (goalWeight > weight) {
    myApp.alert("Goal weight must be lower than current weight.", "Oops!");
    checkPassed = false;
  }

  //there needs to be a functionality that calculates goal weight based on BMI if field is left empty
  if (goalWeight == null || goalWeight == "" || isNaN(goalWeight)) {
    myApp.alert("Goal weight cannot be empty.", "Oops!");
    checkPassed = false;
  }

  if (goalWeight < 30 || goalWeight > 500) {
    myApp.alert("Goal weight must be between 30 and 500.", "Oops!");
    checkPassed = false;
  }

  if (calorieIntake < 1000) {
    myApp.alert("Calorie intake of less than 1000 is very unhealthy, please don't do it.", "Oops!");
    checkPassed = false;
  }

  if (calorieIntake > 15000) {
    myApp.alert("Calorie intake can't be higher than 15000.", "Oops!");
    checkPassed = false;
  }

  if (calorieIntake == null || calorieIntake == "" || isNaN(calorieIntake)) {
    myApp.alert("Calorie intake can't be empty!", "Oops!");
    checkPassed = false;
  }

}

function checkIntake() {
  if (calculateTDEE() < calorieIntake) {
    myApp.alert("You calorie intake is too high to lose weight. Reduce intake or increase excersise.", "Oops!");
    checkPassed = false;
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
    //console.log("tdee entered loop as female");
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
    //console.log("TDEE is: " + calculateTDEE());
		//console.log("Current age: " + age);
    //console.log("Activity: " + activityLevel);
		//console.log("Day " + days + ": Current weight is: " + weight);
    //console.log("The date is: " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());
    //console.log("---------------------")
    labels.push(parseMonth(date.getMonth()) + " " + date.getFullYear());
    data.push(weight.toFixed(1));
  }

  if (calculateTDEE() <= calorieIntake) {
				//console.log("Your TDEE is now less than calorie intake, this is the lowest weight you can achieve.");
				//console.log("Weight: " +  weight);
        myApp.alert("You can't reach your goal weight with given calorie intake and level of activity. The lowest weight you can achieve is: " + weight.toFixed(1), "Oops!");
        weight = 0; //this seems to stop the while loop

				//break; //this needs to be here!!
			}

    }

    //this works
    getMainView().router.loadPage('about.html');

    //console.log(getMainView().activePage.name);

    //draw chart even if we aren't on the index page
    if (getMainView().activePage.name != "index-1") {
      drawChart();
    }

    //drawChart(); //this throws an error on the first time because canvas doesn't exist


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
