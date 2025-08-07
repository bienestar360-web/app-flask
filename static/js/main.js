// static/js/main.js

document.addEventListener('DOMContentLoaded', function() {

    // --- MANEJO DEL MENÚ MÓVIL ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.querySelector('.nav-links');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });

        // Cierra el menú al hacer clic en un enlace (para navegación en la misma página)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                }
            });
        });
    }

    // --- VALIDACIÓN DEL FORMULARIO DE CONTACTO ---
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            let isValid = true;
            let firstInvalidField = null;

            // Limpiar errores previos (si los hubiera)
            this.querySelectorAll('.error-message').forEach(el => el.remove());
            this.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

            // Campos requeridos
            const requiredFields = ['nombre', 'empresa', 'email', 'mensaje'];
            requiredFields.forEach(fieldName => {
                const field = document.getElementById(fieldName);
                if (!field.value.trim()) {
                    isValid = false;
                    showError(field, 'Este campo es obligatorio.');
                    if (!firstInvalidField) firstInvalidField = field;
                }
            });

            // Validación de Email
            const emailField = document.getElementById('email');
            if (emailField.value.trim() && !isValidEmail(emailField.value)) {
                isValid = false;
                showError(emailField, 'Por favor, introduce un correo electrónico válido.');
                if (!firstInvalidField) firstInvalidField = emailField;
            }

            // Si el formulario no es válido, prevenir el envío y hacer foco en el primer error
            if (!isValid) {
                event.preventDefault();
                if (firstInvalidField) {
                    firstInvalidField.focus();
                }
            }
            // Si es válido, se enviará normalmente al backend de Flask.
            // Para una integración con Formspree, cambiarías el 'action' del form en el HTML
            // y no necesitarías esta validación (o podrías mantenerla como una capa extra).
        });
    }

    function showError(field, message) {
        field.classList.add('input-error');
        const error = document.createElement('div');
        error.className = 'error-message';
        error.style.color = 'red';
        error.style.fontSize = '0.8rem';
        error.style.marginTop = '5px';
        error.textContent = message;
        field.parentElement.appendChild(error);
    }
    
    function isValidEmail(email) {
        // Expresión regular simple para validación de email
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    }
});