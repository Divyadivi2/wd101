document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const entriesTable = document.getElementById("entriesTable");

    function getEntries() {
        let entries = localStorage.getItem("user-entries");
        return entries ? JSON.parse(entries) : [];
    }

    function saveEntries(entries) {
        localStorage.setItem("user-entries", JSON.stringify(entries));
    }

    function displayEntries() {
        let entries = getEntries();
        entriesTable.innerHTML = "";
        entries.forEach((entry, index) => {
            let row = `<tr>
                <td>${entry.name}</td>
                <td>${entry.email}</td>
                <td>${entry.password}</td>
                <td>${entry.dob}</td>
                <td>${entry.terms ? "true" : "false"}</td>
            </tr>`;
            entriesTable.innerHTML += row;
        });
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let entry = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            dob: document.getElementById("dob").value,
            terms: document.getElementById("terms").checked
        };

        let entries = getEntries();
        entries.push(entry);
        saveEntries(entries);
        displayEntries();
        form.reset();
    });

    displayEntries();
});
