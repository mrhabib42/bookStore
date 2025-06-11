// Main JavaScript file for common functionality

document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const sidebarCollapse = document.getElementById('sidebarCollapse');
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // Toggle sidebar function
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        content.classList.toggle('active');
        
        if (sidebar.classList.contains('active')) {
            overlay.style.display = 'block';
            setTimeout(() => overlay.style.opacity = '1', 10);
        } else {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.style.display = 'none', 300);
        }
    }

    // Event listeners
    sidebarCollapse.addEventListener('click', toggleSidebar);
    
    overlay.addEventListener('click', toggleSidebar);
    
    // Close sidebar when clicking nav links (mobile)
    document.querySelectorAll('#sidebar a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) toggleSidebar();
        });
    });

    // Handle window resize
    function handleResize() {
        if (window.innerWidth >= 768) {
            sidebar.classList.add('active');
            content.classList.add('active');
        } else {
            sidebar.classList.remove('active');
            content.classList.remove('active');
        }
        overlay.style.display = 'none';
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize
});

    // Logout functionality
    const logoutButtons = document.querySelectorAll('#logout');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real app, you would call your logout API here
            localStorage.removeItem('authToken');
            window.location.href = 'index.html';
        });
    });

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Search functionality for all pages
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
        input.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const tableId = this.getAttribute('data-table');
            const table = document.getElementById(tableId);
            
            if (table) {
                const rows = table.querySelectorAll('tbody tr');
                
                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            }
        });
    });

    // Filter functionality
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            const filterValue = this.value.toLowerCase();
            const filterColumn = this.getAttribute('data-column');
            const tableId = this.getAttribute('data-table');
            const table = document.getElementById(tableId);
            
            if (table) {
                const rows = table.querySelectorAll('tbody tr');
                
                rows.forEach(row => {
                    const cell = row.querySelector(`td:nth-child(${filterColumn})`);
                    if (cell) {
                        const cellText = cell.textContent.toLowerCase();
                        if (filterValue === '' || cellText.includes(filterValue)) {
                            row.style.display = '';
                        } else {
                            row.style.display = 'none';
                        }
                    }
                });
            }
        });
    });
});

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        });
        
        return isValid;
    }
    return false;
}

// Show toast notifications
function showToast(type, message) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
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

// Initialize all modals
function initModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('show.bs.modal', function(event) {
            // You can add pre-show logic here if needed
        });
    });
}

// Initialize all datepickers
function initDatepickers() {
    const dateInputs = document.querySelectorAll('.datepicker');
    dateInputs.forEach(input => {
        // In a real app, you would initialize a datepicker library here
        input.type = 'date';
    });
}

// Initialize the app
function initApp() {
    initModals();
    initDatepickers();
}

// Run the app initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);