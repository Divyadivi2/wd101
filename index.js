document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const tableBody = document.getElementById("userTableBody");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    updateTable();

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const dob = document.getElementById("dob").value;
        const termsAccepted = document.getElementById("terms").checked;

        if (!isValidAge(dob)) {
            alert("Age must be between 18 and 55.");
            return;
        }

        const user = { name, email, password: "****", dob, termsAccepted }; // Mask password
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        updateTable();
        form.reset();
    });

    function updateTable() {
        tableBody.innerHTML = "";
        users.forEach((user, index) => {
            const row = `<tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.password}</td> 
                <td>${user.dob}</td>
                <td>${user.termsAccepted ? "✔" : "❌"}</td> <!-- Better display -->
            </tr>`;
            tableBody.innerHTML += row;
        });
    }

    function isValidAge(dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }
        return age >= 18 && age <= 55;
    }
});
