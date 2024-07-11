import { saveCart } from "./bin.js";
import {
  checkUserDetails,
  cart,
  formatCurrency,
  getCartItemQuantity,
  getDeliveryOption,
  saveToLocal,
} from "./general.js";

import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

const currentUser = checkUserDetails();
const today = dayjs();

renderCartPage();

async function renderCartPage() {
  let html = "";

  for (const item of cart) {
    html += `
    <div class="cart-item-container js-container-${item.currentProduct._id}">
    <div class="delivery-date">Delivery date: </div>

    <div class="cart-item-details-grid js-cart-item-details-grid-${
      item.currentProduct._id
    }">
      <img class="product-image" src="${item.currentProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${item.currentProduct.name}
        </div>
        <div class="product-price">$${formatCurrency(
          item.currentProduct.priceCents
        )}</div>
        <div class="product-quantity">
          <span> Quantity: <span class="quantity-label">${
            item.quantity
          }</span> </span>
         <div class="update_delete-btns js-btns-${item.currentProduct._id}">
          <button class="update-quantity-btn" data-id="${
            item.currentProduct._id
          }">
            Update
          </button>
          
          <button class="delete-item-btn" data-id="${item.currentProduct._id}">
            Delete
          </button>
         </div>

         <div class="update-item-div js-mod-${item.currentProduct._id}">
          <input class="update-quantity-input" type="number" max="10" min="1">
          <button data-id="${item.currentProduct._id}">
            <img src="./assets/icons-general/checkmark.png" alt="done">
          </button>
         </div>
        </div>

        <p class="error-msg"></p>
      </div>
    </div>
  </div>
    `;
  }

  document.querySelector(".order-summary").innerHTML = html;

  for (const item of cart) {
    renderDelivBtns(item);
  }

  itemsNumDisplay();
  renderOrderSummary();
  deleteBtns();
  updateBtns();

  await saveCart(currentUser);
}

function renderDelivBtns(item) {
  let html = `
 <div class="delivery-options js-delivery-options-${item.currentProduct._id}">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>

  <div class="delivery-option js-delivery-option" data-product-id="${
    item.currentProduct._id
  }">
  <input type="radio" class="delivery-option-input" name="delivery-option-${
    item.currentProduct._id
  }" data-delivery-option-id="1">
  <div>
    <div class="delivery-option-date">
    ${getDate("1")}
    </div>
    <div class="delivery-option-price">
      FREE Shipping
    </div>
  </div>
</div>

<div class="delivery-option js-delivery-option" data-product-id="${
    item.currentProduct._id
  }">
  <input type="radio" class="delivery-option-input" name="delivery-option-${
    item.currentProduct._id
  }" data-delivery-option-id="2">
  <div>
    <div class="delivery-option-date">
    ${getDate("2")}
    </div>
    <div class="delivery-option-price">
      $4.99 - Shipping
    </div>
  </div>
</div>

<div class="delivery-option js-delivery-option" data-product-id="${
    item.currentProduct._id
  }">
  <input type="radio" class="delivery-option-input" name="delivery-option-${
    item.currentProduct._id
  }" data-delivery-option-id="3">
  <div>
    <div class="delivery-option-date">
      ${getDate("3")}
    </div>
    <div class="delivery-option-price">
      $9.99 - Shipping
    </div>
  </div>
</div>
</div>`;

  document.querySelector(
    `.js-cart-item-details-grid-${item.currentProduct._id}`
  ).innerHTML += html;

  document
    .querySelectorAll(`.js-delivery-options-${item.currentProduct._id} input`)
    .forEach((btn) => {
      const id = btn.dataset.deliveryOptionId;

      if (id === item.deliveryOptionId) {
        btn.checked = true;
      }

      btn.addEventListener("click", (e) => {
        delivOptBtns(item.currentProduct._id, id);
        document.querySelector(
          `.js-container-${item.currentProduct._id} .delivery-date`
        ).textContent = `Delivery date: ${
          e.target.parentElement.querySelector(".delivery-option-date")
            .textContent
        }`;

        renderOrderSummary();
      });
    });

  getDelivDate(item.currentProduct._id);
}

function renderOrderSummary() {
  let itemsPrice = 0;
  let shipping = 0;
  let beforetax = 0;
  let tax = 0;
  let total = 0;

  for (const item of cart) {
    itemsPrice += item.currentProduct.priceCents * item.quantity;
    shipping += getDeliveryOption(item.deliveryOptionId).priceCents;
  }

  beforetax += itemsPrice + shipping;
  tax = 0.1 * beforetax;
  total = beforetax + tax;

  document.querySelector(".payment-summary").innerHTML = `
  <div class="payment-summary-title">Order Summary</div>

  <div class="payment-summary-row">
    <div>Items (<span>${getCartItemQuantity()}</span>):</div>
    <div class="payment-summary-money">$${formatCurrency(itemsPrice)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${formatCurrency(shipping)}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${formatCurrency(beforetax)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${formatCurrency(tax)}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${formatCurrency(total)}</div>
  </div>

  <button class="place-order-button button-primary">Place your order</button>
  `;

  placeOrderBtn();
}

function itemsNumDisplay() {
  const itemNum = getCartItemQuantity();
  const itemsNumDiv = document.querySelector(".items-no");
  if (!itemNum) {
    itemsNumDiv.textContent = "0 items";
  } else if (itemNum === 1) {
    itemsNumDiv.textContent = "1 item";
  } else {
    itemsNumDiv.textContent = `${itemNum} items`;
  }
}

function deleteBtns() {
  document.querySelectorAll(".delete-item-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;

      for (let i = 0; i < cart.length; i++) {
        const item = cart[i];

        if (item.currentProduct._id === id) {
          cart.splice(i, 1);
          saveToLocal();
          renderCartPage();
          break;
        }
      }
    });
  });
}

function updateBtns() {
  document.querySelectorAll(".update-quantity-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;

      document.querySelector(`.js-mod-${id}`).classList.add("u-i-d-show");
      document.querySelector(`.js-btns-${id}`).classList.add("u_d-b-hide");
      updateQuantity(id);
    });
  });
}

function updateQuantity(id) {
  document.querySelectorAll(`.js-mod-${id} button`).forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = parseInt(
        document.querySelector(`.js-mod-${id} input`).value
      );

      if (input && input <= 10) {
        for (let i = 0; i < cart.length; i++) {
          const item = cart[i];

          if (item.currentProduct._id === id) {
            item.quantity = input;
            renderCartPage();
            break;
          }
        }
      } else if (input === 0) {
        for (let i = 0; i < cart.length; i++) {
          const item = cart[i];

          if (item.currentProduct._id === id) {
            cart.splice(i, 1);
            renderCartPage();
            break;
          }
        }
      } else {
        document.querySelector(`.js-container-${id} .error-msg`).textContent =
          "Input value from 1 - 10";
      }
      saveToLocal();
    });
  });
}

function delivOptBtns(cartId, btnId) {
  for (const item of cart) {
    if (item.currentProduct._id === cartId) {
      item.deliveryOptionId = btnId;
      saveToLocal();
      break;
    }
  }
}

function getDate(id) {
  const deliveryOptionObj = getDeliveryOption(id);
  const deliveryDays = deliveryOptionObj.deliveryDays;
  const deliveryDate = today.add(deliveryDays, "days");
  const dateString = deliveryDate.format("dddd, MMMM D");

  return dateString;
}

function getDelivDate(id) {
  const inputs = document.querySelectorAll(`.js-delivery-options-${id} input`);

  for (const input of inputs) {
    if (input.checked == true) {
      document.querySelector(
        `.js-container-${id} .delivery-date`
      ).textContent = `Delivery date: ${
        input.parentElement.querySelector(".delivery-option-date").textContent
      }`;
      break;
    }
  }
}

function placeOrderBtn() {
  document
    .querySelector(".place-order-button")
    .addEventListener("click", () => {
      if (cart.length > 0) {
        cart.splice(0, cart.length);
        saveToLocal();
        window.open("done.html", "_self");
      }
    });
}
