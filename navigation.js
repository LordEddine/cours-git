// Navigation system for slides
(function() {
  // Liste ordonnée de toutes les slides
  const SLIDES = [
    'slide01.html', 'slide02.html', 'slide03.html', 'slide04.html', 'slide05.html',
    'slide06.html', 'slide07.html', 'slide08.html', 'slide09.html', 'slide10.html',
    'slide11.html', 'slide12.html', 'slide13.html', 'slide14.html', 'slide14b.html',
    'slide15.html', 'slide16.html', 'slide17.html', 'slide18.html', 'slide19.html',
    'slide20.html', 'slide20a.html', 'slide20b.html', 'slide20c.html', 'slide20d.html',
    'slide20e.html', 'slide20f.html', 'slide20g.html', 'slide20h.html', 'slide20i.html',
    'slide21.html', 'slide22.html', 'slide23.html', 'slide24.html', 'slide25.html',
    'slide26.html', 'slide27.html', 'slide28.html', 'slide29.html', 'slide30.html',
    'slide31.html', 'slide32.html', 'slide33.html'
  ];
  
  const TOTAL_SLIDES = SLIDES.length;
  
  // Get current slide from filename
  const currentFile = window.location.pathname.split('/').pop();
  const currentIndex = SLIDES.indexOf(currentFile);
  const currentSlide = currentIndex !== -1 ? currentIndex + 1 : 1;
  
  // Calculate progress
  const progress = Math.round((currentSlide / TOTAL_SLIDES) * 100);
  
  // Get previous and next slide URLs
  const prevSlide = currentIndex > 0 ? SLIDES[currentIndex - 1] : null;
  const nextSlide = currentIndex < SLIDES.length - 1 ? SLIDES[currentIndex + 1] : null;
  
  // Create progress bar
  const progressBar = document.createElement('div');
  progressBar.className = 'nav-progress';
  progressBar.style.width = `${progress}%`;
  document.body.insertBefore(progressBar, document.body.firstChild);
  
  // Create navigation container
  const nav = document.createElement('nav');
  nav.className = 'nav-container';
  nav.innerHTML = `
    <a href="${prevSlide || '#'}" class="nav-btn ${!prevSlide ? 'disabled' : ''}" title="Précédent (←)">←</a>
    <a href="slide01.html" class="nav-btn nav-btn-home" title="Accueil (H)">⌂</a>
    <div class="nav-indicator">
      <span class="current">${currentSlide}</span>
      <span class="total">/ ${TOTAL_SLIDES}</span>
    </div>
    <a href="${nextSlide || '#'}" class="nav-btn ${!nextSlide ? 'disabled' : ''}" title="Suivant (→)">→</a>
  `;
  document.body.appendChild(nav);
  
  // Create keyboard hints
  const hints = document.createElement('div');
  hints.className = 'nav-hint';
  hints.innerHTML = `
    <span><kbd>←</kbd> Précédent</span>
    <span><kbd>→</kbd> Suivant</span>
    <span><kbd>H</kbd> Accueil</span>
  `;
  document.body.appendChild(hints);
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && prevSlide) {
      window.location.href = prevSlide;
    } else if (e.key === 'ArrowRight' && nextSlide) {
      window.location.href = nextSlide;
    } else if (e.key === 'h' || e.key === 'H') {
      window.location.href = 'slide01.html';
    } else if (e.key === 'Home') {
      window.location.href = 'slide01.html';
    } else if (e.key === 'End') {
      window.location.href = SLIDES[SLIDES.length - 1];
    }
  });
  
  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && nextSlide) {
        // Swipe left - next slide
        window.location.href = nextSlide;
      } else if (diff < 0 && prevSlide) {
        // Swipe right - previous slide
        window.location.href = prevSlide;
      }
    }
  }
})();
