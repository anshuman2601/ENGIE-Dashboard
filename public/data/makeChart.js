const charts = {}; //cache charts for each day
const defaultColors = ['rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(24, 102, 120, 1)',

                        'rgba(102, 142, 12, 1)',
                        'rgba(70, 10, 234, 1)'
                      ];


export default function makeChart(info, eContext){

  const myChart = new Chart(eContext, {
      type: 'pie',
      data: {
        labels: info.labels,
        datasets: [
          {
            data: info.data,
            backgroundColor: defaultColors.slice(0, info.labels.length),
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
