const products = {
  "glycura-veg-collagen-peptide": {
    id: "glycura-veg-collagen-peptide",
    name: "Glycura Veg Collagen Peptide",
    price: 1499,
    image: "assets/product-img/WhatsApp Image 2026-08-22 at 3.14.11 PM (1).jpeg",
    description: "Advanced carnosine-amino complex with plant-based collagen peptides for daily skin wellness.",
    category: "Skin Wellness",
    available: true
  },
  "amemoist-moisturizing-lotion": {
    id: "amemoist-moisturizing-lotion",
    name: "Amemoist Moisturizing Lotion",
    price: 599,
    image: "assets/product-img/WhatsApp Image 2026-08-22 at 3.14.11 PM.jpeg",
    description: "Non-greasy, non-irritating moisturising lotion enriched with oat, shea butter, almond and jojoba oil.",
    category: "Skin Care",
    available: true
  },
  "neutriderm-foaming-cleanser": {
    id: "neutriderm-foaming-cleanser",
    name: "Neutriderm Foaming Cleanser",
    price: 699,
    image: "assets/product-img/WhatsApp Image 2026-08-22 at 3.14.12 PM (1).jpeg",
    description: "A gentle, hydrating foaming cleanser for a clean and comfortable daily skincare routine.",
    category: "Cleansers",
    available: true
  },
  "revolante-n-serum": {
    id: "revolante-n-serum",
    name: "Revolante-N Serum",
    price: 899,
    image: "assets/product-img/WhatsApp Image 2026-08-22 at 3.14.12 PM (2).jpeg",
    description: "10% niacinamide serum with zinc PCA and hyaluronic acid for clarifying and hydrating care.",
    category: "Serums",
    available: true
  },
  "enhairx-fct": {
    id: "enhairx-fct",
    name: "EnhairX FCT",
    price: 1299,
    image: "assets/product-img/WhatsApp Image 2026-08-22 at 3.14.12 PM.jpeg",
    description: "Premium hair cyclical therapy vitamins formulated with nutrients, amino acids and phytonutrients.",
    category: "Hair Care",
    available: true
  },
  "nad-glow-tablets": {
    id: "nad-glow-tablets",
    name: "NAD glow Tablets",
    price: 1799,
    image: "assets/product-img/WhatsApp Image 2026-08-22 at 3.14.13 PM (1).jpeg",
    description: "Cellular energy and skin radiance formula with a convenient daily tablet format.",
    category: "Wellness",
    available: true
  },
  "neutriderm-illuminating-body-lotion": {
    id: "neutriderm-illuminating-body-lotion",
    name: "Neutriderm Illuminating Body Lotion",
    price: 749,
    image: "assets/product-img/WhatsApp Image 2026-08-22 at 3.14.13 PM (2).jpeg",
    description: "A complexion-clarifying body lotion designed to support smooth, moisturised-looking skin.",
    category: "Body Care",
    available: true
  },
  "caplong-leave-on-conditioner": {
    id: "caplong-leave-on-conditioner",
    name: "Caplong Leave-on Hair Conditioner",
    price: 649,
    image: "assets/product-img/WhatsApp Image 2026-08-22 at 3.14.13 PM.jpeg",
    description: "A leave-on conditioner enriched with nourishing extracts for soft, confident and conditioned hair.",
    category: "Hair Care",
    available: true
  },
  "bmj-neo-foaming-face-wash": {
    id: "bmj-neo-foaming-face-wash",
    name: "BMJ Neo Foaming Face Wash",
    price: 799,
    image: "assets/product-img/WhatsApp Image 2026-08-22 at 3.14.14 PM (1).jpeg",
    description: "A professional foaming face wash formulated for a fresh, balanced daily cleansing routine.",
    category: "Cleansers",
    available: true
  },
  "protar-k-scalp-solution": {
    id: "protar-k-scalp-solution",
    name: "Protar-K Scalp Solution",
    price: 499,
    image: "assets/product-img/WhatsApp Image 2026-08-22 at 3.14.14 PM (2).jpeg",
    description: "Coal tar and ketoconazole scalp solution for dermatologist-guided scalp care.",
    category: "Scalp Care",
    available: true
  },
  "mpower-5-minoxidil": {
    id: "mpower-5-minoxidil",
    name: "Mpower 5% Minoxidil",
    price: 899,
    image: "assets/product-img/WhatsApp Image 2026-08-22 at 3.14.14 PM.jpeg",
    description: "5% topical minoxidil solution for advanced hair regrowth support under medical guidance.",
    category: "Hair Care",
    available: true
  },
  "uvdoux-aqua-moisturizer": {
    id: "uvdoux-aqua-moisturizer",
    name: "UVDoux Aqua Moisturizer",
    price: 849,
    image: "assets/product-img/WhatsApp Image 2026-08-22 at 3.14.15 PM.jpeg",
    description: "A lightweight aqua moisturiser enriched with ceramides and hyaluronic acid for daily hydration.",
    category: "Moisturisers",
    available: true
  }
};

function formatCurrency(amount) {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}
