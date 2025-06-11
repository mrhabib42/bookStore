document.addEventListener('DOMContentLoaded', function() {
    // Authors & Genres management specific functionality
    
    // Add author form submission
    const addAuthorForm = document.getElementById('addAuthorForm');
    if (addAuthorForm) {
        addAuthorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm('addAuthorForm')) {
                // In a real app, you would send this data to your backend
                showToast('success', 'Author added successfully!');
                $('#addAuthorModal').modal('hide');
                addAuthorForm.reset();
            }
        });
    }
    
    // Edit author form submission
    const editAuthorForm = document.getElementById('editAuthorForm');
    if (editAuthorForm) {
        editAuthorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm('editAuthorForm')) {
                // In a real app, you would send this data to your backend
                showToast('success', 'Author updated successfully!');
                $('#editAuthorModal').modal('hide');
            }
        });
    }
    
    // Delete author confirmation
    const deleteAuthorButtons = document.querySelectorAll('.delete-author-btn');
    deleteAuthorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const authorId = this.getAttribute('data-author-id');
            const authorName = this.getAttribute('data-author-name');
            
            if (confirm(`Are you sure you want to delete "${authorName}"?`)) {
                // In a real app, you would call your API to delete the author
                showToast('success', `"${authorName}" has been deleted.`);
                // Remove the row from the table
                this.closest('tr').remove();
            }
        });
    });
    
    // Author search functionality
    const authorSearchInput = document.getElementById('authorSearch');
    if (authorSearchInput) {
        authorSearchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('#authorsTable tbody tr');
            
            rows.forEach(row => {
                const authorName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
                
                if (authorName.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Add genre form submission
    const addGenreForm = document.getElementById('addGenreForm');
    if (addGenreForm) {
        addGenreForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm('addGenreForm')) {
                // In a real app, you would send this data to your backend
                showToast('success', 'Genre added successfully!');
                $('#addGenreModal').modal('hide');
                addGenreForm.reset();
            }
        });
    }
    
    // Edit genre form submission
    const editGenreForm = document.getElementById('editGenreForm');
    if (editGenreForm) {
        editGenreForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm('editGenreForm')) {
                // In a real app, you would send this data to your backend
                showToast('success', 'Genre updated successfully!');
                $('#editGenreModal').modal('hide');
            }
        });
    }
    
    // Delete genre confirmation
    const deleteGenreButtons = document.querySelectorAll('.delete-genre-btn');
    deleteGenreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const genreId = this.getAttribute('data-genre-id');
            const genreName = this.getAttribute('data-genre-name');
            
            if (confirm(`Are you sure you want to delete the "${genreName}" genre?`)) {
                // In a real app, you would call your API to delete the genre
                showToast('success', `"${genreName}" genre has been deleted.`);
                // Remove the row from the table
                this.closest('tr').remove();
            }
        });
    });
    
    // Genre search functionality
    const genreSearchInput = document.getElementById('genreSearch');
    if (genreSearchInput) {
        genreSearchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('#genresTable tbody tr');
            
            rows.forEach(row => {
                const genreName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
                
                if (genreName.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Populate edit author modal with data
    const editAuthorButtons = document.querySelectorAll('.edit-author-btn');
    editAuthorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const authorId = this.getAttribute('data-author-id');
            // In a real app, you would fetch author data from your API
            const authorData = {
                id: authorId,
                firstName: "Alex",
                lastName: "Michaelides",
                nationality: "British",
                birthYear: "1977",
                bio: "Alex Michaelides is a British-Cypriot author and screenwriter..."
            };
            
            // Populate the form
            document.getElementById('editAuthorFirstName').value = authorData.firstName;
            document.getElementById('editAuthorLastName').value = authorData.lastName;
            document.getElementById('editAuthorNationality').value = authorData.nationality;
            document.getElementById('editAuthorBirthYear').value = authorData.birthYear;
            document.getElementById('editAuthorBio').value = authorData.bio;
        });
    });
    
    // Populate edit genre modal with data
    const editGenreButtons = document.querySelectorAll('.edit-genre-btn');
    editGenreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const genreId = this.getAttribute('data-genre-id');
            // In a real app, you would fetch genre data from your API
            const genreData = {
                id: genreId,
                name: "Mystery",
                description: "Mystery is a genre of literature whose stories focus on a puzzling crime..."
            };
            
            // Populate the form
            document.getElementById('editGenreName').value = genreData.name;
            document.getElementById('editGenreDescription').value = genreData.description;
        });
    });
});