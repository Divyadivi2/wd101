document.addEventListener("DOMContentLoaded", function () {
    displayUsers(); // Load existing users on page load
});

document.getElementById("register").addEventListener("click", function () {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let dob = document.getElementById("dob").value;
    let termsAccepted = document.getElementById("terms").checked;

    // Validation for empty fields
    if (!name || !email || !password || !dob || !termsAccepted) {
        alert("All fields are required, and Terms must be accepted!");
        return;
    }

    // Age validation
    let age = calculateAge(dob);
    if (age < 18 || age > 55) {
        alert("Age must be between 18 and 55 years.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    if (users.some(user => user.email === email)) {
        alert("This email is already registered!");
        return;
    }

    // Save new user
    let newUser = {
        name: name,
        email: email,
        password: password, // Store actual password
        dob: dob,
        acceptedTerms: termsAccepted
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    displayUsers(); // Update table after adding user
    clearForm(); // Clear form fields
});

// Function to display users in the table
function displayUsers() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let tableBody = document.getElementById("userTable");
    tableBody.innerHTML = "";

    users.forEach(user => {
        let row = `<tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>****</td>  <!-- Mask password -->
                    <td>${user.dob}</td>
                    <td>${user.acceptedTerms ? "✔️" : "❌"}</td>
                   </tr>`;
        tableBody.innerHTML += row;
    });
}

// Function to clear form fields after registration
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("terms").checked = false;
}

// Function to calculate age from date of birth
function calculateAge(dob) {
    let birthDate = new Date(dob);
    let difference = Date.now() - birthDate.getTime();
    let age = new Date(difference).getUTCFullYear() - 1970;
    return age;
}
