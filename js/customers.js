document.addEventListener('DOMContentLoaded', function() {
    // Customer management specific functionality
    
    // Add customer form submission
    const addCustomerForm = document.getElementById('addCustomerForm');
    if (addCustomerForm) {
        addCustomerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm('addCustomerForm')) {
                // In a real app, you would send this data to your backend
                showToast('success', 'Customer added successfully!');
                $('#addCustomerModal').modal('hide');
                addCustomerForm.reset();
            }
        });
    }
    
    // Edit customer form submission
    const editCustomerForm = document.getElementById('editCustomerForm');
    if (editCustomerForm) {
        editCustomerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm('editCustomerForm')) {
                // In a real app, you would send this data to your backend
                showToast('success', 'Customer updated successfully!');
                $('#editCustomerModal').modal('hide');
            }
        });
    }
    
    // Delete customer confirmation
    const deleteCustomerButtons = document.querySelectorAll('.delete-customer-btn');
    deleteCustomerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const customerId = this.getAttribute('data-customer-id');
            const customerName = this.getAttribute('data-customer-name');
            
            if (confirm(`Are you sure you want to delete "${customerName}"?`)) {
                // In a real app, you would call your API to delete the customer
                showToast('success', `"${customerName}" has been deleted.`);
                // Remove the row from the table
                this.closest('tr').remove();
            }
        });
    });
    
    // Customer search functionality
    const customerSearchInput = document.getElementById('customerSearch');
    if (customerSearchInput) {
        customerSearchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('#customersTable tbody tr');
            
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
    
    // Status filter
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            const selectedStatus = this.value.toLowerCase();
            const rows = document.querySelectorAll('#customersTable tbody tr');
            
            rows.forEach(row => {
                const status = row.querySelector('td:nth-child(6)').textContent.toLowerCase();
                
                if (selectedStatus === '' || status.includes(selectedStatus)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Populate edit modal with customer data
    const editCustomerButtons = document.querySelectorAll('.edit-customer-btn');
    editCustomerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const customerId = this.getAttribute('data-customer-id');
            // In a real app, you would fetch customer data from your API
            const customerData = {
                id: customerId,
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
                phone: "(555) 123-4567",
                address: "123 Main St, Apt 4B",
                city: "New York",
                zip: "10001",
                status: "active"
            };
            
            // Populate the form
            document.getElementById('editCustomerFirstName').value = customerData.firstName;
            document.getElementById('editCustomerLastName').value = customerData.lastName;
            document.getElementById('editCustomerEmail').value = customerData.email;
            document.getElementById('editCustomerPhone').value = customerData.phone;
            document.getElementById('editCustomerAddress').value = customerData.address;
            document.getElementById('editCustomerCity').value = customerData.city;
            document.getElementById('editCustomerZip').value = customerData.zip;
            document.getElementById('editCustomerStatus').value = customerData.status;
        });
    });
});