var ctx = document.getElementById("myBarChart");
var myBarChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['8月1日', '8月2日', '8月3日', '8月4日', '8月5日', '8月6日', '8月7日'],
    datasets: [
      {
        label: 'A店 来客数',
        data: [62, 65, 93, 85, 51, 66, 47],
        backgroundColor: "red",
        stack: 'stack-1',
      },{
        label: 'B店 来客数',
        data: [55, 45, 73, 75, 41, 45, 58],
        backgroundColor: "blue",
        stack: 'stack-1',
      },{
        label: 'C店 来客数',
        data: [33, 45, 62, 55, 31, 45, 38],
        backgroundColor: "green",
        stack: 'stack-1',
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'GRAPH'
    },
    scales: {
      yAxes: [{
        ticks: {
          suggestedMax: 250,
          suggestedMin: 0,
          stepSize: 10,
          callback: function(value, index, values){
            return  value +  '人'
          }
        }
      }]
    },
  }
});
