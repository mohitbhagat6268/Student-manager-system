let students = JSON.parse(localStorage.getItem("students")) || [];

function saveStudent() {
    let id = document.getElementById("studentId").value;
    let name = document.getElementById("name").value.trim();
    let marks = document.getElementById("marks").value;

    if (name === "" || marks === "") {
        alert("⚠️ Please fill all fields!");
        return;
    }

    marks = Number(marks);

    if (marks < 0 || marks > 100) {
        alert("⚠️ Marks should be between 0 and 100");
        return;
    }

    if (id) {
        students = students.map(s =>
            s.id == id ? { id: Number(id), name, marks } : s
        );
    } else {
        students.push({
            id: Date.now(),
            name,
            marks
        });
    }

    updateStorage();
    clearForm();
    displayStudents();
}

function displayStudents(list = students) {
    let container = document.getElementById("studentContainer");

    if (list.length === 0) {
        container.innerHTML = `<p>No students found 😕</p>`;
        return;
    }

    container.innerHTML = list.map(student => `
        <div class="card">
            <h3>${student.name}</h3>
            <p>Marks: ${student.marks}</p>
            <p>Grade: ${getGrade(student.marks)}</p>

            <button onclick="editStudent(${student.id})">Edit</button>
            <button onclick="deleteStudent(${student.id})">Delete</button>
        </div>
    `).join("");
}

function deleteStudent(id) {
    if (!confirm("Are you sure you want to delete?")) return;

    students = students.filter(s => s.id !== id);
    updateStorage();
    displayStudents();
}

function editStudent(id) {
    let student = students.find(s => s.id === id);

    document.getElementById("studentId").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("marks").value = student.marks;
}

function searchStudent() {
    let value = document.getElementById("search").value.toLowerCase();

    let filtered = students.filter(s =>
        s.name.toLowerCase().includes(value)
    );

    displayStudents(filtered);
}

function findTopper() {
    if (students.length === 0) return;

    let topper = students.reduce((max, s) =>
        s.marks > max.marks ? s : max
    );

    document.getElementById("result").innerText =
        `🏆 Topper: ${topper.name} (${topper.marks})`;
}

function findAverage() {
    if (students.length === 0) return;

    let total = students.reduce((sum, s) => sum + s.marks, 0);
    let avg = (total / students.length).toFixed(2);

    document.getElementById("result").innerText =
        `📊 Average Marks: ${avg}`;
}

function sortStudents() {
    students.sort((a, b) => b.marks - a.marks);
    displayStudents();
}

function getGrade(marks) {
    if (marks >= 90) return "A 🟢";
    if (marks >= 75) return "B 🔵";
    if (marks >= 50) return "C 🟡";
    return "D 🔴";
}

function updateStorage() {
    localStorage.setItem("students", JSON.stringify(students));
}

function clearForm() {
    document.getElementById("studentId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("marks").value = "";
}

displayStudents();
