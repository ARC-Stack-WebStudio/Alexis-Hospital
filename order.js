(() => {
  const query = (selector, context = document) => context.querySelector(selector);
  const queryAll = (selector, context = document) => [...context.querySelectorAll(selector)];
  const whatsappNumber = "918080697661";

  function initOrderPage() {
    const params = new URLSearchParams(window.location.search);
    const product = products[params.get("product")];
    const content = query("#orderContent");
    const notFound = query("#productNotFound");
    const year = query("#year");
    if (year) year.textContent = new Date().getFullYear();
    if (!product || !product.available || !Number.isFinite(product.price) || product.price < 0) {
      notFound.hidden = false;
      return;
    }
    content.hidden = false;

    const image = query("#productImage");
    const quantityInput = query("#quantity");
    const error = query("#orderError");
    const summaryQuantity = query("#summaryQuantity");
    const summaryTotal = query("#summaryTotal");
    image.src = product.image;
    image.alt = product.name;
    query("#productName").textContent = product.name;
    query("#productDescription").textContent = product.description;
    query("#productCategory").textContent = product.category;
    query("#productPrice").textContent = formatCurrency(product.price);
    query("#summaryProduct").textContent = product.name;
    query("#summaryPrice").textContent = formatCurrency(product.price);

    const thumbnails = query("#productThumbnails");
    (product.images || [product.image]).forEach((source, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = index === 0 ? "active" : "";
      button.setAttribute("aria-label", `Show product image ${index + 1}`);
      button.innerHTML = `<img src="${source}" alt="${product.name} image ${index + 1}">`;
      button.addEventListener("click", () => {
        image.src = source;
        queryAll("button", thumbnails).forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
      });
      thumbnails.appendChild(button);
    });

    function validQuantity() {
      const quantity = Number(quantityInput.value);
      return Number.isInteger(quantity) && quantity >= 1;
    }
    function updateSummary() {
      if (!validQuantity()) {
        summaryQuantity.textContent = "Invalid";
        summaryTotal.textContent = "--";
        return;
      }
      const subtotal = product.price * Number(quantityInput.value);
      summaryQuantity.textContent = quantityInput.value;
      summaryTotal.textContent = formatCurrency(subtotal);
    }
    function setQuantity(value) {
      quantityInput.value = Math.max(1, Math.floor(Number(value) || 1));
      updateSummary();
    }
    query("#decreaseQuantity").addEventListener("click", () => setQuantity(Number(quantityInput.value) - 1));
    query("#increaseQuantity").addEventListener("click", () => setQuantity(Number(quantityInput.value) + 1));
    quantityInput.addEventListener("input", updateSummary);
    quantityInput.addEventListener("blur", () => { if (!validQuantity()) setQuantity(1); });
    updateSummary();

    query("#orderForm").addEventListener("submit", (event) => {
      event.preventDefault();
      error.textContent = "";
      if (!validQuantity()) { error.textContent = "Please enter a valid quantity of 1 or more."; return; }
      const form = event.currentTarget;
      if (!form.checkValidity()) { error.textContent = "Please complete all required customer details."; form.reportValidity(); return; }
      const quantity = Number(quantityInput.value);
      const subtotal = product.price * quantity;
      const customerName = query("#customerName").value.trim();
      const customerPhone = query("#customerPhone").value.trim();
      const area = query("#customerArea").value.trim();
      const location = query("#customerLocation").value.trim();
      const additionalMessage = query("#customerMessage").value.trim();
      const message = `*NEW ORDER REQUEST*\n\n*Product Details*\nProduct: ${product.name}\nPrice: ${formatCurrency(product.price)}\nQuantity: ${quantity}\nCalculation: ${quantity} × ${formatCurrency(product.price)} = ${formatCurrency(subtotal)}\n\n*Order Total*\nTotal: ${formatCurrency(subtotal)}\n\n*Customer Details*\nName: ${customerName}\nMobile: ${customerPhone}\nArea: ${area}\nLocation: ${location}\n\n*Additional Message*\n${additionalMessage || "None"}\n\nPlease confirm my order.`;
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank", "noopener");
    });

    const menu = query("#navMenu");
    const toggle = query(".menu-toggle");
    if (toggle && menu) toggle.addEventListener("click", () => { const open = menu.classList.toggle("open"); toggle.setAttribute("aria-expanded", String(open)); });
    queryAll(".nav-menu a").forEach((link) => link.addEventListener("click", () => { if (menu) menu.classList.remove("open"); }));
    const loader = query(".loader");
    window.addEventListener("load", () => { if (loader) loader.classList.add("hidden"); });
  }

  document.addEventListener("DOMContentLoaded", initOrderPage);
})();
