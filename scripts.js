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
          backgroundColor: ['#264653', '#e76f51'],
          borderColor: ['#264653', '#e76f51'],
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
          // Use palette colours for the doughnut segments
          backgroundColor: ['#e76f51', '#264653', '#2a9d8f', '#e9c46a', '#f4a261'],
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

  // Hero background slider – cycle through a set of images
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    const heroImages = [
      'images/africa_europe_background.png',
      'images/africa_europe_connection.png',
      'images/mentorship.png'
    ];
    let heroIndex = 0;
    setInterval(() => {
      heroIndex = (heroIndex + 1) % heroImages.length;
      heroSection.style.backgroundImage = `url('${heroImages[heroIndex]}')`;
    }, 8000);
  }

  // Intersection Observer to reveal sections on scroll
  const revealSections = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('hidden');
        entry.target.classList.add('show');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealSections.forEach(section => {
    // initially hide all reveal sections
    section.classList.add('hidden');
    observer.observe(section);
  });
});