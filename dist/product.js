(() => {
  const query = (selector, context = document) => context.querySelector(selector);
  const queryAll = (selector, context = document) => [...context.querySelectorAll(selector)];

  function renderProducts() {
    const grid = query("#productGrid");
    if (!grid) return;

    grid.replaceChildren(...Object.values(products).map((product) => {
      const card = document.createElement("article");
      card.className = "product-card reveal";
      card.innerHTML = `
        <div class="product-card-image"><img src="${product.image}" alt="${product.name}" loading="lazy"></div>
        <div class="product-info">
          <span class="product-category">${product.category}</span>
          <h2>${product.name}</h2>
          <p class="product-price">${formatCurrency(product.price)}</p>
          <p class="product-description">${product.description}</p>
          <a class="btn btn-primary order-now-btn" href="order.html?product=${encodeURIComponent(product.id)}">Order Now <i class="fa-solid fa-arrow-right"></i></a>
        </div>`;
      return card;
    }));
  }

  function initPage() {
    const year = query("#year");
    if (year) year.textContent = new Date().getFullYear();
    const menu = query("#navMenu");
    const toggle = query(".menu-toggle");
    if (toggle && menu) {
      toggle.addEventListener("click", () => {
        const open = menu.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
        document.body.classList.toggle("menu-open", open);
      });
    }
    queryAll(".nav-menu a").forEach((link) => link.addEventListener("click", () => {
      if (menu) menu.classList.remove("open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    }));
    renderProducts();
    queryAll(".reveal").forEach((element) => element.classList.add("visible"));
    const loader = query(".loader");
    window.addEventListener("load", () => {
      if (loader) loader.classList.add("hidden");
    });
  }

  document.addEventListener("DOMContentLoaded", initPage);
})();
