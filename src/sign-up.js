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
  if (!usernameInput.value || !emailInput.value || !passwordInput.value) {
    errorMsg.textContent = "Please fill out all fields.";
    return;
  }

  try {
    const response = await fetch("https://api-selham.onrender.com/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      })
    });

    const state = await response.json()

    if(state.isValid){
      window.open(`${state.redirectUrl}`, "_self")
    }
    
    errorMsg.textContent = state.errorMsg;

  } catch (error) {
    console.error(error);
    errorMsg.textContent = "An error occurred. Please try again later.";
  }
}
