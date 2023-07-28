// Import the functions to be tested
const {
    addProductToCart,
    increaseQuantity,
    decreaseQuantity,
    removeProductFromCart,
    clearCart,
    cartTotal,
    pay,
  } = require("./script");
  
  // Test addProductToCart function
  test("addProductToCart should add a product to the cart", () => {
    addProductToCart(1);
    addProductToCart(2);
    addProductToCart(3);
  
    expect(cart.length).toBe(3);
    expect(cart[0].quantity).toBe(1);
    expect(cart[1].quantity).toBe(1);
    expect(cart[2].quantity).toBe(1);
  });
  
  // Test increaseQuantity function
  test("increaseQuantity should increase product quantity in the cart", () => {
    increaseQuantity(1);
    increaseQuantity(2);
    increaseQuantity(3);
  
    expect(cart[0].quantity).toBe(2);
    expect(cart[1].quantity).toBe(2);
    expect(cart[2].quantity).toBe(2);
  });
  
  // Test decreaseQuantity function
  test("decreaseQuantity should decrease product quantity in the cart", () => {
    decreaseQuantity(1);
    decreaseQuantity(2);
    decreaseQuantity(3);
  
    expect(cart[0].quantity).toBe(1);
    expect(cart[1].quantity).toBe(1);
    expect(cart[2].quantity).toBe(1);
  });
  
  // Test removeProductFromCart function
  test("removeProductFromCart should remove a product from the cart", () => {
    removeProductFromCart(1);
  
    expect(cart.length).toBe(2);
    expect(cart.some(item => item.productId === 1)).toBe(false);
  });
  
  // Test clearCart function
  test("clearCart should clear all items from the cart", () => {
    clearCart();
  
    expect(cart.length).toBe(0);
  });
  
  // Test cartTotal function
  test("cartTotal should calculate the total cost of items in the cart", () => {
    addProductToCart(1);
    addProductToCart(2);
    addProductToCart(3);
  
    expect(cartTotal()).toBeCloseTo(28.96, 2);
  });
  
  // Test pay function
  test("pay should update the remaining balance after payment", () => {
    addProductToCart(1);
    addProductToCart(2);
    addProductToCart(3);
  
    // Simulate payment of $30
    pay(30);
  
    expect(parseFloat(document.getElementById("remaining-balance").textContent)).toBeCloseTo(1.04, 2);
  });
  
  // Test pay function with insufficient amount
  test("pay should show negative remaining balance if the amount is insufficient", () => {
    addProductToCart(1);
    addProductToCart(2);
    addProductToCart(3);
  
    // Simulate payment of $20
    pay(20);
  
    expect(parseFloat(document.getElementById("remaining-balance").textContent)).toBeCloseTo(-8.96, 2);
  });    