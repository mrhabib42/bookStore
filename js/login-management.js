document.addEventListener('DOMContentLoaded', function() {
    // Login management specific functionality
    
    // Generate random password
    const generatePasswordBtn = document.getElementById('generatePassword');
    if (generatePasswordBtn) {
        generatePasswordBtn.addEventListener('click', function() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let password = '';
            
            for (let i = 0; i < 10; i++) {
                password += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            
            document.getElementById('loginPassword').value = password;
        });
    }
    
    // Create login form submission
    const createLoginForm = document.getElementById('createLoginForm');
    if (createLoginForm) {
        createLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm('createLoginForm')) {
                // In a real app, you would send this data to your backend
                showToast('success', 'Login created successfully!');
                $('#createLoginModal').modal('hide');
                createLoginForm.reset();
            }
        });
    }
    
    // Edit login form submission
    const editLoginForm = document.getElementById('editLoginForm');
    if (editLoginForm) {
        editLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm('editLoginForm')) {
                // In a real app, you would send this data to your backend
                showToast('success', 'Login updated successfully!');
                $('#editLoginModal').modal('hide');
            }
        });
    }
    
    // Reset password button
    const resetPasswordBtn = document.querySelector('.reset-password-btn');
    if (resetPasswordBtn) {
        resetPasswordBtn.addEventListener('click', function() {
            const username = this.getAttribute('data-username');
            
            if (confirm(`Reset password for ${username}? A temporary password will be generated.`)) {
                // In a real app, you would call your API to reset the password
                showToast('success', `Password for ${username} has been reset.`);
            }
        });
    }
    
    // Delete login confirmation
    const deleteLoginButtons = document.querySelectorAll('.delete-login-btn');
    deleteLoginButtons.forEach(button => {
        button.addEventListener('click', function() {
            const username = this.getAttribute('data-username');
            
            if (confirm(`Are you sure you want to delete login "${username}"?`)) {
                // In a real app, you would call your API to delete the login
                showToast('success', `Login "${username}" has been deleted.`);
                // Remove the row from the table
                this.closest('tr').remove();
            }
        });
    });
    
    // Login search functionality
    const loginSearchInput = document.getElementById('loginSearch');
    if (loginSearchInput) {
        loginSearchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('#loginsTable tbody tr');
            
            rows.forEach(row => {
                const username = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
                const name = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
                
                if (username.includes(searchTerm) || name.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Type filter
    const typeFilter = document.getElementById('typeFilter');
    if (typeFilter) {
        typeFilter.addEventListener('change', function() {
            const selectedType = this.value.toLowerCase();
            const rows = document.querySelectorAll('#loginsTable tbody tr');
            
            rows.forEach(row => {
                const type = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
                
                if (selectedType === '' || type.includes(selectedType)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Status filter
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            const selectedStatus = this.value.toLowerCase();
            const rows = document.querySelectorAll('#loginsTable tbody tr');
            
            rows.forEach(row => {
                const status = row.querySelector('td:nth-child(5)').textContent.toLowerCase();
                
                if (selectedStatus === '' || status.includes(selectedStatus)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Update user dropdown based on type selection
    const loginTypeSelect = document.getElementById('loginType');
    if (loginTypeSelect) {
        loginTypeSelect.addEventListener('change', function() {
            const userSelect = document.getElementById('loginUser');
            const selectedType = this.value;
            
            // In a real app, you would fetch users of the selected type from your API
            // This is just a simulation
            userSelect.innerHTML = '<option value="">Select User</option>';
            
            if (selectedType === 'employee') {
                userSelect.innerHTML += `
                    <option value="E1001">Sarah Johnson (Employee)</option>
                    <option value="E1002">Michael Brown (Employee)</option>
                `;
            } else if (selectedType === 'customer') {
                userSelect.innerHTML += `
                    <option value="C1001">John Doe (Customer)</option>
                    <option value="C1002">Jane Smith (Customer)</option>
                    <option value="C1003">Robert Johnson (Customer)</option>
                `;
            }
        });
    }
    
    // Auto-generate username when user is selected
    const userSelect = document.getElementById('loginUser');
    if (userSelect) {
        userSelect.addEventListener('change', function() {
            if (this.value) {
                const selectedOption = this.options[this.selectedIndex].text;
                const username = selectedOption.split(' ')[0].toLowerCase() + 
                                selectedOption.split(' ')[1].toLowerCase().charAt(0);
                document.getElementById('loginUsername').value = username;
            }
        });
    }
});