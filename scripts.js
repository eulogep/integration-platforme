// scripts.js – initialise les graphiques et ajoute des comportements interactifs

document.addEventListener('DOMContentLoaded', () => {
  // Diaspora vs nouveaux arrivants
  const ctxDiaspora = document.getElementById('diasporaChart');
  if (ctxDiaspora) {
    new Chart(ctxDiaspora, {
      type: 'bar',
      data: {
        labels: ['Diaspora établie', 'Nouveaux arrivants'],
        datasets: [{
          label: 'Nombre de personnes',
          data: [2100000, 400000],
          backgroundColor: ['#0f4c75', '#f59e0b'],
          borderColor: ['#0f4c75', '#f59e0b'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                // format large numbers with thousands separator
                return value.toLocaleString('fr-FR');
              }
            },
            title: {
              display: true,
              text: 'Population'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Segmentation'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const value = context.parsed.y;
                return context.dataset.label + ': ' + value.toLocaleString('fr-FR');
              }
            }
          }
        }
      }
    });
  }

  // Marché – répartition des segments
  const ctxMarket = document.getElementById('marketChart');
  if (ctxMarket) {
    new Chart(ctxMarket, {
      type: 'doughnut',
      data: {
        labels: ['Nouveaux arrivants', 'Diaspora établie', 'Étudiants', 'Professionnels en mobilité', 'Demandeurs d’asile'],
        datasets: [{
          label: 'Population estimée',
          data: [400000, 2100000, 50000, 30000, 20000],
          backgroundColor: ['#f59e0b', '#0f4c75', '#2c7a7b', '#d97706', '#3f51b5'],
          hoverOffset: 4
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 15,
              usePointStyle: true
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const value = context.parsed;
                return context.label + ': ' + value.toLocaleString('fr-FR');
              }
            }
          }
        }
      }
    });
  }
});