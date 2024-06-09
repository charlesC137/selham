import {
  checkUserDetails,
  formatCurrency,
  cart,
  getCartItemQuantity,
  saveToLocal,
  categoryArray,
} from "./general.js";

import { fetchProducts, saveCart } from "./bin.js";

let products = JSON.parse(localStorage.getItem("selham_products")) || [];

const currentUser = checkUserDetails();
renderCategoryHtml();
renderHomePage(products)
fetchProducts(products, renderHomePage)

class cartItem {
  constructor(currentProduct, quantity) {
    this.quantity = quantity;
    this.currentProduct = currentProduct;
    this.deliveryOptionId = "1";
  }
}

document.querySelector(".username").textContent =
currentUser.userLogins.username;

document.querySelector(".cart-items-no").textContent = getCartItemQuantity();

document.querySelector(".search-btn-top").addEventListener("click", () => {
  document.querySelector(".search-div").classList.add("active");
});

document.querySelectorAll(".close-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".search-div").classList.remove("active");
    document.querySelector(".sidebar").classList.remove("show");
  });
});

document.querySelector(".menu-btn").addEventListener("click", () => {
  document.querySelector(".sidebar").classList.add("show");
});

document.querySelector(".cat-down-btn").addEventListener("click", () => {
  document.querySelectorAll(".cat-btns").forEach((btn) => {
    btn.classList.toggle("cat-div-hide");
  });
});

document.querySelector(".search-btn").addEventListener("click", () => {
    searchBarFunc();
});

document.querySelector(".search-bar").addEventListener("keyup", () => {
  searchBarFunc();
});

async function renderHomePage(array) {
  let homeHtml = "";
  
  for (const item of array) {
    homeHtml += `
    <div class="product-container">
    <div class="product-image-container">
    <img
          class="product-image"
          src="${item.image}"
        />
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${item.name}
      </div>

      <div class="product-rating-container">
        <img
          class="product-rating-stars"
          src="assets/ratings/rating-${item.rating.stars * 10}.png"
        />
        <div class="product-rating-count link-primary">${
          item.rating.count
        }</div>
      </div>

      <div class="product-price">$${formatCurrency(item.priceCents)}</div>

      <div class="product-quantity-container">
        <select class="select-${item.id}">
          <option selected="" value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-${item.id}">
        <img src="assets/icons-general/checkmark.png" />
        Added
      </div>

      <button class="add-to-cart-button button-primary" data-product-id="${
        item.id
      }">
        Add to Cart
      </button>
    </div>
   
   `;
  }

  document.querySelector(".products-grid").innerHTML = homeHtml;
  addToCartBtn();
  await saveCart(currentUser);
}

function renderCategoryHtml() {
  let categoryHtml = "";

  for (const category of categoryArray) {
    categoryHtml += `
    <button class="cat-btns" data-filter="${category.filter}">
      <img src="${category.src}" alt="${category.filter}" />
      <p>${category.pText}</p>
    </button>
    `;
  }

  document.querySelector(".category-div").innerHTML += categoryHtml;
  categoryBtns();
}

function addToCartBtn() {
  document.querySelectorAll(".add-to-cart-button").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.productId;
      let matchingProduct;
      const quantity = parseInt(document.querySelector(`.select-${id}`).value);

      const currentProduct = products.find((product) => {
        return product.id === id
      })

      if (cart.length === 0) {
        cart.unshift(new cartItem(currentProduct, quantity));
      } else {
        matchingProduct = false;
        for (const item of cart) {
          console.log(item)
          if (item.currentProduct.id === id) {
            matchingProduct = true;
            item.quantity += quantity;
            break;
          }
        }

        if (!matchingProduct) {
          cart.unshift(new cartItem(currentProduct, quantity));
        }
      }

      document.querySelector(".cart-items-no").textContent =
        getCartItemQuantity();
      const addedDiv = document.querySelector(`.js-added-${id}`);
      addedDiv.classList.add("added-to-cart-visible");
      saveToLocal();

      setTimeout(() => {
        addedDiv.classList.remove("added-to-cart-visible");
      }, 1500);
    });
  });
}

function categoryBtns() {
  document.querySelectorAll(".cat-btns").forEach((btn) => {
    btn.addEventListener("click", () => {
      const param = btn.dataset.filter;
      const newArray =
        param === "all"
          ? products
          : products.filter((product) => {
              return product.filters.includes(param);
            });

      if (newArray.length > 0) {
        renderHomePage(newArray);
      } else {
        document.querySelector(".products-grid").innerHTML = `
        <div class="no-item-div">
          <p class="no-item-p">No item to display</p>
        </div>  
          `;
      }
      document.querySelector(".sidebar").classList.remove("show");
    });
  });
}

function searchBarFunc() {
  const searchBarVal = document.querySelector(".search-bar").value.toLowerCase();
    let newArray;
    if (searchBarVal) {
      newArray = products.filter((product) => {
        return (product.name.toLowerCase()).includes(searchBarVal);
      });
      
      if (newArray.length > 0) {
        renderHomePage(newArray);
      } else {
        document.querySelector(".products-grid").innerHTML = `
        <div class="no-item-div">
          <p class="no-item-p">No item to display</p>
        </div>  
          `;
      }
    } else{
      renderHomePage(products);
    }
}


