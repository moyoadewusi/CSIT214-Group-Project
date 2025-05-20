document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
  
    // Default to showing the home section on load
    const homeSection = document.querySelector('#home');
    homeSection.classList.add('show');
  
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get the target section based on the href attribute
        const targetSection = document.querySelector(e.target.getAttribute('href'));
  
        // Hide all sections
        sections.forEach(section => {
          section.classList.remove('show');
        });
  
        // Show the target section
        targetSection.classList.add('show');
      });
    });
  });
  