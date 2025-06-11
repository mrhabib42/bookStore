document.addEventListener('DOMContentLoaded', function() {
    // Book management specific functionality
    
    // Add book form submission
    const addBookForm = document.getElementById('addBookForm');
    if (addBookForm) {
        addBookForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm('addBookForm')) {
                // In a real app, you would send this data to your backend
                showToast('success', 'Book added successfully!');
                $('#addBookModal').modal('hide');
                addBookForm.reset();
            }
        });
    }
    
    // Edit book form submission
    const editBookForm = document.getElementById('editBookForm');
    if (editBookForm) {
        editBookForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm('editBookForm')) {
                // In a real app, you would send this data to your backend
                showToast('success', 'Book updated successfully!');
                $('#editBookModal').modal('hide');
            }
        });
    }
    
    // Delete book confirmation
    const deleteBookButtons = document.querySelectorAll('.delete-book-btn');
    deleteBookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookId = this.getAttribute('data-book-id');
            const bookTitle = this.getAttribute('data-book-title');
            
            if (confirm(`Are you sure you want to delete "${bookTitle}"?`)) {
                // In a real app, you would call your API to delete the book
                showToast('success', `"${bookTitle}" has been deleted.`);
                // Remove the row from the table
                this.closest('tr').remove();
            }
        });
    });
    
    // Book search functionality
    const bookSearchInput = document.getElementById('bookSearch');
    if (bookSearchInput) {
        bookSearchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('#booksTable tbody tr');
            
            rows.forEach(row => {
                const title = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
                const author = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || author.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Genre filter
    const genreFilter = document.getElementById('genreFilter');
    if (genreFilter) {
        genreFilter.addEventListener('change', function() {
            const selectedGenre = this.value.toLowerCase();
            const rows = document.querySelectorAll('#booksTable tbody tr');
            
            rows.forEach(row => {
                const genre = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
                
                if (selectedGenre === '' || genre.includes(selectedGenre)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Author filter
    const authorFilter = document.getElementById('authorFilter');
    if (authorFilter) {
        authorFilter.addEventListener('change', function() {
            const selectedAuthorId = this.value;
            const rows = document.querySelectorAll('#booksTable tbody tr');
            
            rows.forEach(row => {
                const authorId = row.getAttribute('data-author-id');
                
                if (selectedAuthorId === '' || authorId === selectedAuthorId) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Populate edit modal with book data
    const editBookButtons = document.querySelectorAll('.edit-book-btn');
    editBookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookId = this.getAttribute('data-book-id');
            // In a real app, you would fetch book data from your API
            const bookData = {
                id: bookId,
                title: "The Silent Patient",
                author: "1",
                genre: "mystery",
                isbn: "978-1250301697",
                price: "12.99",
                stock: "24",
                pages: "336",
                description: "Alicia Berenson's life is seemingly perfect..."
            };
            
            // Populate the form
            document.getElementById('editBookTitle').value = bookData.title;
            document.getElementById('editBookAuthor').value = bookData.author;
            document.getElementById('editBookGenre').value = bookData.genre;
            document.getElementById('editBookIsbn').value = bookData.isbn;
            document.getElementById('editBookPrice').value = bookData.price;
            document.getElementById('editBookStock').value = bookData.stock;
            document.getElementById('editBookPages').value = bookData.pages;
            document.getElementById('editBookDescription').value = bookData.description;
        });
    });
});