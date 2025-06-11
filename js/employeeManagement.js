document.addEventListener('DOMContentLoaded', function() {
    // Employee management specific functionality
    
    // Add employee form submission
    const addEmployeeForm = document.getElementById('addEmployeeForm');
    if (addEmployeeForm) {
        addEmployeeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm('addEmployeeForm')) {
                // In a real app, you would send this data to your backend
                showToast('success', 'Employee added successfully!');
                $('#addEmployeeModal').modal('hide');
                addEmployeeForm.reset();
            }
        });
    }
    
    // Edit employee form submission
    const editEmployeeForm = document.getElementById('editEmployeeForm');
    if (editEmployeeForm) {
        editEmployeeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm('editEmployeeForm')) {
                // In a real app, you would send this data to your backend
                showToast('success', 'Employee updated successfully!');
                $('#editEmployeeModal').modal('hide');
            }
        });
    }
    
    // Delete employee confirmation
    const deleteEmployeeButtons = document.querySelectorAll('.delete-employee-btn');
    deleteEmployeeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const employeeId = this.getAttribute('data-employee-id');
            const employeeName = this.getAttribute('data-employee-name');
            
            if (confirm(`Are you sure you want to delete "${employeeName}"?`)) {
                // In a real app, you would call your API to delete the employee
                showToast('success', `"${employeeName}" has been deleted.`);
                // Remove the row from the table
                this.closest('tr').remove();
            }
        });
    });
    
    // Employee search functionality
    const employeeSearchInput = document.getElementById('employeeSearch');
    if (employeeSearchInput) {
        employeeSearchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('#employeesTable tbody tr');
            
            rows.forEach(row => {
                const name = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
                const email = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
                
                if (name.includes(searchTerm) || email.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Role filter
    const roleFilter = document.getElementById('roleFilter');
    if (roleFilter) {
        roleFilter.addEventListener('change', function() {
            const selectedRole = this.value.toLowerCase();
            const rows = document.querySelectorAll('#employeesTable tbody tr');
            
            rows.forEach(row => {
                const role = row.querySelector('td:nth-child(5)').textContent.toLowerCase();
                
                if (selectedRole === '' || role.includes(selectedRole)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // View credentials button
    const viewCredentialsButtons = document.querySelectorAll('.view-credentials-btn');
    viewCredentialsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const employeeId = this.getAttribute('data-employee-id');
            // In a real app, you would fetch credentials from your API
            $('#viewCredentialsModal').modal('show');
        });
    });
    
    // Copy to clipboard functionality
    const copyButtons = document.querySelectorAll('[id^="copy"]');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const inputId = this.id.replace('copy', '').toLowerCase();
            const input = document.getElementById(inputId);
            if (input) {
                input.select();
                document.execCommand('copy');
                showToast('success', 'Copied to clipboard!');
            }
        });
    });
    
    // Populate edit modal with employee data
    const editEmployeeButtons = document.querySelectorAll('.edit-employee-btn');
    editEmployeeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const employeeId = this.getAttribute('data-employee-id');
            // In a real app, you would fetch employee data from your API
            const employeeData = {
                id: employeeId,
                firstName: "Sarah",
                lastName: "Johnson",
                email: "sarah.j@example.com",
                phone: "(555) 111-2222",
                role: "admin",
                status: "active",
                hireDate: "2022-01-10"
            };
            
            // Populate the form
            document.getElementById('editEmployeeFirstName').value = employeeData.firstName;
            document.getElementById('editEmployeeLastName').value = employeeData.lastName;
            document.getElementById('editEmployeeEmail').value = employeeData.email;
            document.getElementById('editEmployeePhone').value = employeeData.phone;
            document.getElementById('editEmployeeRole').value = employeeData.role;
            document.getElementById('editEmployeeStatus').value = employeeData.status;
            document.getElementById('editEmployeeHireDate').value = employeeData.hireDate;
        });
    });
});