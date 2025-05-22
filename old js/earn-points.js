document.addEventListener('DOMContentLoaded', () => {
    const earnPointsButton = document.getElementById('earn-points-button');
    const pointsElement = document.getElementById('user-points');
    let points = parseInt(localStorage.getItem('points')) || 0; // Get existing points (or initialize to 0)
  
    earnPointsButton.addEventListener('click', () => {
      const pointsEarned = 100; // Define the fixed amount of points earned per click
  
      points += pointsEarned;
      localStorage.setItem('points', points); // Update points in localStorage
      pointsElement.textContent = `Loyalty Points: ${points}`;
      logPointsHistory('Earned', pointsEarned); // Log the earned points
      updateUserLevel(points); // Update user level based on earned points
    });
  });