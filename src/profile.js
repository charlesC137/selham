import { checkUserDetails, clearFromLocal } from "./general.js";
import { deleteAcctAsync, saveCart } from "./bin.js";

const currentUser = checkUserDetails();

const userNameSpans = document.querySelectorAll(".username");

userNameSpans.forEach((userNameSpan) => {
  userNameSpan.textContent = currentUser.userLogins.username;
});

document.querySelector(".useremail").textContent = currentUser.userLogins.email;

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
  await deleteAcctAsync(currentUser);
  clearFromLocal();
}

async function signOut() {
  await saveCart(currentUser);
  clearFromLocal();
}
