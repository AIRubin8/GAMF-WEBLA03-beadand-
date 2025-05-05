// Form validation script for IT Business Analyst website
document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    const form = document.getElementById('contactForm');
    
    // Add event listener for form submission
    form.addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();
        
        // Reset previous validation
        resetValidation();
        
        // Validate all fields
        let isValid = validateForm();
        
        // If form is valid, submit it (or show success message)
        if (isValid) {
            showSuccessMessage();
        }
    });
    
    // Function to reset validation state
    function resetValidation() {
        // Remove all validation classes
        const inputs = form.querySelectorAll('.form-control, .form-select, .form-check-input');
        inputs.forEach(input => {
            input.classList.remove('is-invalid');
            input.classList.remove('is-valid');
        });
    }
    
    // Function to validate the entire form
    function validateForm() {
        let isValid = true;
        
        // Required fields to validate
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const projectType = document.getElementById('projectType');
        const message = document.getElementById('message');
        const privacy = document.getElementById('privacy');
        
        // Validate name (required, min 10 characters)
        if (!name.value.trim() || name.value.trim().length < 10) {
            name.classList.add('is-invalid');
            isValid = false;
        } else {
            name.classList.add('is-valid');
        }
        
        // Validate email (required, valid email format)
        if (!validateEmail(email.value)) {
            email.classList.add('is-invalid');
            isValid = false;
        } else {
            email.classList.add('is-valid');
        }
        
        // Validate project type (required)
        if (projectType.value === "" || projectType.selectedIndex === 0) {
            projectType.classList.add('is-invalid');
            isValid = false;
        } else {
            projectType.classList.add('is-valid');
        }
        
        // Validate message (required, min 10 characters)
        if (!message.value.trim() || message.value.trim().length < 10) {
            message.classList.add('is-invalid');
            isValid = false;
        } else {
            message.classList.add('is-valid');
        }
        
        // Validate privacy checkbox (required)
        if (!privacy.checked) {
            privacy.classList.add('is-invalid');
            isValid = false;
        } else {
            privacy.classList.add('is-valid');
        }
        
        return isValid;
    }
    
    // Function to validate email format
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase()) && email.trim() !== '';
    }
    
    // Function to show success message
    function showSuccessMessage() {
        // Hide the form
        form.style.display = 'none';
        
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success mt-4';
        successMessage.role = 'alert';
        successMessage.innerHTML = `
            <h4 class="alert-heading">Köszönjük üzenetét!</h4>
            <p>Sikeresen elküldte az üzenetét. Munkatársunk hamarosan felveszi Önnel a kapcsolatot.</p>
            <hr>
            <p class="mb-0">Az IT Business Analyst csapata</p>
        `;
        
        // Insert success message before the form
        form.parentNode.insertBefore(successMessage, form);
        
        // Add button to reset form
        const resetButton = document.createElement('button');
        resetButton.className = 'btn btn-primary mt-3';
        resetButton.textContent = 'Új üzenet küldése';
        resetButton.addEventListener('click', function() {
            // Remove success message
            successMessage.remove();
            // Reset and show form
            form.reset();
            resetValidation();
            form.style.display = 'block';
        });
        
        // Add reset button after success message
        successMessage.appendChild(resetButton);
    }
    
    // Add real-time validation for fields
    const inputs = form.querySelectorAll('.form-control, .form-select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            // Validate specific field on blur
            validateField(this);
        });
    });
    
    // Validate privacy checkbox on change
    document.getElementById('privacy').addEventListener('change', function() {
        validateField(this);
    });
    
    // Function to validate a specific field
    function validateField(field) {
        // Reset field validation
        field.classList.remove('is-invalid');
        field.classList.remove('is-valid');
        
        // Validate based on field ID
        switch(field.id) {
            case 'name':
                if (!field.value.trim() || field.value.trim().length < 10) {
                    field.classList.add('is-invalid');
                } else {
                    field.classList.add('is-valid');
                }
                break;
                
            case 'email':
                if (!validateEmail(field.value)) {
                    field.classList.add('is-invalid');
                } else {
                    field.classList.add('is-valid');
                }
                break;
                
            case 'projectType':
                if (field.value === "" || field.selectedIndex === 0) {
                    field.classList.add('is-invalid');
                } else {
                    field.classList.add('is-valid');
                }
                break;
                
            case 'message':
                if (!field.value.trim() || field.value.trim().length < 10) {
                    field.classList.add('is-invalid');
                } else {
                    field.classList.add('is-valid');
                }
                break;
                
            case 'privacy':
                if (!field.checked) {
                    field.classList.add('is-invalid');
                } else {
                    field.classList.add('is-valid');
                }
                break;
        }
    }
});
