document.addEventListener("DOMContentLoaded", function() {
    const tables = document.querySelectorAll(".table-container");

    // Function to add a class to the schedule
    function addClass(program, day, semester, subject, creditHours, timeSlot, lecturer, location) {
        const tableContainer = document.getElementById(program + "-table");
        const cell = tableContainer.querySelector(`tr:nth-child(${dayIndex(day) + 1}) td:nth-child(${semester + 1})`);

        const classBox = document.createElement("div");
        classBox.classList.add("class-box");
        classBox.innerHTML = `
            <strong>${subject}</strong> (${creditHours} hrs)<br>
            Time: ${timeSlot}<br>
            Lecturer: ${lecturer}<br>
            Location: ${location}
            <div class="actions">
                <button class="button edit" onclick="editClass(this)">Edit</button>
                <button class="button delete" onclick="deleteClass(this)">Delete</button>
            </div>
        `;

        cell.appendChild(classBox);
    }

    // Helper function to get day index for table row placement
    function dayIndex(day) {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        return days.indexOf(day);
    }

    // Edit class details
    window.editClass = function(button) {
        const classBox = button.closest(".class-box");
        const subject = prompt("Enter Subject Name:", classBox.querySelector("strong").textContent);
        const creditHours = prompt("Enter Credit Hours:", classBox.innerHTML.match(/\((\d+) hrs\)/)[1]);
        const timeSlot = prompt("Enter Time Slot (e.g., 9:00AM - 12:00PM):", classBox.innerHTML.match(/Time: (.+)<br>/)[1]);
        const lecturer = prompt("Enter Lecturer Name:", classBox.innerHTML.match(/Lecturer: (.+)<br>/)[1]);
        const location = prompt("Enter Location:", classBox.innerHTML.match(/Location: (.+)/)[1]);

        classBox.innerHTML = `
            <strong>${subject}</strong> (${creditHours} hrs)<br>
            Time: ${timeSlot}<br>
            Lecturer: ${lecturer}<br>
            Location: ${location}
            <div class="actions">
                <button class="button edit" onclick="editClass(this)">Edit</button>
                <button class="button delete" onclick="deleteClass(this)">Delete</button>
            </div>
        `;
    };

    // Delete class
    window.deleteClass = function(button) {
        const classBox = button.closest(".class-box");
        classBox.remove();
    };

    // Filter by day, semester, or lecturer
    document.getElementById("day-filter").addEventListener("change", applyFilters);
    document.getElementById("semester-filter").addEventListener("change", applyFilters);
    document.getElementById("lecturer-filter").addEventListener("input", applyFilters);

    function applyFilters() {
        const dayFilter = document.getElementById("day-filter").value;
        const semesterFilter = document.getElementById("semester-filter").value;
        const lecturerFilter = document.getElementById("lecturer-filter").value.toLowerCase();

        tables.forEach(table => {
            const rows = table.querySelectorAll("tbody tr");
            rows.forEach((row, rowIndex) => {
                const showRow = !dayFilter || dayFilter === ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"][rowIndex];
                row.style.display = showRow ? "" : "none";

                row.querySelectorAll("td").forEach((cell, cellIndex) => {
                    const semesterMatch = !semesterFilter || semesterFilter == cellIndex;
                    cell.querySelectorAll(".class-box").forEach(classBox => {
                        const lecturerMatch = !lecturerFilter || classBox.innerHTML.toLowerCase().includes(lecturerFilter);
                        classBox.style.display = semesterMatch && lecturerMatch ? "" : "none";
                    });
                });
            });
        });
    }

    // Example Usage (to demonstrate initial functionality)
    addClass("game-design", "Monday", 1, "Game Mechanics", 3, "9:00AM - 12:00PM", "Prof. Smith", "Room 101");
    addClass("animation", "Tuesday", 2, "Animation Basics", 4, "1:00PM - 4:00PM", "Dr. Johnson", "Room 202");
});
