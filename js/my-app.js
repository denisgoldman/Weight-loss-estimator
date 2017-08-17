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

    var testData = [20,15,5,10,11,8];

    //Chart.defaults.global.defaultFontColor = 'red';
    Chart.defaults.global.defaultFontSize = 16;
    Chart.defaults.global.animation.duration = '1000';
    Chart.defaults.global.animation.easing = 'easeOutSine';

    var ctx = document.getElementById("myChart").getContext('2d');
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
