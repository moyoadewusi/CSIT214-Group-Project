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

        // Retrieve existing history from localStorage, or create a new array
        const history = JSON.parse(localStorage.getItem('pointsHistory')) || [];
        history.push({ date, action, pointsChanged });
        localStorage.setItem('pointsHistory', JSON.stringify(history));
    }

    // Function to handle redeeming points
    function redeemFlight(pointsNeeded, flightName) {
        if (points >= pointsNeeded) {
            points -= pointsNeeded; // Deduct the points
            localStorage.setItem('points', points); // Update the points in localStorage
            pointsElement.textContent = `Loyalty Points: ${points}`; // Update points display
            logPointsHistory(`Redeemed for ${flightName}`, -pointsNeeded); // Log redemption
            alert(`You have successfully redeemed for ${flightName}!`);
        } else {
            alert('Not enough points to redeem for this flight.');
        }
    }

    // Attach event listeners for redeem buttons
    document.getElementById('redeem-sydney-hanoi').addEventListener('click', (e) => {
        e.preventDefault();
        redeemFlight(15000, 'Sydney to Hanoi Flight');
    });

    document.getElementById('redeem-paris-rome').addEventListener('click', (e) => {
        e.preventDefault();
        redeemFlight(20000, 'Paris to Rome Flight');
    });

    document.getElementById('redeem-beijing-tokyo').addEventListener('click', (e) => {
        e.preventDefault();
        redeemFlight(12000, 'Beijing to Tokyo Flight');
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
