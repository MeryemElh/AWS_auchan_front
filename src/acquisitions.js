import Chart from 'chart.js/auto'

(async function() {
  const backend_host = "http://auchan-web-tier-lb-1462683266.eu-west-3.elb.amazonaws.com:8000/"

  var chart1_data = []
  fetch(backend_host+"getChart1Data")
  .then((response) => response.json())
  .then((json) => {
    createChart1(json);
  });

 function createChart1(json){
  chart1_data = json;
  var bar_ctx = document.getElementById('chart1').getContext('2d');
  var background_1 = bar_ctx.createLinearGradient(0, 0, 0, 600);
  background_1.addColorStop(0, '#37D5D6');
  background_1.addColorStop(1, '#36096D');
  new Chart(
    document.getElementById('chart1'),
    {
      type: 'bar',
      data: {
        labels: chart1_data.map(row => row.brand),
        datasets: [
          {
            label: 'Brands',
            backgroundColor: background_1,
            data: chart1_data.map(row => row.count),
          }
        ]
      }
    }
  );
 }

 var chart2_data = []
 fetch(backend_host+"getChart2Data")
 .then((response) => response.json())
 .then((json) => {
    createChart2(json)
 });

 function createChart2(json){
  chart2_data = json;
  new Chart(
    document.getElementById('chart2'),
    {
      type: 'pie',
      data: {
        labels: chart2_data.map(row => row.category),
        datasets: [{
          data: chart2_data.map(row => row.count),
          backgroundColor: [
            '#2a52be',
            '#4372AA',
            '#0a2351',
            '#00CED1',
            '#73C2FB',
            '#008ECC'
          ],
          hoverOffset: 4
        }]
      }
    }
  );
 }
  
 var chart3_data = []
 fetch(backend_host+"getChart3Data")
 .then((response) => response.json())
 .then((json) => {
    chart3_data = json;
    createChart3(json)
 });

 function getvalues(cat){
  var tab =[]
  tab.push(cat.nbr_prod);
  tab.push(cat.max*10);
  tab.push(cat.min*100);
  tab.push(cat.mean*100);
  tab.push(cat.nbr_avail);
  tab.push(cat.mean_rating*100);
  return tab
 }
 function createChart3(json){
  chart3_data = json;
  var keys = Object.keys(chart3_data)
  new Chart(
    document.getElementById('chart3'),
    {
      type: 'radar',
      options: {
        elements: {
          line: {
            borderWidth: 3
          }
        }
      },
      data: {
        labels: [
          'nbr of products',
          'max price',
          'min price',
          'mean price',
          'nbr of available products',
          'rating'
        ],
        datasets: [{
          label: keys[0],
          data: getvalues(chart3_data[keys[0]]),
          fill: true,
          backgroundColor: 'rgba(55, 213, 214, 0.2)',
          borderColor: '#37D5D6',
          pointBackgroundColor: '#37D5D6',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#37D5D6'
        },{
          label: keys[1],
          data: getvalues(chart3_data[keys[1]]),
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
      }
    }
  );
 }

 var chart4_data = []
 fetch(backend_host+"getChart4Data")
 .then((response) => response.json())
 .then((json) => {
    createChart4(json)
 });

 function createChart4(json){
  chart4_data = json;
  new Chart(
    document.getElementById('chart4'),
    {
      type: 'polarArea',
      data: {
        labels: chart4_data.map(row => row.category),
        datasets: [{
          data: chart4_data.map(row => row.price),
          backgroundColor: [
            '#0a2351',
            '#2a52be',
            '#00CED1',
            '#0076CE',
            '#73C2FB',
            '#008ECC'
          ]
        }]
      
      }
    }
  );
 }

 var nbr = "";
fetch(backend_host+"getNumber1")
 .then((response) => response.text())
 .then((text) => {
  number1 = document.getElementById("number1");
  number1.innerHTML = text;
 });


 var nbr_avail = "";
 fetch(backend_host+"getNumber2")
 .then((response) => response.text())
 .then((text) => {
  number2 = document.getElementById("number2");
  number2.innerHTML = text;
 } );


 var av_price = "";
 fetch(backend_host+"getNumber3")
 .then((response) => response.text())
 .then((text) => {
  text = text.substring(0,6);
  number3 = document.getElementById("number3");
  number3.innerHTML = text;
 } );


})();
