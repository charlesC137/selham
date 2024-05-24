export let users;
export let products;

export function fetchData(data) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          resolve(req.responseText);
        } else {
          reject(new Error(`Request failed with status: ${req.status}`));
        }
      }
    };

    req.onerror = () => {
      reject(new Error("Request failed"));
    };

    req.open(
      "GET",
      `https://api.jsonbin.io/v3/b/${data}/latest`,
      true
    );
    req.setRequestHeader(
      "X-Master-Key",
      "$2a$10$zzHRoO0rpEizvh1KwJy0l.QWnqxj8WlnyDqgPEQ6lN37khZQMTMQm"
    );
    req.send();
  });
}

async function fetchUsersAsync() {
  try {
    const responsejson = await fetchData('66460364e41b4d34e4f4a954');
    const response = JSON.parse(responsejson);
    users = response.record;
  } catch (error) {
    console.error(error);
  }
}

export async function modData(data) {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        if (req.status >= 200 && req.status < 300) {
          resolve(req.responseText);
        } else {
          reject(new Error(`Request failed with status ${req.status}`));
        }
      }
    };

    req.open(
      "PUT",
      "https://api.jsonbin.io/v3/b/66460364e41b4d34e4f4a954",
      true
    );
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader(
      "X-Master-Key",
      "$2a$10$zzHRoO0rpEizvh1KwJy0l.QWnqxj8WlnyDqgPEQ6lN37khZQMTMQm"
    );
    req.send(`${JSON.stringify(data)}`);
  });
}

export async function updateUser(update){
  for(let user of users ){
    if(user.userLogins.username === update.userLogins.username){
      user.cart = update.cart;
      await modData(users);
      break;
    }
  }
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

fetchUsersAsync();
