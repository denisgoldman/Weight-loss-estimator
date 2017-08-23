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
    drawChart();
  }

  if(page.name === 'services') {
  }

});

function getMainView() {
  return mainView;
}

function drawChart() {

  //remove canvas before drawing the chart
  $('#myChart').remove();

  //append new canvas to parent
  $('#contentBlock').append('<canvas id="myChart" width="400" height="385"></canvas>');

  var chart = document.getElementById("myChart");
  var ctx = document.getElementById("myChart").getContext('2d');

  //Global chart settings
  Chart.defaults.global.defaultFontSize = 16;
  Chart.defaults.global.animation.duration = '1000';
  Chart.defaults.global.animation.easing = 'easeOutSine';

  //chart.height = 700; //works
  chart.height = $(window).height() - $('#navbar').height() - 50;

  //create chart with parameters
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: getLabels(),
          datasets: [{
              label: 'Weight',
              data: getData(),
              backgroundColor:'rgba(156, 39, 176, 0.2)',
              borderColor: 'rgba(156,39,176,1)',
              borderWidth: 3,
              pointRadius: 0,
              pointHitRadius: 20,
              cubicInterpolationMode: 'default'
          }]
      },
      options: {
          maintainAspectRatio: false, //this will make the graph use assigned size
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
          },
          annotation: {
            annotations: [{
              //drawTime: "afterDatasetsDraw",
              id: "hline",
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: goalWeight,
              borderColor: "black",
              borderWidth: 1,
              borderDash: [2, 2],
            label: {
              backgroundColor: "white",
              content: "Goal Weight",
              enabled: true,
              fontColor: "black"
              }

          }]
        }
      }
  });

  myApp.hidePreloader();

}
