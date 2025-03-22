document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const userTable = document.getElementById("userTable");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const dob = document.getElementById("dob").value;
        const acceptTerms = document.getElementById("acceptTerms").checked;

        if (!acceptTerms) {
            alert("You must accept the terms and conditions.");
            return;
        }

        // Store user data in localStorage
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push({ name, email, password: "****", dob, acceptTerms: "✔" });
        localStorage.setItem("users", JSON.stringify(users));

        // Refresh table
        displayUsers();
        
        // Clear form fields
        form.reset();
    });

    function displayUsers() {
        userTable.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Dob</th>
                <th>Accepted terms?</th>
            </tr>
        `;

        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.forEach(user => {
            let row = userTable.insertRow();
            row.insertCell(0).textContent = user.name;
            row.insertCell(1).textContent = user.email;
            row.insertCell(2).textContent = "****"; // Always hide password
            row.insertCell(3).textContent = user.dob;
            row.insertCell(4).textContent = user.acceptTerms;
        });
    }

    // Load users when the page loads
    displayUsers();
});
