
const products = [
  { id: 1, name: "Nike Air Max", brand: "Nike", gender: "men", price: 320000, image: "images/nike1.jpg" },
  { id: 2, name: "Nike Dunk Low", brand: "Nike", gender: "women", price: 280000, image: "images/nike2.jpg" },
  { id: 3, name: "Jordan 1 Retro", brand: "Jordan", gender: "men", price: 450000, image: "images/jordan1.jpg" },
  { id: 4, name: "Jordan Women", brand: "Jordan", gender: "women", price: 390000, image: "images/jordan2.jpg" },
  { id: 5, name: "Under Armour Sport", brand: "Under Armour", gender: "men", price: 250000, image: "images/underarmour1.jpg" },
  { id: 6, name: "Under Armour Women", brand: "Under Armour", gender: "women", price: 230000, image: "images/underarmour2.jpg" }
];

let cart = [];
let currentProducts = [...products];

const money = amount => amount.toLocaleString("en-US") + "₮";

function productCard(product) {
  return `
    <article class="product-card">
      <img src="${product.image}" alt="${product.name}"
           onerror="this.src='https://placehold.co/500x400?text=Sneaker'">
      <h3>${product.name}</h3>
      <p>${product.brand}</p>
      <strong>${money(product.price)}</strong>
      <button onclick="addToCart(${product.id})">Сагсанд нэмэх</button>
    </article>
  `;
}

function renderProducts(list, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = list.length
    ? list.map(productCard).join("")
    : "<p>Бүтээгдэхүүн олдсонгүй.</p>";
}

function showAllProducts() {
  currentProducts = [...products];
  renderProducts(products, "product-list");
}

function showCategory(gender, containerId) {
  const list = products.filter(product => product.gender === gender);
  renderProducts(list, containerId);
}

function selectBrand(brand) {
  currentProducts = products.filter(product => product.brand === brand);
  renderProducts(currentProducts, "product-list");
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

function searchProducts() {
  const keyword = document.getElementById("search-input").value
    .trim()
    .toLowerCase();

  const result = products.filter(product =>
    product.name.toLowerCase().includes(keyword) ||
    product.brand.toLowerCase().includes(keyword)
  );

  currentProducts = result;
  renderProducts(result, "product-list");
}

function toggleSearch() {
  document.getElementById("search-box").classList.toggle("show");
  document.getElementById("search-input").focus();
}

function addToCart(id) {
  const product = products.find(item => item.id === id);
  if (!product) return;

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  document.getElementById("cart-panel").classList.add("open");
  document.getElementById("cart-overlay").classList.add("show");
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function updateCart() {
  const container = document.getElementById("cart-items");
  if (!container) return;

  container.innerHTML = cart.length
    ? cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}"
             onerror="this.src='https://placehold.co/100x100?text=Shoe'">
        <div>
          <h4>${item.name}</h4>
          <p>${money(item.price)} × ${item.quantity}</p>
          <button onclick="removeFromCart(${item.id})">Устгах</button>
        </div>
      </div>
    `).join("")
    : "<p>Таны сагс хоосон байна.</p>";

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  document.getElementById("cart-total").textContent = money(total);

  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = count;
}

function toggleCart() {
  document.getElementById("cart-panel").classList.toggle("open");
  document.getElementById("cart-overlay").classList.toggle("show");
}

function closeCart() {
  document.getElementById("cart-panel").classList.remove("open");
  document.getElementById("cart-overlay").classList.remove("show");
}

function goToPayment() {
  if (cart.length === 0) {
    alert("Таны сагс хоосон байна!");
    return;
  }

  closeCart();
  document.getElementById("payment").scrollIntoView({
    behavior: "smooth"
  });
  alert("Төлбөрийн хэсгээс төлөх аргаа сонгоно уу. Энэ бол туршилтын сайт.");
}

function openLogin() {
  document.getElementById("login-modal").classList.add("show");
}

function closeLogin() {
  document.getElementById("login-modal").classList.remove("show");
}

function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("И-мэйл болон нууц үгээ оруулна уу.");
    return;
  }

  alert("Нэвтрэх хэсгийн загвар амжилттай ажиллалаа. Бодит нэвтрэлтэд сервер шаардлагатай.");
  closeLogin();
}

function register() {
  alert("Бүртгэлийн бодит систем ажиллуулахын тулд сервер болон мэдээллийн сан шаардлагатай.");
}

document.addEventListener("DOMContentLoaded", () => {
  showAllProducts();
  showCategory("men", "men-products");
  showCategory("women", "women-products");
  updateCart();
});
