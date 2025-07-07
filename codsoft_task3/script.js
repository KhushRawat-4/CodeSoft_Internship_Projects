document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('current-year').textContent = new Date().getFullYear();

  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const mobileNav = document.querySelector('.mobile-nav');

  menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    menuToggle.textContent = mobileNav.classList.contains('active') ? '✖' : '☰';
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      menuToggle.textContent = '☰';
    });
  });

  const typingText = document.querySelector('.typing-text');
  const original = typingText.textContent;
  typingText.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    typingText.textContent += original[i];
    i++;
    if (i === original.length) clearInterval(interval);
  }, 100);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('fade-in');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach(section => observer.observe(section));

  try {
    TagCanvas.Start('tagcanvas', 'taglist', {
      textColour: '#333',
      outlineColour: 'transparent',
      reverse: true,
      depth: 0.8,
      maxSpeed: 0.05,
      initial: [0.1, -0.1],
      wheelZoom: false, // Disable zoom on scroll
      freezeActive: true,
      freezeDecel: true,
      noSelect: true,
      lock: 'xy' // Lock movement to x and y axes only
    });
  } catch (e) {
    document.getElementById('tagcanvas').style.display = 'none';
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});v