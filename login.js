import { showSection } from './navigation.js';
import { setActiveLink } from './navigation.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = usernameInput.value;
        const password = passwordInput.value;

        // Replace with your actual authentication logic
        if (username === 'placeholder' && password === 'placeholder') {
            // Successful login
            const token = 'placeholder_token';
            const userId = 'placeholder_user';
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);

            // Redirect to profile page immediately
            showSection(document.getElementById('profile'));
            setActiveLink(document.querySelector('nav ul li a[href="#profile"]')); // Set the active link
        } else {
            // Login failed
            alert('Invalid username or password.');
        }
    });
});
