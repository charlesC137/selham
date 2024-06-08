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

export let categoryArray = [
  {
    src: "./assets/category-icons/all.svg",
    filter: 'all',
    pText: 'All'
  },
  {
    src: "./assets/category-icons/appliance.svg",
    filter: 'appliance',
    pText: 'Appliance'
  },
  {
    src: "./assets/category-icons/babyproducts.svg",
    filter: 'babyproducts',
    pText: 'Baby Products'
  },
  {
    src: "./assets/category-icons/computing.svg",
    filter: 'computing',
    pText: 'Computing'
  },
  {
    src: "./assets/category-icons/supermarket.svg",
    filter: 'supermarket',
    pText: 'Supermarket'
  },
  {
    src: "./assets/category-icons/electronics.svg",
    filter: 'electronics',
    pText: 'Electronics'
  },
  {
    src: "./assets/category-icons/gaming.svg",
    filter: 'gaming',
    pText: 'Gaming'
  },
  {
    src: "./assets/category-icons/health.svg",
    filter: 'health',
    pText: 'Health'
  },
  {
    src: "./assets/category-icons/menfashion.svg",
    filter: 'menfashion',
    pText: `Men's Fashion`
  },
  {
    src: "./assets/category-icons/phone.svg",
    filter: 'phones',
    pText: 'Phones'
  },
  {
    src: "./assets/category-icons/womenfashion.svg",
    filter: 'womenfashion',
    pText: `Women's Fashion`
  },
]