document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display user points on all pages
    const pointsElement = document.getElementById('user-points');
    let points = parseInt(localStorage.getItem('points')) || 0;
    if (pointsElement) {
        pointsElement.textContent = `Loyalty Points: ${points}`;
    }
    
    // Toggle mobile navigation
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            document.body.classList.toggle('nav-open');
        });
    }
});
