const currentUser = checkUserDetails();

export let cart = currentUser.cart


export function saveToLocal(){
  localStorage.setItem('selham_currentUser', JSON.stringify(currentUser))
}

export function checkUserDetails() {
  if (!localStorage.getItem("selham_currentUser")) {
    window.open("index.html", "_self");
  } else {
    const currentUser = JSON.parse(localStorage.getItem("selham_currentUser"));
    console.log
    return currentUser;
  }
}

export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}

export function getCartItemQuantity() {
  if (cart.length === 0) {
    return "";
  } else {
    let quantity = 0;

    for (const item of cart) {
      quantity += item.quantity;
    }
    return quantity;
  }
}

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}