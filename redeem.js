document.addEventListener('DOMContentLoaded', () => {
    const redeemForm = document.getElementById('redeem-form');
    const redeemResult = document.getElementById('redeem-result');
    const pointsElement = document.getElementById('user-points');
    const nameElement = document.getElementById('user-name');
  
    let points = parseInt(localStorage.getItem('points')) || 1200; // Load from localStorage or set default
    let userName = localStorage.getItem('name') || 'John Doe';
  
    pointsElement.textContent = `Loyalty Points: ${points}`;
    nameElement.textContent = `Name: ${userName}`;
  
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
        localStorage.setItem('points', points); // Save updated points to localStorage
      } else {
        redeemResult.textContent = `You don't have enough points to redeem this reward.`;
      }
    });
  });
  