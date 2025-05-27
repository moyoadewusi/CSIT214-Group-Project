document.addEventListener('DOMContentLoaded', () => {
    const deleteAccountButton = document.getElementById('delete-account');
    const pointsElement = document.getElementById('user-points');
    const lifetimePointsElement = document.getElementById('user-lifetime-balance');
    const pointsHistoryList = document.getElementById('points-history-list');

    // Get the current points and lifetime points from localStorage
    let points = parseInt(localStorage.getItem('points')) || 0;
    let lifetimePoints = parseInt(localStorage.getItem('lifetimePoints')) || 0;

    // Display the current points and lifetime points
    pointsElement.textContent = `Loyalty Points: ${points} pts`;
    lifetimePointsElement.textContent = `Lifetime Earning: ${lifetimePoints} pts`;

    // Delete account function
    deleteAccountButton.addEventListener('click', (e) => {
        e.preventDefault();

        // Confirm deletion
        const confirmDelete = confirm("Are you sure you want to delete your account? This action cannot be undone.");

        if (confirmDelete) {
            // Clear local storage
            localStorage.clear();

            // Reset the points display and points history
            pointsElement.textContent = '0 pts';
            lifetimePointsElement.textContent = 'Lifetime Earning: 0 pts';
            pointsHistoryList.innerHTML = '';

            // Optional: Provide feedback to the user
            alert("Your account has been deleted and all data has been reset.");
        }
    });

    // Reload existing history from localStorage (if any)
    const existingHistory = JSON.parse(localStorage.getItem('pointsHistory')) || [];
    existingHistory.reverse().forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.date}: ${entry.action} ${entry.pointsChanged > 0 ? '+' : ''}${entry.pointsChanged} points`;
        pointsHistoryList.appendChild(listItem);
    });
});
