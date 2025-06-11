// // auth.js - Authentication functionality

// document.addEventListener('DOMContentLoaded', function() {
//     // Check if user is already logged in
//     checkLoginStatus();

//     // Login form submission
//     const loginForm = document.getElementById('loginForm');
//     if (loginForm) {
//         loginForm.addEventListener('submit', function(e) {
//             e.preventDefault();
//             handleLogin();
//         });
//     }

//     // Forgot password link
//     const forgotPasswordLink = document.getElementById('forgotPassword');
//     if (forgotPasswordLink) {
//         forgotPasswordLink.addEventListener('click', function(e) {
//             e.preventDefault();
//             showForgotPasswordModal();
//         });
//     }

//     // Logout functionality
//     const logoutButtons = document.querySelectorAll('#logout');
//     logoutButtons.forEach(button => {
//         button.addEventListener('click', function(e) {
//             e.preventDefault();
//             handleLogout();
//         });
//     });
// });

// // Check if user is logged in
// function checkLoginStatus() {
//     const authToken = localStorage.getItem('authToken');
//     const currentPath = window.location.pathname.split('/').pop();
    
//     // If user is on login page but already logged in, redirect to dashboard
//     if (authToken && currentPath === 'index.html') {
//         window.location.href = 'dashboard.html';
//     }
//     // If user is not logged in but trying to access protected pages, redirect to login
//     else if (!authToken && currentPath !== 'index.html') {
//         window.location.href = 'index.html';
//     }
// }

// // Handle login process
// function handleLogin() {
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
    
//     // Simple validation
//     if (!username || !password) {
//         showToast('danger', 'Please enter both username and password');
//         return;
//     }

//     // In a real app, you would make an API call to authenticate
//     // This is a simulation with hardcoded credentials
//     const validCredentials = [
//         { username: 'admin', password: 'admin123', role: 'admin', name: 'Admin User' },
//         { username: 'staff', password: 'staff123', role: 'staff', name: 'Staff User' }
//     ];
    
//     const user = validCredentials.find(cred => 
//         cred.username === username && cred.password === password
//     );

//     if (user) {
//         // Simulate API response delay
//         setTimeout(() => {
//             // Store user data in localStorage
//             localStorage.setItem('authToken', 'simulated-auth-token');
//             localStorage.setItem('userRole', user.role);
//             localStorage.setItem('userName', user.name);
            
//             showToast('success', 'Login successful! Redirecting...');
            
//             // Redirect to dashboard after short delay
//             setTimeout(() => {
//                 window.location.href = 'dashboard.html';
//             }, 1000);
//         }, 500);
//     } else {
//         showToast('danger', 'Invalid username or password');
//     }
// }

// // Handle logout process
// function handleLogout() {
//     // Clear authentication data
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userRole');
//     localStorage.removeItem('userName');
    
//     // Redirect to login page
//     window.location.href = 'index.html';
// }

// Show forgot password modal
function showForgotPasswordModal() {
    // In a real app, you would show a modal or redirect to a password reset page
    // This is a simplified version
    const email = prompt('Please enter your email address to reset your password:');
    
    if (email) {
        // Simulate sending reset email
        setTimeout(() => {
            showToast('success', 'Password reset link has been sent to your email');
        }, 1000);
    }
}

// Show toast notification (shared with other JS files)
function showToast(type, message) {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.style.position = 'fixed';
        toastContainer.style.top = '20px';
        toastContainer.style.right = '20px';
        toastContainer.style.zIndex = '1100';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toastEl = document.createElement('div');
    toastEl.className = `toast align-items-center text-white bg-${type} border-0`;
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    
    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    
    toastContainer.appendChild(toastEl);
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
    
    // Remove toast after it's hidden
    toastEl.addEventListener('hidden.bs.toast', function() {
        toastEl.remove();
    });
}