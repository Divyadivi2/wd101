document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registration-form");
    const tableBody = document.querySelector("#data-table tbody");
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    function calculateAge(dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function validateForm(name, email, password, dob, termsChecked) {
        if (!name || !email || !password || !dob || !termsChecked) {
            alert("All fields are required and terms must be accepted.");
            return false;
        }

        const age = calculateAge(dob);
        if (age < 18 || age > 55) {
            alert("Age must be between 18 and 55 years.");
            return false;
        }

        return true;
    }

    function addUserToTable(user) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.dob}</td>
            <td>${user.termsAccepted}</td>
        `;
        tableBody.appendChild(row);
    }

    function saveUser(user) {
        storedUsers.push(user);
        localStorage.setItem("users", JSON.stringify(storedUsers));
    }

    storedUsers.forEach(addUserToTable);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const dob = document.getElementById("dob").value;
        const termsChecked = document.getElementById("terms").checked;

        if (!validateForm(name, email, password, dob, termsChecked)) return;

        const user = {
            name,
            email,
            password,
            dob,
            termsAccepted: termsChecked
        };

        addUserToTable(user);
        saveUser(user);
        form.reset();
    });
});
