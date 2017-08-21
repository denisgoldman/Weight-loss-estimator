// Initialize your app
var myApp = new Framework7({
    panelLeftBreakpoint: 1024
});

// Export selectors engine
var $$ = Dom7;

// Add views
var leftView = myApp.addView('.view-left', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

//this works
$$(document).on('page:init', function (e) {
  var page = e.detail.page;

  if(page.name === 'about') {
    //myApp.alert("Here is about page");

    drawChart();

  }

  if(page.name === 'services') {
    myApp.alert("This is services page");
  }

});

function myAppTest() {
  alert("well shit");
}

function getMainView() {
  return mainView;
}

/*function clearCanvas() {
  $('#myChart').remove();
}*/

function drawChart() {

  $('#myChart').remove();
  $('#contentBlock').append('<canvas id="myChart" width="400" height="400"></canvas>');

  var chart = document.getElementById("myChart");
  var ctx = document.getElementById("myChart").getContext('2d');

  /*if (chart != null) {
    //ctx.clearRect(0,0,chart.width, chart.height);
    //myChart.destroy();
    console.log("chart exists, need to delete it");
    console.log(ctx);
  }

  if(myChart !== undefined) {
    //this shit is always undefined
    console.log("chart object exists");
    console.log(myChart);
  } else {
    console.log("chart object doesn't exist");
  }*/

  //Chart.defaults.global.defaultFontColor = 'red';
  Chart.defaults.global.defaultFontSize = 16;
  Chart.defaults.global.animation.duration = '1000';
  Chart.defaults.global.animation.easing = 'easeOutSine';

  //var ctx = document.getElementById("myChart").getContext('2d');


  //ctx.height = 50;
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          //labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          labels: getLabels(),
          datasets: [{
              label: 'Weight',
              //data: [12, 19, 3, 5, 2, 3],
              data: getData(),
              backgroundColor: [
                  'rgba(255, 59, 48, 0.2)'
              ],
              borderColor: [
                  'rgba(255,59,48,1)'
              ],
              borderWidth: 3,
              pointRadius: 0,
              pointHitRadius: 20,
              cubicInterpolationMode: 'default'
          }]
      },
      options: {
          //maintainAspectRatio: true, //this will make the graph use assigned size
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:false
                  }
              }]
          },
          legend: {
            display: false
          },
          tooltips: {
            enabled: true,
            backgroundColor: 'rgba(255,255,255,1)',
            titleFontColor: '#000',
            titleFontSize: 16,
            bodyFontColor: '#000',
            bodyFontSize: 16,
            displayColors: false,
            borderColor: '#000',
            borderWidth: 1
          }
      }
  });
}
