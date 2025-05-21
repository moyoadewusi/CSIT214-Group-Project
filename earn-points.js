document.addEventListener('DOMContentLoaded', () => {
    const earnPointsButton = document.getElementById('earn-points-button');

    earnPointsButton.addEventListener('click', async () => {
        // Replace with your actual point-earning logic
        const response = await fetch('https://your-api-endpoint/earn-points', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            // Points earned successfully
            const data = await response.json();
            const points = data.points;
            const userName = data.userName;
            const pointsElement = document.getElementById('user-points');
            pointsElement.textContent = `Loyalty Points: ${points}`;
            logPointsHistory('Earned', 100); // Log the earned points
        } else {
            // Error earning points
            alert('Error earning points.');
        }
    });
});