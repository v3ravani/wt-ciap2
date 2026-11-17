/* ==========================================================================
   Web Technology II | CIAP
   Topic: JavaScript Events and Event Handling & Form Validation
   File: script.js
   ========================================================================== */


/* ==========================================================================
   SECTION 1: JAVASCRIPT EVENTS SIMULATION
   Demonstrating click, mouseover, dblclick, and keydown events using addEventListener.
   ========================================================================== */

// --------------------------------------------------
// A. Click Event Demonstration
// When clicked, the button turns green.
// --------------------------------------------------
const clickBtn = document.getElementById("clickBtn");

clickBtn.addEventListener("click", function () {
    // Change background color to green and text color to white
    clickBtn.style.backgroundColor = "#16a34a";
    clickBtn.style.color = "#ffffff";
    clickBtn.style.borderColor = "#15803d";
    clickBtn.textContent = "Clicked!";
});


// --------------------------------------------------
// B. Mouseover Event Demonstration
// When hovered, the background color changes.
// When the cursor leaves (mouseout), it restores.
// --------------------------------------------------
const mouseoverBtn = document.getElementById("mouseoverBtn");

mouseoverBtn.addEventListener("mouseover", function () {
    // Change color on mouse hover
    mouseoverBtn.style.backgroundColor = "#2563eb"; // Blue
    mouseoverBtn.style.color = "#ffffff";
    mouseoverBtn.style.borderColor = "#1d4ed8";
    mouseoverBtn.textContent = "Hovered!";
});

mouseoverBtn.addEventListener("mouseout", function () {
    // Reset back to initial state when mouse leaves
    mouseoverBtn.style.backgroundColor = "";
    mouseoverBtn.style.color = "";
    mouseoverBtn.style.borderColor = "";
    mouseoverBtn.textContent = "Hover Over Me";
});


// --------------------------------------------------
// C. Double Click Event Demonstration
// When double-clicked, background color changes to purple.
// --------------------------------------------------
const dblClickBtn = document.getElementById("dblClickBtn");

dblClickBtn.addEventListener("dblclick", function () {
    // Change background color to purple
    dblClickBtn.style.backgroundColor = "#9333ea";
    dblClickBtn.style.color = "#ffffff";
    dblClickBtn.style.borderColor = "#7e22ce";
    dblClickBtn.textContent = "Double Clicked!";
});


// --------------------------------------------------
// D. Keyboard Event Demonstration
// Listens for 'V' or 'v' key press anywhere on the page
// to change the demonstration box color.
// --------------------------------------------------
const keyboardBox = document.getElementById("keyboardBox");

// Array of colors to cycle through on each 'V' key press
const boxColors = ["#ecfdf5", "#eff6ff", "#fef3c7", "#f3e8ff", "#fee2e2"];
let currentColorIndex = 0;

window.addEventListener("keydown", function (event) {
    // Ignore keyboard event if the user is typing inside an input field
    if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
        return;
    }

    // Check if the pressed key is 'V' or 'v'
    if (event.key === "v" || event.key === "V") {
        // Update color index
        currentColorIndex = (currentColorIndex + 1) % boxColors.length;

        // Apply new background color and border style
        keyboardBox.style.backgroundColor = boxColors[currentColorIndex];
        keyboardBox.style.borderColor = "#16a34a";
        keyboardBox.innerHTML = '<span class="key-label" style="color: #15803d; font-weight: 600;">Key "V" Pressed!</span>';
    }
});



/* ==========================================================================
   SECTION 2: FORM VALIDATION
   Client-side validation using preventDefault(), regex, and DOM manipulation.
   ========================================================================== */

// Get references to form elements
const validationForm = document.getElementById("validationForm");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

// Get references to error message elements
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const successMessage = document.getElementById("successMessage");


// --------------------------------------------------
// Helper Function: Clear all previous error messages
// --------------------------------------------------
function clearErrors() {
    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";

    fullNameInput.classList.remove("input-error");
    emailInput.classList.remove("input-error");
    phoneInput.classList.remove("input-error");

    successMessage.style.display = "none";
}


// --------------------------------------------------
// Validation Function: Validates all inputs
// --------------------------------------------------
function validateForm() {
    let isValid = true;

    // 1. Validate Full Name (Must not be empty)
    const nameValue = fullNameInput.value.trim();
    if (nameValue === "") {
        nameError.textContent = "Please enter your full name.";
        fullNameInput.classList.add("input-error");
        isValid = false;
    }

    // 2. Validate Email Address (Must follow standard email format)
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
        emailError.textContent = "Please enter your email address.";
        emailInput.classList.add("input-error");
        isValid = false;
    } else if (!emailPattern.test(emailValue)) {
        emailError.textContent = "Please enter a valid email address (e.g., student@college.edu).";
        emailInput.classList.add("input-error");
        isValid = false;
    }

    // 3. Validate Phone Number (Must contain exactly 10 digits)
    const phoneValue = phoneInput.value.trim();
    const phonePattern = /^\d{10}$/;

    if (phoneValue === "") {
        phoneError.textContent = "Please enter your phone number.";
        phoneInput.classList.add("input-error");
        isValid = false;
    } else if (!phonePattern.test(phoneValue)) {
        phoneError.textContent = "Phone number must contain exactly 10 numeric digits.";
        phoneInput.classList.add("input-error");
        isValid = false;
    }

    return isValid;
}


// --------------------------------------------------
// Form Submission Event Listener
// Uses preventDefault() to stop default form submission
// --------------------------------------------------
validationForm.addEventListener("submit", function (event) {
    // Prevent the default browser behavior (page reload)
    event.preventDefault();

    // Clear any previous error messages
    clearErrors();

    // Run validation checks
    const formIsValid = validateForm();

    // Display success message if all fields are valid
    if (formIsValid) {
        successMessage.style.display = "block";
        
        // Reset form fields after successful submission
        validationForm.reset();
    }
});
