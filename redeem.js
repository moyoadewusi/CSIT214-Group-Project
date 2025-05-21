document.addEventListener('DOMContentLoaded', async () => {
  const redeemForm = document.getElementById('redeem-form');
  const redeemResult = document.getElementById('redeem-result');
  const pointsElement = document.getElementById('user-points');
  const nameElement = document.getElementById('user-name');
  const spinner = document.getElementById('loading-spinner');
  const undoButton = document.getElementById('undo');
  const pointsHistoryList = document.getElementById('points-history-list');
  let points = 0;
  let userName = '';
  let lastAction = null;

  // Function to sanitize inputs
  function sanitizeInput(input) {
      const div = document.createElement('div');
      div.textContent = input;
      return div.innerHTML;
  }

  // Simulate fetching user data from an API
  async function fetchUserData() {
      spinner.style.display = 'block';
      return new Promise((resolve) => {
          setTimeout(() => {
              resolve({
                  name: 'John Doe',
                  points: 1200,
                  rewards: [
                      { name: 'Coffee Mug', points: 200 },
                      { name: 'T-Shirt', points: 500 },
                      { name: 'Gift Voucher', points: 1000 }
                  ],
              });
              spinner.style.display = 'none';
          }, 500);
      });
  }

  // Simulate updating user points on an API
  async function updateUserPoints(newPoints) {
      spinner.style.display = 'block';
      return new Promise((resolve) => {
          setTimeout(() => {
              resolve(newPoints);
              spinner.style.display = 'none';
          }, 500);
      });
  }

  // Function to log a transaction in the points history
  function logPointsHistory(action, pointsChanged) {
      const date = new Date().toLocaleString();
      const listItem = document.createElement('li');
      listItem.textContent = `${date}: ${action} ${pointsChanged > 0 ? '+' : ''}${pointsChanged} points`;
      pointsHistoryList.appendChild(listItem);

      // Save the log entry to localStorage or a database
      const history = JSON.parse(localStorage.getItem('pointsHistory')) || [];
      history.push({ date, action, pointsChanged });
      localStorage.setItem('pointsHistory', JSON.stringify(history));
  }

  // Initialize user data
  const userData = await fetchUserData();
  points = userData.points;
  userName = userData.name;
  pointsElement.textContent = `Loyalty Points: ${points}`;
  nameElement.textContent = `Name: ${userName}`;

  // Load existing points history from localStorage
  const existingHistory = JSON.parse(localStorage.getItem('pointsHistory')) || [];
  existingHistory.forEach(entry => {
      const listItem = document.createElement('li');
      listItem.textContent = `${entry.date}: ${entry.action} ${entry.pointsChanged > 0 ? '+' : ''}${entry.pointsChanged} points`;
      pointsHistoryList.appendChild(listItem);
  });

  // Handle redemption form submission
  redeemForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const reward = sanitizeInput(document.getElementById('reward').value);
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
          lastAction = { points: points, reward: reward, pointsNeeded: pointsNeeded }; // Save last action for undo
          points -= pointsNeeded;
          points = await updateUserPoints(points); // Simulate saving to API
          pointsElement.textContent = `Loyalty Points: ${points}`;
          redeemResult.textContent = `You have successfully redeemed a ${reward.replace('-', ' ')}!`;
          localStorage.setItem('points', points); // Save updated points to localStorage
          logPointsHistory('Redeemed', -pointsNeeded); // Log the redemption
          undoButton.style.display = 'inline-block'; // Show undo button
      } else {
          redeemResult.textContent = `You don't have enough points to redeem this reward.`;
      }
  });

  // Handle undo action
  undoButton.addEventListener('click', async () => {
      if (lastAction) {
          points = lastAction.points;
          points = await updateUserPoints(points); // Simulate saving to API
          pointsElement.textContent = `Loyalty Points: ${points}`;
          redeemResult.textContent = `Redemption of ${lastAction.reward.replace('-', ' ')} has been undone.`;
          localStorage.setItem('points', points); // Restore points in localStorage
          logPointsHistory('Undo Redemption', lastAction.pointsNeeded); // Log the undo action
          lastAction = null;
          undoButton.style.display = 'none'; // Hide undo button
      }
  });
});