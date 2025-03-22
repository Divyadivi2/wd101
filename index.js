document.getElementById("register").addEventListener("click", function () {
    console.log("Register button clicked");

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let dob = document.getElementById("dob").value;
    let termsAccepted = document.getElementById("terms").checked;

    console.log("Form Data:", { name, email, password, dob, termsAccepted });

    if (!name || !email || !password || !dob || !termsAccepted) {
        alert("All fields are required, and Terms must be accepted!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    console.log("Existing Users:", users);

    if (users.some(user => user.email === email)) {
        alert("This email is already registered!");
        return;
    }

    let newUser = { name, email, password, dob, acceptedTerms: termsAccepted };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    console.log("New User Added:", newUser);
    alert("Registration successful!");
    displayUsers();
    clearForm();
});
