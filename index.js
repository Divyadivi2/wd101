document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded successfully!");

    document.getElementById("register").addEventListener("click", function (event) {
        event.preventDefault(); // Prevent form from refreshing the page

        console.log("Register button clicked");

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();
        let dob = document.getElementById("dob").value;
        let termsAccepted = document.getElementById("terms").checked;

        console.log("Form Data:", { name, email, password, dob, termsAccepted });

        // Validate Inputs
        if (!name || !email || !password || !dob || !termsAccepted) {
            alert("All fields are required, and you must accept the Terms & Conditions!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        console.log("Existing Users Before Registration:", users);

        // Check for duplicate email
        if (users.some(user => user.email === email)) {
            alert("This email is already registered!");
            return;
        }

        // Save New User
        let newUser = { name, email, password, dob, acceptedTerms: termsAccepted };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        console.log("New User Registered:", newUser);
        alert("Registration successful!");

        displayUsers();
        clearForm();
    });

    function displayUsers() {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let tableBody = document.getElementById("userTableBody");
        tableBody.innerHTML = "";

        users.forEach(user => {
            let row = `<tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>****</td>
                <td>${user.dob}</td>
                <td>${user.acceptedTerms ? "✔️" : "❌"}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });

        console.log("Users Displayed:", users);
    }

    function clearForm() {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("dob").value = "";
        document.getElementById("terms").checked = false;
    }

    displayUsers();
});
