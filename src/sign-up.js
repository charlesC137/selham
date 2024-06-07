import { modData, users } from "./bin.js";

let currentUser;

const signUpBtn = document.querySelector(".sign-up-btn");
const emailInput = document.querySelector("#email");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const viewPass = document.querySelector(".view-pw");
const viewImg = document.querySelector(".view-img");
const errorMsg = document.querySelector(".error-msg");

viewPass.addEventListener("click", (e) => {
  e.preventDefault();
  togglePassword(passwordInput, viewImg);
});

signUpBtn.addEventListener("click", (e) => {
  e.preventDefault();
  signUserUp();
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

async function signUserUp() {
  const response = await fetch("https://api-selham.onrender.com/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: {
      "username": `${usernameInput.value}`,
      "email": `${emailInput.value}`,
      "password": `${passwordInput.value}`,
    },
  });

  console.log(response);
}
