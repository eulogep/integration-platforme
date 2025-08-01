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

  // Preloader handling – hide once all resources are loaded
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      // use a slight delay for a smoother fade-out
      preloader.style.transition = 'opacity 0.5s ease';
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    });
  }

  // Scroll progress bar – update width based on scroll position
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    });
  }

  // Typewriter effect for hero headline
  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl) {
    const words = [
      "Facilitons l'intégration des Africains en Europe",
      "Connectons les cultures et les talents",
      "Accompagnons votre réussite"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    const type = () => {
      const currentWord = words[wordIndex];
      if (!deleting) {
        typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentWord.length) {
          deleting = true;
          setTimeout(type, 2000);
          return;
        }
      } else {
        typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }
      setTimeout(type, deleting ? 50 : 150);
    };
    type();
  }

  // 3D tilt effect on cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = -((y - centerY) / 10);
      const rotateY = ((x - centerX) / 10);
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  });

  // Testimonials slider
  const testimonials = [
    {
      text: "Grâce à DiasporaLink, j'ai trouvé un mentor qui m'a guidé pour mes démarches et aujourd'hui je me sens chez moi.",
      author: "Aïcha, 27 ans"
    },
    {
      text: "La communauté est très réactive et m'a aidé à trouver un logement rapidement.",
      author: "Yann, 32 ans"
    },
    {
      text: "Les guides sont précis et m'ont permis de comprendre le système administratif français.",
      author: "Grace, 24 ans"
    }
  ];
  let testimonialIndex = 0;
  const testimonialText = document.getElementById('testimonial-text');
  const testimonialAuthor = document.getElementById('testimonial-author');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  const showTestimonial = index => {
    if (testimonialText && testimonialAuthor) {
      testimonialText.textContent = testimonials[index].text;
      testimonialAuthor.textContent = testimonials[index].author;
    }
  };
  if (testimonialText && prevBtn && nextBtn) {
    showTestimonial(testimonialIndex);
    prevBtn.addEventListener('click', () => {
      testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
      showTestimonial(testimonialIndex);
    });
    nextBtn.addEventListener('click', () => {
      testimonialIndex = (testimonialIndex + 1) % testimonials.length;
      showTestimonial(testimonialIndex);
    });
    setInterval(() => {
      testimonialIndex = (testimonialIndex + 1) % testimonials.length;
      showTestimonial(testimonialIndex);
    }, 7000);
  }
});