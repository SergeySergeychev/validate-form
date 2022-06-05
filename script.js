const form = document.getElementById("form");
const password1El = document.getElementById("password1");
const password2El = document.getElementById("password2");
const messageContainer = document.querySelector(".message-container");
const message = document.getElementById("message");
const inputs = Array.from(form.elements).slice(0, 6);

let isValid = false;
let passwordsMatch = false;

function processFormData(e) {
  e.preventDefault();
  // use HTML constrain API to check form validity
  isValid = form.checkValidity();
  // Check to see if both password fields match
  validatePassword();
  // If form is valid and passwords match style message for user and show users info.
  if (isValid && passwordsMatch) {
    // Style main message for success
    styleMsg("Successfully Registred!", "green");
    storeFormData();
  }
}

// Check passwords for equality.
function validatePassword() {
  if (password1El.value === password2El.value) {
    // if they match, set value to true and borders to green
    passwordsMatch = true;
    password1El.style.borderColor = "green";
    password2El.style.borderColor = "green";
  } else {
    // if they don't match, border color of input to red, chnge message
    passwordsMatch = false;
    styleMsg("Make sure passwords match.", "red");
    password1El.style.borderColor = "red";
    password2El.style.borderColor = "red";
    return;
  }
}

// Style Main message
function styleMsg(msg, color) {
  message.textContent = msg;
  message.style.color = color;
  messageContainer.style.borderColor = color;
}
//Store form data in obj. and show it in dev. console
function storeFormData() {
  const user = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    website: form.website.value,
    password: form.password.value,
  };
  // Show user data in console
  console.log(user);
}

// Event Listener
// Respond to form submition.
form.addEventListener("submit", processFormData);
// If one of the filling fields are incorect, provide informative message to user.
inputs.forEach((input) => {
  input.addEventListener("invalid", () => {
    // Style Main message for an error
    const errorMsg = `*${input.previousElementSibling.innerText}* field is incorrect.`;
    styleMsg(errorMsg, "red");
  });
});
