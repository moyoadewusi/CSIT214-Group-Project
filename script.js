document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul li a');
  const homeSection = document.querySelector('#home');

  // Default to showing the home section
  homeSection.style.display = 'block';

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetSection = document.querySelector(e.target.getAttribute('href'));

      // Hide all sections
      sections.forEach(section => {
        section.style.display = 'none';
      });

      // Show the target section
      targetSection.style.display = 'block';
    });
  });

  // Redeem Points functionality
  const redeemForm = document.getElementById('redeem-form');
  const redeemResult = document.getElementById('redeem-result');
  const pointsElement = document.querySelector('#profile p:last-of-type');
  let points = 1200; // Initial points

  redeemForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const reward = document.getElementById('reward').value;
    let pointsNeeded = 0;

    switch (reward) {
      case 'coffee-mug':
        pointsNeeded = 200;
        break;
      case 't-shirt':
        pointsNeeded = 500;
        break;
      case 'voucher':
        pointsNeeded = 1000;
        break;
    }

    if (points >= pointsNeeded) {
      points -= pointsNeeded;
      pointsElement.textContent = `Loyalty Points: ${points}`;
      redeemResult.textContent = `You have successfully redeemed a ${reward.replace('-', ' ')}!`;
    } else {
      redeemResult.textContent = `You don't have enough points to redeem this reward.`;
    }
  });
});
