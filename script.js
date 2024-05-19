const cartButton = document.querySelector(".cart-button");
const cartBadge = document.querySelector(".cart-badge");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".close");
const buyButton = document.querySelector(".buy-btn");
const clearButton = document.querySelector(".clear-btn");
const cartItemsList = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const itemsGrid = document.querySelector(".items-grid");

let items = [
  { id: 1, name: "Apple", price: 0.99 },
  { id: 2, name: "Banana", price: 10 },
];

let cart = [];

function fillItemsGrid() {
  for (const item of items) {
    let itemElement = document.createElement("div");
    itemElement.classList.add("item");
    itemElement.innerHTML = `
            <img src="https://picsum.photos/200/300?random=${item.id}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <button class="add-to-cart-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">Add to cart</button>
        `;
    itemsGrid.appendChild(itemElement);
  }

  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      addToCart(this.dataset.id, this.dataset.name, this.dataset.price);
    });
  });
}

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function addToCart(id, name, price) {
  let cartItem = cart.find((item) => item.id == id);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ id, name, price: parseFloat(price), quantity: 1 });
  }

  updateCartDisplay();
  updateCartBadge();
  updateCartTotal();
}

function removeFromCart(id) {
  let cartItem = cart.find((item) => item.id == id);
  if (cartItem) {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
    } else {
      cart = cart.filter((item) => item.id != id);
    }
  }

  updateCartDisplay();
  updateCartBadge();
  updateCartTotal();
}

function buy() {
  if (cart.length === 0) {
    alert("Your cart is empty. Add some items before purchasing.");
    return;
  }

  alert("Purchase successful! Thank you for your purchase.");

  cart = [];
  updateCartDisplay();
  updateCartBadge();
  updateCartTotal();

  toggleModal();
}

function clearCart() {
  cart = [];
  updateCartDisplay();
  updateCartBadge();
  updateCartTotal();
}

function removeAll(id) {
  cart = cart.filter((item) => item.id != id);
  updateCartDisplay();
  updateCartBadge();
  updateCartTotal();
}

function updateCartDisplay() {
  cartItemsList.innerHTML = "";

  for (const item of cart) {
    let itemElement = document.createElement("div");
    itemElement.classList.add("itemCart");
    itemElement.innerHTML = `
    <div class= "modal-item">
            <img src="https://picsum.photos/200/300?random=${item.id}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <div>
            <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>
            <button class="remove-all-btn" data-id="${item.id}">Remove all</button>
            </div></div>`;
    cartItemsList.appendChild(itemElement);
  }

  const removeFromCartButtons = document.querySelectorAll(
    ".remove-from-cart-btn"
  );
  const removeAllFromCartButtons = document.querySelectorAll(".remove-all-btn");
  removeFromCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      removeFromCart(this.dataset.id);
    });
  });
  removeAllFromCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      removeAll(this.dataset.id);
    });
  });
}

function updateCartBadge() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.textContent = totalQuantity;
}

function updateCartTotal() {
  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

fillItemsGrid();

cartButton.addEventListener("click", toggleModal);
modalClose.addEventListener("click", toggleModal);
buyButton.addEventListener("click", buy);
clearButton.addEventListener("click", clearCart);
