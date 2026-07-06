console.log("เชื่อมต่อ Java script สำเร็จแล้ว");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function performSearch() {
  const keyword = searchInput.value.trim().toLowerCase();
  filterFoodCards(keyword);
}

searchBtn.addEventListener("click", () => {
  performSearch();
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    performSearch();
  }
});

function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const currentNum = nums[i];
    const complement = target - currentNum;
    console.log("number: ", complement);
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(currentNum, i);
  }
  return [];
}
const myNums = [2, 7, 11, 15];
const myTarget = 18;
const result = twoSum(myNums, myTarget);

let objectName = [
  { name: "Neeti", address: { state: "bangkok", pascode: 10310 } },
  { name: "สมชาย", address: { state: "thailand", pascode: 99999 } },
];
objectName.map((value, key) => {
  console.log(value.name);
});

// ─────────────────────────────────────────────
//  Pagination state
// ─────────────────────────────────────────────
const ITEMS_PER_PAGE = 8;
let currentPage = 1;
let filteredData = [];

// ─────────────────────────────────────────────
// แสดงการ์ดสินค้าจาก foodProduct พร้อมระบบค้นหา
// ─────────────────────────────────────────────
function renderFoodCards(dataSource, page = 1) {
  const cardContainer = document.querySelector(".card-item");
  if (!cardContainer) return;

  const items = dataSource || foodProduct;
  filteredData = items;
  currentPage = page;

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE) || 1;
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filteredData.slice(start, start + ITEMS_PER_PAGE);

  cardContainer.innerHTML = "";

  pageItems.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";

    const isOutOfStock = product.Status === "Outofstock";

    card.innerHTML = `
      <div class="container-2">
        <div class="product-img-box">
          <img src="${product.image_url}" alt="${product.productName}" />
        </div>
        <h5 class="category">${product.CategoryTH || product.Category}</h5>
        <h2 class="product-title">${product.productNameTH}</h2>
        <h4 class="price-box">
          <span class="current-price">$${product.productPrice.toFixed(2)}</span>
        </h4>
        <button class="add-to-cart-btn" data-id="${product.productId}" ${isOutOfStock ? "disabled" : ""}>
          ${isOutOfStock ? "หมดชั่วคราว" : `เพิ่มลงตะกร้า <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-left:4px;"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`}
        </button>
      </div>
    `;

    cardContainer.appendChild(card);
  });

  // ผูก Event listener ให้ปุ่มเพิ่มลงตะกร้าทุกปุ่ม
  document
    .querySelectorAll(".add-to-cart-btn:not([disabled])")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const productId = btn.dataset.id;
        const product = foodProduct.find((p) => p.productId === productId);
        if (!product) return;

        const hasOptions = product.size.length > 0 || product.addon.length > 0;
        if (hasOptions) {
          openAddonModal(product, btn);
        } else {
          addToCart(product, null, []);
          flyToCart(btn);
        }
      });
    });

  renderPagination(totalPages);
}

// ─── Pagination component ───
function renderPagination(totalPages) {
  const container = document.getElementById("pagination");
  if (!container) return;

  if (totalPages <= 1) {
    container.innerHTML = "";
    return;
  }

  let html = "";
  html += `<button class="page-btn" data-page="${currentPage - 1}" ${currentPage === 1 ? "disabled" : ""}>‹</button>`;

  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-btn ${i === currentPage ? "active" : ""}" data-page="${i}">${i}</button>`;
  }

  html += `<button class="page-btn" data-page="${currentPage + 1}" ${currentPage === totalPages ? "disabled" : ""}>›</button>`;

  container.innerHTML = html;

  container.querySelectorAll(".page-btn:not([disabled])").forEach((btn) => {
    btn.addEventListener("click", () => {
      const page = parseInt(btn.dataset.page, 10);
      if (page >= 1 && page <= totalPages) {
        renderFoodCards(filteredData, page);
        document
          .querySelector(".card-item")
          .scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// ─── ระบบหมวดหมู่ + ค้นหา ───
let activeCategory = "ทั้งหมด";
let searchKeyword = "";

// กรองการ์ดตามคำค้นหา
function filterFoodCards(keyword) {
  searchKeyword = keyword;

  if (keyword) {
    const matches = foodProduct.filter(
      (p) =>
        p.productNameTH.toLowerCase().includes(keyword) ||
        p.productName.toLowerCase().includes(keyword),
    );
    if (matches.length > 0) {
      const cat = matches[0].Category;
      activeCategory = cat;
      document.querySelectorAll(".cat-btn").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.cat === cat);
      });
    }
  } else {
    activeCategory = "ทั้งหมด";
    document.querySelectorAll(".cat-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.cat === "ทั้งหมด");
    });
  }

  applyFilters();
}

// กรองการ์ดตามหมวดหมู่
function setCategory(category) {
  activeCategory = category;
  // อัปเดต active class
  document.querySelectorAll(".cat-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.cat === category);
  });
  applyFilters();
}

// รวมเงื่อนไขหมวดหมู่ + ค้นหา
function applyFilters() {
  let result = foodProduct;

  if (activeCategory !== "ทั้งหมด") {
    result = result.filter((p) => p.Category === activeCategory);
  }

  if (searchKeyword) {
    result = result.filter(
      (p) =>
        p.productNameTH.toLowerCase().includes(searchKeyword) ||
        p.productName.toLowerCase().includes(searchKeyword),
    );
  }

  renderFoodCards(result, 1);
}

// ─── สร้างปุ่มหมวดหมู่จากข้อมูลจริง ───
function renderCategoryButtons() {
  const container = document.getElementById("categoryFilter");
  if (!container) return;

  const catMap = {};
  foodProduct.forEach((p) => {
    if (p.Category && p.CategoryTH && !catMap[p.Category]) {
      catMap[p.Category] = p.CategoryTH;
    }
  });
  const catEntries = Object.entries(catMap);

  if (catEntries.length === 0) {
    container.innerHTML = "";
    return;
  }

  let html = `<button class="cat-btn active" data-cat="ทั้งหมด">ทั้งหมด</button>`;
  catEntries.forEach(([en, th]) => {
    html += `<button class="cat-btn" data-cat="${en}">${th}</button>`;
  });
  container.innerHTML = html;

  container.querySelectorAll(".cat-btn").forEach((btn) => {
    btn.addEventListener("click", () => setCategory(btn.dataset.cat));
  });
}

renderCategoryButtons();
renderFoodCards(foodProduct);

// ═════════════════════════════════════════════
//  Hamburger Menu
// ═════════════════════════════════════════════
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  document
    .querySelectorAll(".nav-links a:not(#navCartLink)")
    .forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });

  const navCartLink = document.getElementById("navCartLink");
  if (navCartLink) {
    navCartLink.addEventListener("click", (e) => {
      e.preventDefault();
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      if (typeof cartOverlay !== "undefined" && cartOverlay) {
        cartOverlay.classList.add("active");
        renderCart();
      }
    });
  }
}

// ─── Scroll spy: highlight active nav link ───
function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
  let current = "";
  sections.forEach((sec) => {
    const top = sec.getBoundingClientRect().top;
    if (top <= 200) current = sec.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });
}
window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);

// ═════════════════════════════════════════════
//  Fly-to-Cart Animation
// ═════════════════════════════════════════════
function flyToCart(btnEl) {
  const cartIcon = document.getElementById("cartIcon");
  if (!btnEl || !cartIcon) return;

  const start = btnEl.getBoundingClientRect();
  const end = cartIcon.getBoundingClientRect();

  const flyer = document.createElement("div");
  flyer.className = "fly-to-cart";
  flyer.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`;

  const midX = (start.left + end.left) / 2;
  const midY = start.top - 60;
  const dx = end.left - start.left;
  const dy = end.top - start.top;

  flyer.style.setProperty("--start-x", "0px");
  flyer.style.setProperty("--start-y", "0px");
  flyer.style.setProperty("--mid-x", `${midX - start.left}px`);
  flyer.style.setProperty("--mid-y", `${midY - start.top}px`);
  flyer.style.setProperty("--end-x", `${dx}px`);
  flyer.style.setProperty("--end-y", `${dy}px`);

  flyer.style.left = `${start.left}px`;
  flyer.style.top = `${start.top}px`;

  document.body.appendChild(flyer);

  flyer.addEventListener("animationend", () => {
    flyer.remove();
  });
}

// ═════════════════════════════════════════════
//  ระบบตะกร้าสินค้า (Cart System)
// ═════════════════════════════════════════════
// state กลางของตะกร้า
let cart = [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  try {
    const saved = localStorage.getItem("cart");
    if (saved) {
      cart = JSON.parse(saved);
      updateCartBadge();
    }
  } catch (e) {
    cart = [];
  }
}
// ─── DOM references ───
const cartIcon = document.getElementById("cartIcon");
const cartOverlay = document.getElementById("cartOverlay");
const cartClose = document.getElementById("cartClose");
const cartContent = document.getElementById("cartContent");
const cartBadge = document.getElementById("cartBadge");
const addonModal = document.getElementById("addonModal");
const modalClose = document.getElementById("modalClose");
const modalBody = document.getElementById("modalBody");
const modalConfirm = document.getElementById("modalConfirm");

loadCart();

// ─── เปิด/ปิด overlay ตะกร้า ───
cartIcon.addEventListener("click", () => {
  cartOverlay.classList.add("active");
  renderCart();
});
cartClose.addEventListener("click", () => {
  cartOverlay.classList.remove("active");
});
cartOverlay.addEventListener("click", (e) => {
  if (e.target === cartOverlay) cartOverlay.classList.remove("active");
});

// ─── อัปเดต badge ตัวเลขบนไอคอนตะกร้า ───
function updateCartBadge() {
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.textContent = total;
  cartBadge.style.display = total > 0 ? "flex" : "none";
}

// ─── เพิ่มสินค้าเข้า cart ───
function addToCart(product, selectedSize, selectedAddons) {
  const addons = selectedAddons || [];
  // หาว่ามีรายการที่เหมือนกันทุกประการ (id+size+addon) หรือยัง
  const idx = cart.findIndex((item) => {
    if (item.productId !== product.productId) return false;
    // เปรียบเทียบ size
    const sizeMatch =
      item.selectedSize === null && selectedSize === null
        ? true
        : item.selectedSize !== null && selectedSize !== null
          ? item.selectedSize.name === selectedSize.name &&
            item.selectedSize.price === selectedSize.price
          : false;
    // เปรียบเทียบ addon
    const addonMatch =
      item.selectedAddons.length === addons.length &&
      item.selectedAddons.every((a1) =>
        addons.some(
          (a2) => a1.addonitem === a2.addonitem && a1.price === a2.price,
        ),
      );
    return sizeMatch && addonMatch;
  });

  if (idx !== -1) {
    cart[idx].quantity += 1;
  } else {
    cart.push({
      productId: product.productId,
      productName: product.productNameTH,
      productPrice: product.productPrice,
      image_url: product.image_url,
      quantity: 1,
      selectedSize: selectedSize || null,
      selectedAddons: selectedAddons || [],
    });
  }

  updateCartBadge();
  saveCart();
}

// ─── ลบรายการออกจาก cart ───
function removeCartItem(index) {
  cart.splice(index, 1);
  updateCartBadge();
  saveCart();
  renderCart();
}

// ─── เปลี่ยนจำนวน ───
function changeQty(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  updateCartBadge();
  saveCart();
  renderCart();
}

// ─── คำนวณราคารวมของรายการเดียว ───
function calcItemPrice(item) {
  let price = item.productPrice;
  if (item.selectedSize) price = item.selectedSize.price;
  item.selectedAddons.forEach((a) => {
    price += a.price;
  });
  return price * item.quantity;
}

// ─── เรนเดอร์ตะกร้าสินค้า ───
function renderCart() {
  if (!cartContent) return;

  if (cart.length === 0) {
    cartContent.innerHTML = `<div class="cart-empty">ยังไม่มีรายการสินค้า</div>`;
    return;
  }

  let html = "";

  cart.forEach((item, i) => {
    const sizeText = item.selectedSize ? `ขนาด: ${item.selectedSize.name}` : "";
    const addonText =
      item.selectedAddons.length > 0
        ? ` + ${item.selectedAddons.map((a) => a.addonitem).join(", ")}`
        : "";
    const detail = [sizeText, addonText].filter(Boolean).join(" | ");

    html += `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.image_url}" alt="${item.productName}" />
        <div class="cart-item-info">
          <div class="cart-item-row">
            <div class="cart-item-name">${item.productName}</div>
            <div class="cart-item-actions">
              <div class="cart-item-qty">
                <button class="qty-btn" data-index="${i}" data-delta="-1">−</button>
                <span class="qty-num">${item.quantity}</span>
                <button class="qty-btn" data-index="${i}" data-delta="1">+</button>
              </div>
              <button class="cart-item-remove" data-index="${i}">ลบ</button>
            </div>
          </div>
          ${detail ? `<div class="cart-item-detail">${detail}</div>` : ""}
          <div class="cart-item-price">$${calcItemPrice(item).toFixed(2)}</div>
        </div>
      </div>
    `;
  });

  // คำนวณราคารวม
  const subtotal = cart.reduce((sum, item) => sum + calcItemPrice(item), 0);
  const vat = subtotal * 0.07;
  const total = subtotal + vat;

  html += `
    <div class="cart-summary">
      <div class="summary-row">
        <span>ราคาสินค้า</span>
        <span>$${subtotal.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>ภาษี VAT 7%</span>
        <span>$${vat.toFixed(2)}</span>
      </div>
      <div class="summary-row summary-total">
        <span>ราคารวมทั้งสิ้น</span>
        <span>$${total.toFixed(2)}</span>
      </div>
      <button class="checkout-btn">จ่ายเงิน</button>
    </div>
  `;

  cartContent.innerHTML = html;

  // ผูก events ปุ่ม ±
  cartContent.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      changeQty(+btn.dataset.index, +btn.dataset.delta);
    });
  });
  cartContent.querySelectorAll(".cart-item-remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeCartItem(+btn.dataset.index);
    });
  });
}

// ═════════════════════════════════════════════
//  Modal เลือก size / addon
// ═════════════════════════════════════════════
let modalProduct = null;
let selectedSize = null;
let selectedAddons = [];

let modalTriggerBtn = null;

// ─── เปิด modal ───
function openAddonModal(product, triggerBtn) {
  modalProduct = product;
  modalTriggerBtn = triggerBtn || null;
  selectedSize = product.size.length > 0 ? product.size[0] : null;
  selectedAddons = [];

  renderModalBody();
  addonModal.classList.add("active");
}

// ─── ปิด modal ───
function closeAddonModal() {
  addonModal.classList.remove("active");
  modalProduct = null;
}

modalClose.addEventListener("click", closeAddonModal);
addonModal.addEventListener("click", (e) => {
  if (e.target === addonModal) closeAddonModal();
});

// ─── เรนเดอร์เนื้อหาใน modal ───
function renderModalBody() {
  if (!modalProduct || !modalBody) return;

  let html = `<div class="modal-product-name">${modalProduct.productNameTH}</div>`;

  // size options (radio)
  if (modalProduct.size.length > 0) {
    html += `<div class="option-group"><span class="option-label">ขนาด</span>`;
    modalProduct.size.forEach((s, i) => {
      const checked = i === 0 ? "checked" : "";
      html += `
        <div class="option-item ${checked ? "selected" : ""}">
          <input type="radio" name="size" value="${i}" ${checked} />
          <label>${s.name} <span>+$${s.price.toFixed(2)}</span></label>
        </div>
      `;
    });
    html += `</div>`;
  }

  // addon options (checkbox)
  if (modalProduct.addon.length > 0) {
    html += `<div class="option-group"><span class="option-label">เพิ่มเติม</span>`;
    modalProduct.addon.forEach((a, i) => {
      html += `
        <div class="option-item">
          <input type="checkbox" name="addon" value="${i}" />
          <label>${a.addonitem} <span>+$${a.price.toFixed(2)}</span></label>
        </div>
      `;
    });
    html += `</div>`;
  }

  if (modalProduct.size.length === 0 && modalProduct.addon.length === 0) {
    html += `<p style="color:#94a3b8;">ไม่มีตัวเลือกเพิ่มเติม</p>`;
  }

  modalBody.innerHTML = html;

  // events size radio
  modalBody.querySelectorAll('input[name="size"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      const idx = +radio.value;
      selectedSize = modalProduct.size[idx];
      modalBody
        .querySelectorAll(".option-item")
        .forEach((el) => el.classList.remove("selected"));
      radio.closest(".option-item").classList.add("selected");
    });
  });

  // events addon checkbox
  modalBody.querySelectorAll('input[name="addon"]').forEach((cb) => {
    cb.addEventListener("change", () => {
      const idx = +cb.value;
      if (cb.checked) {
        selectedAddons.push(modalProduct.addon[idx]);
        cb.closest(".option-item").classList.add("selected");
      } else {
        selectedAddons = selectedAddons.filter((_, j) => j !== idx);
        cb.closest(".option-item").classList.remove("selected");
      }
    });
  });
}

// ─── ยืนยันเพิ่มลงตะกร้าจาก modal ───
modalConfirm.addEventListener("click", () => {
  if (!modalProduct) return;
  addToCart(modalProduct, selectedSize, selectedAddons);
  if (modalTriggerBtn) flyToCart(modalTriggerBtn);
  closeAddonModal();
});

// ═════════════════════════════════════════════
//  Hero Slider — รูปพื้นหลังเลื่อนอัตโนมัติ
// ═════════════════════════════════════════════
const heroSliderImages = [
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=1400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=1400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=1400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=1400&h=600&fit=crop",
];

const heroEl = document.getElementById("hero");
let heroIdx = 0;

if (heroEl) {
  setInterval(() => {
    heroIdx = (heroIdx + 1) % heroSliderImages.length;
    heroEl.style.backgroundImage = `linear-gradient(135deg, rgba(26,26,46,0.85), rgba(22,33,62,0.85)), url('${heroSliderImages[heroIdx]}')`;
  }, 4000);
}
