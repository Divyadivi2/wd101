document.addEventListener("DOMContentLoaded", () => {
    displayEntries(); // Load existing entries on page load
});

document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from reloading page

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let terms = document.getElementById("terms").checked;

    // Validate form
    if (!terms) {
        alert("You must accept the terms & conditions!");
        return;
    }

    let entry = { name, email, password, dob, terms };
    
    let entries = JSON.parse(localStorage.getItem("user-entries")) || [];
    entries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(entries));

    displayEntries();
});

function displayEntries() {
    let entriesTable = document.getElementById("entriesTable");
    let entries = JSON.parse(localStorage.getItem("user-entries")) || [];

    entriesTable.innerHTML = ""; // Clear table before adding new rows

    entries.forEach((entry) => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.password}</td>
            <td>${entry.dob}</td>
            <td>${entry.terms ? "✔️" : "❌"}</td>
        `;

        entriesTable.appendChild(row);
    });
}
