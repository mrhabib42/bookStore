document.addEventListener('DOMContentLoaded', function() {
    // Order management specific functionality
    
    // Variables to track order items
    let orderItems = [];
    let subtotal = 0;
    const taxRate = 0.10; // 10% tax
    
    // Add book to order
    const addBookBtn = document.getElementById('addBookBtn');
    if (addBookBtn) {
        addBookBtn.addEventListener('click', function() {
            const bookSelect = document.getElementById('addBookToOrder');
            const selectedOption = bookSelect.options[bookSelect.selectedIndex];
            
            if (selectedOption.value) {
                const bookInfo = selectedOption.text.split(' - $');
                const bookTitle = bookInfo[0];
                const bookPrice = parseFloat(bookInfo[1]);
                const bookId = selectedOption.value;
                
                // Check if book already exists in order
                const existingItem = orderItems.find(item => item.id === bookId);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                    existingItem.total = existingItem.quantity * existingItem.price;
                } else {
                    orderItems.push({
                        id: bookId,
                        title: bookTitle,
                        price: bookPrice,
                        quantity: 1,
                        total: bookPrice
                    });
                }
                
                updateOrderItemsTable();
                bookSelect.selectedIndex = 0;
            }
        });
    }
    
    // Update order items table
    function updateOrderItemsTable() {
        const orderItemsTable = document.getElementById('orderItemsTable');
        orderItemsTable.innerHTML = '';
        
        subtotal = 0;
        
        orderItems.forEach((item, index) => {
            subtotal += item.total;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.title}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" class="form-control form-control-sm quantity-input" 
                           value="${item.quantity}" min="1" data-index="${index}">
                </td>
                <td>$${item.total.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-outline-danger remove-item-btn" data-index="${index}">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
            orderItemsTable.appendChild(row);
        });
        
        // Add event listeners to quantity inputs
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const newQuantity = parseInt(this.value) || 1;
                
                orderItems[index].quantity = newQuantity;
                orderItems[index].total = newQuantity * orderItems[index].price;
                updateOrderItemsTable();
            });
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                orderItems.splice(index, 1);
                updateOrderItemsTable();
            });
        });
        
        // Update totals
        const tax = subtotal * taxRate;
        const total = subtotal + tax;
        
        document.getElementById('orderSubtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('orderTax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('orderTotal').textContent = `$${total.toFixed(2)}`;
    }
    
    // Place order form submission
    const placeOrderForm = document.getElementById('placeOrderForm');
    if (placeOrderForm) {
        placeOrderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm('placeOrderForm') && orderItems.length > 0) {
                // In a real app, you would send this data to your backend
                const orderData = {
                    customerId: document.getElementById('orderCustomer').value,
                    date: document.getElementById('orderDate').value,
                    items: orderItems,
                    subtotal: subtotal,
                    tax: subtotal * taxRate,
                    total: subtotal + (subtotal * taxRate),
                    status: 'pending'
                };
                
                showToast('success', 'Order placed successfully!');
                $('#placeOrderModal').modal('hide');
                placeOrderForm.reset();
                orderItems = [];
                updateOrderItemsTable();
                
                // In a real app, you would refresh the orders table or add the new order to it
            } else if (orderItems.length === 0) {
                showToast('danger', 'Please add at least one book to the order');
            }
        });
    }
    
    // Edit order form submission
    const editOrderForm = document.getElementById('editOrderForm');
    if (editOrderForm) {
        editOrderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm('editOrderForm')) {
                // In a real app, you would send this data to your backend
                showToast('success', 'Order updated successfully!');
                $('#editOrderModal').modal('hide');
            }
        });
    }
    
    // Delete order confirmation
    const deleteOrderButtons = document.querySelectorAll('.delete-order-btn');
    deleteOrderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.getAttribute('data-order-id');
            
            if (confirm(`Are you sure you want to delete order #${orderId}?`)) {
                // In a real app, you would call your API to delete the order
                showToast('success', `Order #${orderId} has been deleted.`);
                // Remove the row from the table
                this.closest('tr').remove();
            }
        });
    });
    
    // Print invoice button
    const printInvoiceBtn = document.getElementById('printInvoiceBtn');
    if (printInvoiceBtn) {
        printInvoiceBtn.addEventListener('click', function() {
            const invoiceContent = document.getElementById('invoiceContent').innerHTML;
            const originalContent = document.body.innerHTML;
            
            document.body.innerHTML = invoiceContent;
            window.print();
            document.body.innerHTML = originalContent;
            
            // Reinitialize any necessary scripts
            initApp();
        });
    }
    
    // Order search functionality
    const orderSearchInput = document.getElementById('orderSearch');
    if (orderSearchInput) {
        orderSearchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('#ordersTable tbody tr');
            
            rows.forEach(row => {
                const orderId = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
                const customer = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
                
                if (orderId.includes(searchTerm) || customer.includes(searchTerm)) {
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
            const rows = document.querySelectorAll('#ordersTable tbody tr');
            
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
    
    // Customer filter
    const customerFilter = document.getElementById('customerFilter');
    if (customerFilter) {
        customerFilter.addEventListener('change', function() {
            const selectedCustomerId = this.value;
            const rows = document.querySelectorAll('#ordersTable tbody tr');
            
            rows.forEach(row => {
                const customerId = row.getAttribute('data-customer-id');
                
                if (selectedCustomerId === '' || customerId === selectedCustomerId) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Date filter
    const dateFilter = document.getElementById('dateFilter');
    if (dateFilter) {
        dateFilter.addEventListener('change', function() {
            const selectedDate = this.value;
            const rows = document.querySelectorAll('#ordersTable tbody tr');
            
            rows.forEach(row => {
                const orderDate = row.querySelector('td:nth-child(3)').textContent;
                
                if (selectedDate === '' || orderDate === selectedDate) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Initialize date fields with today's date
    const today = new Date().toISOString().split('T')[0];
    const orderDateField = document.getElementById('orderDate');
    if (orderDateField) {
        orderDateField.value = today;
    }
});