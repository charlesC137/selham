const loginBtn = document.querySelector(".log-in-btn");
const userInput = document.querySelector("#userId");
const passwordInput = document.querySelector("#password");
const viewPass = document.querySelector(".view-pw");
const viewImg = document.querySelector(".view-img");
const errorMsg = document.querySelector(".error-msg");

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

async function logUserIn() {
  if (!userInput.value || !passwordInput.value) {
    errorMsg.textContent = "Please fill out all fields.";
    return;
  }

  try {
    const response = await fetch("https://api-selham.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userInput: userInput.value,
        password: passwordInput.value,
      })
    });

    const state = await response.json()
    console.log(state)

    if(!state.users){
      window.open(`${state.signUpUrl}`, "_self")
    }
     
    if (state.isValid){
      localStorage.setItem("selham_currentUser", JSON.stringify(state.loggedUser))
      window.open(`${state.redirectUrl}`, "_self")
    }
    
    errorMsg.textContent = state.errorMsg;

  } catch (error) {
    console.error(error);
    errorMsg.textContent = "An error occurred. Please try again later.";
  }
}
