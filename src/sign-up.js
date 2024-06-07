import { modData, users } from "./bin.js";

let currentUser;

const signUpBtn = document.querySelector(".sign-up-btn");
const emailInput = document.querySelector("#email");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const viewPass = document.querySelector(".view-pw");
const viewImg = document.querySelector(".view-img");
const errorMsg = document.querySelector(".error-msg");

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const usernameRegex = /^\w+/;
const passwordRegex = /^[@$!%*#?&a-zA-Z0-9._-]+$/;

class user {
  constructor(userLogins) {
    this.userLogins = userLogins;
    this.cart = [];
  }
}

class userLogins {
  constructor(email, username, password) {
    this.email = email;
    this.password = password;
    this.username = username;
  }
}

viewPass.addEventListener("click", (e) => {
  e.preventDefault();
  togglePassword(passwordInput, viewImg);
});

signUpBtn.addEventListener("click", (e) => {
  
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

// async function signUserUp() {
//   let state;

//   if (
//     emailRegex.test(emailInput.value) &&
//     usernameRegex.test(username.value) &&
//     passwordRegex.test(passwordInput.value)
//   ) {
//     if (users.length === 0) {
//       state = true;
//     } else {
//       for (const user of users) {
//         if (emailInput.value === user.userLogins.email) {
//           errorMsg.textContent = "E-mail already registered";
//           state = false;
//           break;
//         } else if (usernameInput.value === user.userLogins.username) {
//           errorMsg.textContent = "Username already in use";
//           state = false;
//           break;
//         } else {
//           state = true;
//         }
//       }
//     }

//     if (state) {
//       users.push(
//         new user(
//           new userLogins(
//             emailInput.value,
//             usernameInput.value,
//             passwordInput.value
//           )
//         )
//       );

//       await modData(users);
//       currentUser = new user(
//         new userLogins(
//           emailInput.value,
//           usernameInput.value,
//           passwordInput.value
//         )
//       );

//       localStorage.setItem("selham_currentUser", JSON.stringify(currentUser));
//       window.open("log-in.html", "_self");
//     }
//   } else {
//     errorMsg.textContent = "Invalid input";
//   }
// }
