let students = [];

// Constructor (same style as your TaskItem)
function Student(name, marks) {
  this.name = name;
  this.marks = marks;
}

// ADD STUDENT
function addStudent() {
  let name = document.getElementById("name").value.trim();
  let marks = document.getElementById("marks").value;

  if (name === "" || marks === "") {
    alert("Please enter all details!");
    return;
  }

  let newStudent = new Student(name, Number(marks));
  students.push(newStudent);

  document.getElementById("name").value = "";
  document.getElementById("marks").value = "";

  showStudents();
}

// DISPLAY STUDENTS
function showStudents() {
  if (students.length === 0) {
    document.getElementById("studentList").innerHTML = "<li>👎No students added yet!</li>";
    return;
  }

  let list = document.getElementById("studentList");
  list.innerHTML = "";

  students.forEach(function (student, index) {
    let li = document.createElement("li");
    li.innerText = `🎓${student.name} - ${student.marks}`;

    // EDIT BUTTON
    let editBtn = document.createElement("button");
    editBtn.innerText = "✏️";
    editBtn.title = "Edit Student";

    editBtn.onclick = function () {
      editStudent(index);
    };

    // DELETE BUTTON
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "❌";
    deleteBtn.title = "Delete Student";

    deleteBtn.onclick = function () {
      deleteStudent(index);
    };

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

// DELETE STUDENT
function deleteStudent(index) {
  students.splice(index, 1);
  showStudents();
  alert("Student Deleted!");
}

// EDIT STUDENT
function editStudent(index) {
  let newName = prompt("Enter new name:");
  let newMarks = prompt("Enter new marks:");

  if (newName && newMarks) {
    students[index].name = newName;
    students[index].marks = Number(newMarks);
    showStudents();
  }
}

// SEARCH STUDENT
function searchStudent() {
  if (students.length === 0) {
    alert("No students available!");
    return;
  }

  let searchValue = document.getElementById("searchName").value.toLowerCase();

  let result = students.filter((student) =>
    student.name.toLowerCase().includes(searchValue),
  );

  if (result.length === 0) {;
    document.getElementById("studentList").innerHTML = "<li>🔍No matching student found!</li>";
    return;
  }

  let list = document.getElementById("studentList");
  list.innerHTML = "";

  result.forEach(function (student) {
    let li = document.createElement("li");
    li.innerText = `${student.name} - ${student.marks}`;
    list.appendChild(li);
  });
}

// FIND TOPPER
function findTopper() {
  if (students.length === 0) {
    alert("No students available!");
    return;
  }

  let topper = students.reduce(
    (max, student) => (student.marks > max.marks ? student : max), students[0],
  );

  alert(`Topper: ${topper.name} (${topper.marks})`);
}

// FIND AVERAGE
function findAverage() {
  if (students.length === 0) {
    alert("No students available!");
    return;
  }

  let total = students.reduce((sum, student) => sum + student.marks, 0);

  let avg = total / students.length;

  alert(`Average Marks: ${avg.toFixed(2)}`);
}
