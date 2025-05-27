document.addEventListener('DOMContentLoaded', () => {
    const proceedPaymentBtn = document.getElementById('proceed-payment-btn');
    const confirmationModal = document.getElementById('confirmation-modal');
    const cancelBtn = document.getElementById('cancel-btn');
    const confirmBtn = document.getElementById('confirm-btn');

    proceedPaymentBtn.addEventListener('click', () => {
        confirmationModal.style.display = 'block'; // Show modal
    });

    cancelBtn.addEventListener('click', () => {
        confirmationModal.style.display = 'none'; // Hide modal
    });

    confirmBtn.addEventListener('click', () => {
        confirmationModal.style.display = 'none';
        // Redirect to booking success page
        window.location.href = "success.html";
    });
});
