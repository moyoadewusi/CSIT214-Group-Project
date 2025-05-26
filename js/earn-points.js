document.addEventListener('DOMContentLoaded', () => {
  const pointsHistoryList = document.getElementById('points-history-list');
  console.log(pointsHistoryList);  // Should not be null
  const pointsElement = document.getElementById('user-points');
  let points = parseInt(localStorage.getItem('points')) || 0;

  function logPointsHistory(action, pointsChanged) {
      const date = new Date().toLocaleString();
      const listItem = document.createElement('li');
      listItem.textContent = `${date}: ${action} ${pointsChanged > 0 ? '+' : ''}${pointsChanged} points`;
      document.getElementById('points-history-list').appendChild(listItem);

      const history = JSON.parse(localStorage.getItem('pointsHistory')) || [];
      history.push({ date, action, pointsChanged });
      localStorage.setItem('pointsHistory', JSON.stringify(history));
  }

  // Handle earning points for Economy
  document.getElementById('earn-economy').addEventListener('click', (e) => {
      e.preventDefault();
      const pointsEarned = 300;
      points += pointsEarned;
      localStorage.setItem('points', points);
      pointsElement.textContent = `Loyalty Points: ${points}`;
      logPointsHistory('Earned from Economy Flight', pointsEarned);
  });

  // Handle earning points for Premium Economy
  document.getElementById('earn-premium-economy').addEventListener('click', (e) => {
      e.preventDefault();
      const pointsEarned = 500;
      points += pointsEarned;
      localStorage.setItem('points', points);
      pointsElement.textContent = `Loyalty Points: ${points}`;
      logPointsHistory('Earned from Premium Economy Flight', pointsEarned);
  });

  // Handle earning points for Business
  document.getElementById('earn-business').addEventListener('click', (e) => {
      e.preventDefault();
      const pointsEarned = 800;
      points += pointsEarned;
      localStorage.setItem('points', points);
      pointsElement.textContent = `Loyalty Points: ${points}`;
      logPointsHistory('Earned from Business Flight', pointsEarned);
  });

  // Load existing points history from localStorage on page load
  const existingHistory = JSON.parse(localStorage.getItem('pointsHistory')) || [];
  // const pointsHistoryList = document.getElementById('points-history-list');
  existingHistory.reverse().forEach(entry => {
      const listItem = document.createElement('li');
      listItem.textContent = `${entry.date}: ${entry.action} ${entry.pointsChanged > 0 ? '+' : ''}${entry.pointsChanged} points`;
      pointsHistoryList.appendChild(listItem);
  });

  // Display the current points balance on page load
  pointsElement.textContent = `Loyalty Points: ${points}`;
});
