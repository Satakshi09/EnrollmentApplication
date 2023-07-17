var nameRegex = /^[a-z]+(\s)?[ a-z]+$/i;
var emailRegex = /^([a-z0-9\.-]+)@([a-z0-9-]+)\.([a-z]{2,8})(.[a-z]{2,8})?$/i;
var submitButton = document.getElementById("submit");

function resetForm(skills) {
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("website").value = "";
  document.getElementById("imageLink").value = "";
  document.getElementById("username").classList.remove("border-success");
  document.getElementById("email").classList.remove("border-success");

  for (let i = 0; i < skills.length; i++) {
    if (skills[i].checked && skills[i].value != "Java") {
      skills[i].checked = false;
    }
  }
}

//Validations for name and email fields after finished typing
const form = document.querySelector("#myForm");
let username = form.elements.namedItem("username");
let email = form.elements.namedItem("email");

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

username.addEventListener("input", validate);
email.addEventListener("input", validate);

// add class for invalid username and email fields
function addClassForInputAndEmail(target) {
  target.classList.add("border-danger");
  target.classList.remove("border-success");
}

// remove class for invalid username and email fields
function removeClassForInputAndEmail(target) {
  target.classList.remove("border-danger");
  target.classList.add("border-success");
}

//validation for username and email fields while typing
function validate(event) {
  console.log("event: " + event);
  let target = event.target;
  console.log("event target: " + event.target);
  if (target.name == "username") {
    console.log("event target name: " + event.target.value);
    if (target.value.match(nameRegex) == null) {
      addClassForInputAndEmail(target);
      document.getElementById("invalidUsername").style.visibility = "visible";
      submitButton.disabled = true;
    } else {
      removeClassForInputAndEmail(target);
      document.getElementById("invalidUsername").style.visibility = "hidden";
      submitButton.disabled = false;
    }
  }

  if (target.name == "email") {
    if (target.value.match(emailRegex) == null) {
      addClassForInputAndEmail(target);
      document.getElementById("invalidEmail").style.visibility = "visible";
      submitButton.disabled = true;
    } else {
      removeClassForInputAndEmail(target);
      document.getElementById("invalidEmail").style.visibility = "hidden";
      submitButton.disabled = false;
    }
  }
}

const onSubmit = () => {
  let selectedGender;
  let data = []; //array of objects
  let selectedSkills = [];

  const name = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const website = document.getElementById("website").value;
  const imageLink = document.getElementById("imageLink").value;
  const genders = document.getElementsByName("gender");
  const skills = document.getElementsByName("skills");

  for (let i = 0; i < genders.length; i++) {
    if (genders[i].checked) {
      selectedGender = genders[i].value;
    }
  }

  for (let i = 0; i < skills.length; i++) {
    if (skills[i].checked) {
      selectedSkills.push(skills[i].value);
    }
  }

  data.push({
    name: name,
    email: email,
    website: website,
    imageLink: imageLink,
    gender: selectedGender,
    selectedSkills: [...selectedSkills],
  });

  addRow(data);
  resetForm(skills);
};

const addRow = (data) => {
  console.log(data);
  let table = document.getElementById("tableData");
  let rowCount = table.rows.length;
  let row = table.insertRow(rowCount);

  row.insertCell(0).innerHTML = `<td>
  <ul
    style="
      list-style-type: none;
      font-size: small;
      margin-left: 0;
      padding-left: 0;
      margin-right: 10em;
    "
  >
    <strong><li>${data[0].name}</li></strong>
    <li>${data[0].gender}</li>
    <li>${data[0].email}</li>
    <li>
    <a
      href="https://${data[0].website}"
      target="_blank"
      // rel="noopener noreferrer"
      ><u>${data[0].website}</u>
    </a>
    </li>
    <li>${data[0].selectedSkills.map((selectedSkill) => {
      return `<span>${selectedSkill}</span>`;
    })}
    </li>
  </ul>
</td>`;

  row.insertCell(1).innerHTML = ` <td class="justify-content-center">
<img
  id="studentImage"
  src="${data[0].imageLink}"
  alt="Student"
/>
</td>`;
};
