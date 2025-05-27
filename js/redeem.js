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

// Flight & Seat Selection 

document.addEventListener('DOMContentLoaded', () => {
    const seatSelectionButton = document.getElementById('seat-selection-btn');
    const seatSelectionSection = document.getElementById('flight-selection-section');

    seatSelectionButton.addEventListener('click', () => {
        // Display the seat selection section
        seatSelectionSection.style.display = 'block';
        seatSelectionSection.scrollIntoView({ behavior: 'smooth' });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const selectFlightButtons = document.querySelectorAll('.select-flight-btn');
    const seatSelectionPage = document.getElementById('seat-selection-page');
    const flightSelectionSection = document.getElementById('flight-selection-section');

    selectFlightButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Hide the flight selection section
            flightSelectionSection.style.display = 'none';

            // Show the seat selection section
            seatSelectionPage.style.display = 'block';
            seatSelectionPage.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const confirmSeatBtn = document.querySelector('.confirm-seat-btn'); // The button in seat selection
    const confirmationModal = document.getElementById('confirmation-modal');
    const cancelBtn = document.getElementById('cancel-btn');
    const proceedBtn = document.getElementById('proceed-btn');

    // When the Confirm button is clicked, show the confirmation modal
    confirmSeatBtn.addEventListener('click', () => {
        confirmationModal.style.display = 'block';
    });

    // If the Cancel button is clicked, hide the modal
    cancelBtn.addEventListener('click', () => {
        confirmationModal.style.display = 'none';
    });

    // If the Proceed button is clicked, proceed with the transaction
    proceedBtn.addEventListener('click', () => {
        confirmationModal.style.display = 'none';
        // You can add logic here to handle point deduction or form submission
        alert('Points have been used!');
    });
});
