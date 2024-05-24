import { checkUserDetails } from "./general.js";
import { modData, updateUser, users } from "./bin.js";

const currentUser = checkUserDetails();

const userNameSpans = document.querySelectorAll(".username");

userNameSpans.forEach((userNameSpan) => {
  userNameSpan.textContent = currentUser.userLogins.username;
});

document.querySelector(".useremail").textContent = currentUser.userLogins.email;

document.querySelector(".user-password").textContent = currentUser.userLogins.password;

document.querySelector(".sign-out-btn").addEventListener("click", () => {
  signOut();
});

document.querySelector(".delete-btn").addEventListener("click", () => {
  document.querySelector(".modal-div").classList.add("active");
});

document.querySelector(".delete-btn-modal").addEventListener("click", () => {
  deleteAccount();
});

document.querySelector(".cancel-btn-modal").addEventListener("click", () => {
  document.querySelector(".modal-div").classList.remove("active");
});

async function deleteAccount() {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    if (currentUser.userLogins.username === user.userLogins.username) {
      users.splice(i, 1);

      await modData(users);

      localStorage.removeItem("selham_products")
      localStorage.removeItem("selham_currentUser");
      window.open("index.html", "_self");
    }
  }
}


async function signOut(){
  await updateUser(currentUser);

  localStorage.removeItem("selham_products")
  localStorage.removeItem("selham_currentUser");
  window.open("index.html", "_self");
}