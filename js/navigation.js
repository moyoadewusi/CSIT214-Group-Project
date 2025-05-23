export function showSection() {
  function showSection(targetSection) {
  // Hide all sections and mark them as hidden for accessibility
  sections.forEach(section => {
      section.classList.remove('show');
      section.setAttribute('aria-hidden', 'true');
      section.style.opacity = 0; // Start fade out
  });

  // Delay to allow fade out, then show the target section
  setTimeout(() => {
      sections.forEach(section => section.classList.remove('show')); // Ensure all are hidden
      targetSection.classList.add('show');
      targetSection.setAttribute('aria-hidden', 'false');
      targetSection.style.opacity = 1; // Start fade in

      // Set focus on the first focusable element for accessibility
      const focusableElement = targetSection.querySelector('h1, h2, a, button, input');
      if (focusableElement) focusableElement.focus();
  }, 300); // Adjust delay to match the CSS transition duration
}}

export function setActiveLink() {
  function setActiveLink(clickedLink) {
    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to the clicked link
    clickedLink.classList.add('active');
}
}

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul li a');

  
  function showSection(targetSection) {
      // Hide all sections and mark them as hidden for accessibility
      sections.forEach(section => {
          section.classList.remove('show');
          section.setAttribute('aria-hidden', 'true');
          section.style.opacity = 0; // Start fade out
      });

      // Delay to allow fade out, then show the target section
      setTimeout(() => {
          sections.forEach(section => section.classList.remove('show')); // Ensure all are hidden
          targetSection.classList.add('show');
          targetSection.setAttribute('aria-hidden', 'false');
          targetSection.style.opacity = 1; // Start fade in

          // Set focus on the first focusable element for accessibility
          const focusableElement = targetSection.querySelector('h1, h2, a, button, input');
          if (focusableElement) focusableElement.focus();
      }, 300); // Adjust delay to match the CSS transition duration
  }

  function setActiveLink(clickedLink) {
      // Remove active class from all links
      navLinks.forEach(link => {
          link.classList.remove('active');
      });

      // Add active class to the clicked link
      clickedLink.classList.add('active');
  }

  function handleNavClick(e) {
      e.preventDefault();
      const targetSection = document.querySelector(e.target.getAttribute('href'));

      if (targetSection) {
          showSection(targetSection);
          setActiveLink(e.target);
      } else {
          console.error('Target section not found:', e.target.getAttribute('href'));
      }
  }

  // Attach click event listeners to navigation links
  navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
  });

   // Check if a token exists on page load
   const token = localStorage.getItem('token');
   if (token) {
       // Redirect to profile page if logged in
       showSection(document.getElementById('profile'));
       setActiveLink(document.querySelector('nav ul li a[href="#profile"]'));
   } else {
       // Show login section by default
       showSection(document.getElementById('login'));
   }

// Handle logout button
const logoutButton = document.getElementById('logout');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');   


        // Show login section after logout
        showSection(document.getElementById('login'));
    });
}
});