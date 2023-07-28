// Sample product data (modify as needed)
const products = [
  {
    productId: 1,
    name: "Urban Madness",
    price: 9.99,
    quantity: 5, // Set initial quantity for testing purposes
    image: "../src/images/product1.jpg",
  },
  {
    productId: 2,
    name: "Anywhere USA",
    price: 9.99,
    quantity: 3, // Set initial quantity for testing purposes
    image: "../src/images/product2.jpg",
  },
  {
    productId: 3,
    name: "Zen Valley",
    price: 8.99,
    quantity: 2, // Set initial quantity for testing purposes
    image: "../src/images/product3.jpg",
  },
];

let cart = []; // Initialize an empty cart

// Function to add a product to the cart
function addProductToCart(productId) {
  const product = products.find((item) => item.productId === productId);

  if (product) {
    const cartItem = cart.find((item) => item.productId === productId);

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.push({
        productId: product.productId,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }
  }

  updateProductQuantity(productId); // Update the product quantity in the HTML
  updateCartUI(); // Update the cart UI after adding a product
}

// Function to increase the quantity of a product in the cart
function increaseQuantity(productId) {
  const cartItem = cart.find((item) => item.productId === productId);
  const product = products.find((item) => item.productId === productId);

  if (cartItem && product) {
    if (product.quantity > cartItem.quantity) {
      cartItem.quantity += 1;
    }
  }

  updateProductQuantity(productId); // Update the product quantity in the HTML
  updateCartUI(); // Update the cart UI after increasing the quantity
}

// Function to decrease the quantity of a product in the cart
function decreaseQuantity(productId) {
  const cartItem = cart.find((item) => item.productId === productId);

  if (cartItem) {
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    } else {
      removeProductFromCart(productId);
    }
  }

  updateProductQuantity(productId); // Update the product quantity in the HTML
  updateCartUI(); // Update the cart UI after decreasing the quantity or removing the item
}

// Function to remove a product from the cart
function removeProductFromCart(productId) {
  cart = cart.filter((item) => item.productId !== productId);

  updateProductQuantity(productId); // Update the product quantity in the HTML
  updateCartUI(); // Update the cart UI after removing the product
}

// Function to clear all items from the cart
function clearCart() {
  cart = [];
  updateCartUI(); // Call a function to update the cart UI to show an empty cart
}

// Function to calculate the total cost of items in the cart
function cartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Function to handle payment and calculate the remaining balance
function handlePayment() {
  const amount = parseFloat(document.getElementById("amount").value);
  const totalAmount = cartTotal();
  const remainingBalance = amount - totalAmount;

  // Update the remaining balance
  document.getElementById("remaining-balance").textContent = remainingBalance.toFixed(2);
}

// Function to update the product quantity in the HTML
function updateProductQuantity(productId) {
  const cartItem = cart.find((item) => item.productId === productId);

  if (cartItem) {
    const quantityElement = document.getElementById(`quantity-${productId}`);
    quantityElement.textContent = cartItem.quantity;
  }
}

// Function to update the cart UI
function updateCartUI() {
  const cartList = document.getElementById("cart-list");
  const cartTotalElement = document.getElementById("cart-total");

  // Clear the cart list
  cartList.innerHTML = "";

  // Populate the cart list with items
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - Quantity: ${item.quantity}`;
    cartList.appendChild(li);
  });

  // Update the cart total
  const total = cartTotal().toFixed(2);
  cartTotalElement.textContent = total;
}

// Export the functions and variables needed for testing
module.exports = {
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  clearCart,
  cartTotal,
  pay: handlePayment, // Export handlePayment as pay
};
