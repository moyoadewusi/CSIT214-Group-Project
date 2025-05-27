# WeFly Loyalty Program Web App

A responsive web application that simulates a loyalty program where users can log in, earn points, redeem rewards, view their redemption history, and undo redemptions. This project was built as part of a university group assignment.

## Features

- User Authentication (Simple frontend simulation)
- Profile View with Real-Time Points Display
- Rewards Redemption with Undo Capability
- Points History Log
- Dark Mode Based on System Preferences
- Fully Responsive UI (Mobile, Tablet, Desktop)

## How It Works

1. **Login**: The user logs in using a simple form (no backend).
2. **Navigation**: The navbar updates to reflect login state and allows switching between sections.
3. **Points**: Users start with preset points and can redeem for items like Coffee Mugs or Gift Vouchers.
4. **Undo**: Recently redeemed items can be undone to refund points.
5. **History**: All redemptions and undo actions are recorded in localStorage.

## Technologies Used

- HTML5 & CSS3
- JavaScript (ES6+)
- LocalStorage API
- Responsive Design (Flexbox, Media Queries)
- Dark Mode with `prefers-color-scheme`