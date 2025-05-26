document.addEventListener('DOMContentLoaded', () => {
    const deleteAccountButton = document.getElementById('delete-account');
    const pointsElement = document.getElementById('user-points');
    const pointsHistoryList = document.getElementById('points-history-list');

    // Delete account function
    deleteAccountButton.addEventListener('click', (e) => {
        e.preventDefault();

        // Confirm deletion
        const confirmDelete = confirm("Are you sure you want to delete your account? This action cannot be undone.");

        if (confirmDelete) {
            // Clear local storage
            localStorage.clear();

            // Reset the points display and points history
            pointsElement.textContent = '0';
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
