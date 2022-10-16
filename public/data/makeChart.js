const charts = {

}
export default function makeChart(date, data, eContext){
  const myChart = new Chart(eContext, {
      type: 'pie',
      data: {
        labels: ['type 1 source', 'type 2 source', 'type 3 source', 'type 4 source', 'type 5 source'],
        datasets: [
          {
            data: [300, 50, 100, 20, 30],
            backgroundColor: ['rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      }
    },
  });
  return myChart;
}
