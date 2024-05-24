import { users } from "./bin.js";

let currentUser;

const loginBtn = document.querySelector(".log-in-btn");
const userInput = document.querySelector("#userId");
const passwordInput = document.querySelector("#password");
const viewPass = document.querySelector(".view-pw");
const viewImg = document.querySelector(".view-img");
const errorMsg = document.querySelector(".error-msg");

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const usernameRegex = /^\w+/;
const passwordRegex = /^[@$!%*#?&a-zA-Z0-9._-]+$/;

viewPass.addEventListener("click", (e) => {
  e.preventDefault();
  togglePassword(passwordInput, viewImg);
});

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  logUserIn();
});

function togglePassword(input, img) {
  if (input.type === "password") {
    input.type = "text";
    img.src = "./assets/icons-general/eye-closed.svg";
  } else {
    input.type = "password";
    img.src = "./assets/icons-general/eye-open.svg";
  }
}

function logUserIn() {
  let passwordState;
  let userInputState;

  if (
    (emailRegex.test(userInput.value) || usernameRegex.test(userInput.value)) &&
    passwordRegex.test(passwordInput.value)
  ) {
    if (users.length === 0) {
      window.open("sign-up.html", "_blank");
    } else {
      for (const user of users) {
        if (
          userInput.value === user.userLogins.email ||
          userInput.value === user.userLogins.username
        ) {
          userInputState = true;
          if (passwordInput.value === user.userLogins.password) {
            passwordState = true;
            currentUser = user;
          }
        }
      }
    }
  } else {
    errorMsg.textContent = "Invalid input";
  }

  if (passwordState && userInputState) {
    localStorage.setItem("selham_currentUser", JSON.stringify(currentUser));
    window.open("home.html", "_self");
  } else if (!userInputState) {
    errorMsg.textContent = "User not found";
  } else if (!passwordState) {
    errorMsg.textContent = "Incorrect password";
  }
}
