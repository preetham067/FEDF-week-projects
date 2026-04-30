let students = [];
let oldVDOM = [];

for (let i = 1; i <= 50; i++) {
  students.push({
    id: i,
    name: "Student " + i,
    present: false
  });
}

function renderTable(data) {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  data.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.present ? "Present" : "Absent"}</td>
      <td>
        <button onclick="loadStudent(${student.id})">Edit</button>
        <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

function clearInputs() {
  document.getElementById("id").value = "";
  document.getElementById("name").value = "";
  document.getElementById("status").value = "true";
}

function addStudent() {
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const present = document.getElementById("status").value === "true";

  if (id === "" || name === "") {
    alert("Enter ID and Name");
    return;
  }

  students.push({
    id: Number(id),
    name: name,
    present: present
  });

  renderTable(students);
  clearInputs();
}

function loadStudent(id) {
  const student = students.find(s => s.id == id);

  document.getElementById("id").value = student.id;
  document.getElementById("name").value = student.name;
  document.getElementById("status").value =
    student.present ? "true" : "false";
}

function updateStudent() {
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const present = document.getElementById("status").value === "true";

  const index = students.findIndex(s => s.id == id);

  if (index !== -1) {
    students[index] = {
      id: Number(id),
      name: name,
      present: present
    };

    renderTable(students);

    setTimeout(() => {
      document.getElementById("tableBody")
        .rows[index]
        .classList.add("updated");
    }, 50);
  }

  clearInputs();
}

function deleteStudent(index) {
  students.splice(index, 1);
  renderTable(students);
}

function updateDOM() {
  console.time("DOM Update");

  const tableBody = document.getElementById("tableBody");

  students.forEach((student, index) => {
    student.present = Math.random() > 0.5;

    const row = tableBody.rows[index];

    if (row) {
      row.cells[2].textContent =
        student.present ? "Present" : "Absent";

      row.classList.add("updated");
    }
  });

  console.timeEnd("DOM Update");
}

function createVDOM(data) {
  return data.map(student => ({
    id: student.id,
    status: student.present ? "Present" : "Absent"
  }));
}

function diff(oldTree, newTree) {
  let changes = [];

  newTree.forEach((newNode, index) => {
    const oldNode = oldTree[index];

    if (!oldNode || oldNode.status !== newNode.status) {
      changes.push({
        index: index,
        status: newNode.status
      });
    }
  });

  return changes;
}

function patchDOM(changes) {
  const tableBody = document.getElementById("tableBody");

  changes.forEach(change => {
    const row = tableBody.rows[change.index];

    if (row) {
      row.cells[2].textContent = change.status;
      row.classList.add("updated");
    }
  });
}

function updateVDOM() {
  console.time("VDOM Update");

  students.forEach(student => {
    student.present = Math.random() > 0.5;
  });

  const newVDOM = createVDOM(students);

  if (oldVDOM.length === 0) {
    oldVDOM = createVDOM(students);
  }

  const changes = diff(oldVDOM, newVDOM);

  patchDOM(changes);

  oldVDOM = newVDOM;

  console.timeEnd("VDOM Update");
}

window.onload = function () {
  renderTable(students);
};