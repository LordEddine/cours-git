// Navigation system for slides
(function() {
  const TOTAL_SLIDES = 33;
  
  // Get current slide number from filename
  const currentFile = window.location.pathname.split('/').pop();
  const match = currentFile.match(/slide(\d+)\.html/);
  const currentSlide = match ? parseInt(match[1]) : 1;
  
  // Calculate progress
  const progress = Math.round((currentSlide / TOTAL_SLIDES) * 100);
  
  // Format slide number with leading zero
  const formatSlide = (num) => num.toString().padStart(2, '0');
  
  // Get previous and next slide URLs
  const prevSlide = currentSlide > 1 ? `slide${formatSlide(currentSlide - 1)}.html` : null;
  const nextSlide = currentSlide < TOTAL_SLIDES ? `slide${formatSlide(currentSlide + 1)}.html` : null;
  
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
      window.location.href = `slide${formatSlide(TOTAL_SLIDES)}.html`;
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
