document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const tableBody = document.querySelector("tbody");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const dob = document.getElementById("dob").value;
        const terms = document.getElementById("terms").checked;

        // Validate all fields are filled
        if (!name || !email || !password || !dob) {
            alert("Please fill in all the fields.");
            return;
        }

        // Validate age (18-55)
        const dobDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }

        if (age < 18 || age > 55) {
            alert("Age must be between 18 and 55 years.");
            return;
        }

        // Append user details to the table
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${email}</td>
            <td>${"*".repeat(password.length)}</td> 
            <td>${dob}</td>
            <td>${terms}</td>
        `;
        tableBody.appendChild(newRow);

        // Store data in localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push({ name, email, password, dob, terms });
        localStorage.setItem("users", JSON.stringify(users));

        // Clear form fields
        form.reset();
    });

    // Load stored users from localStorage
    function loadUsers() {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.forEach(user => {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${"*".repeat(user.password.length)}</td> 
                <td>${user.dob}</td>
                <td>${user.terms}</td>
            `;
            tableBody.appendChild(newRow);
        });
    }
    loadUsers();
});
