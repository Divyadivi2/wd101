document.addEventListener("DOMContentLoaded", function () {
    const registerButton = document.getElementById("register");
    const usersTable = document.getElementById("usersTableBody");

    registerButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent form from refreshing the page

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value;
        let dob = document.getElementById("dob").value;
        let termsAccepted = document.getElementById("terms").checked;

        console.log("Form Data:", { name, email, password, dob, termsAccepted });

        // Validate input fields
        if (!name || !email || !password || !dob || !termsAccepted) {
            alert("All fields are required and Terms & Conditions must be accepted!");
            return;
        }

        // Retrieve existing users from localStorage
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check for duplicate emails
        if (users.some(user => user.email === email)) {
            alert("This email is already registered!");
            return;
        }

        // Save new user
        let newUser = { name, email, password, dob, termsAccepted };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        // Update user list on UI
        displayUsers();
        alert("Registration successful!");
        
        // Clear the form after registration
        document.getElementById("registrationForm").reset();
    });

    function displayUsers() {
        usersTable.innerHTML = ""; // Clear existing table data
        let users = JSON.parse(localStorage.getItem("users")) || [];

        users.forEach(user => {
            let row = usersTable.insertRow();
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>****</td>  <!-- Hide actual password -->
                <td>${user.dob}</td>
                <td>${user.termsAccepted ? "✔" : "✘"}</td>
            `;
        });
    }

    // Display users when the page loads
    displayUsers();
});
