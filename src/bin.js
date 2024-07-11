export async function fetchProducts(local_products, callback) {
  try {
    const response = await fetch(
      "https://api-selham.onrender.com/api/products"
    );
    const products = await response.json();

    if (products !== local_products) {
      local_products = products;
      localStorage.setItem("selham_products", JSON.stringify(local_products));
      if (callback) {
        callback(local_products);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export async function saveCart(currentUser) {
  try {
    const response = await fetch(
      "https://api-selham.onrender.com/api/update-cart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: currentUser,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to update cart: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error during cart update:", error);
  }
}

export async function deleteAcctAsync(currentUser) {
  try {
    const response = await fetch("https://api-selham.onrender.com/api/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: currentUser.userLogins.username,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete account: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error during account deletion:", error);
  }
}
