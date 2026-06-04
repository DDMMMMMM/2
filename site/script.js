const BRAND = {
  name: "2YOU Agency",
  handle: "@2youagency",
  instagramUrl: "https://www.instagram.com/2youagency/"
};

const fallbackResults = [
  {
    image: "assets/screens/work-09.webp",
    views: "109K",
    sector: "Street food",
    title: "Un contenuto semplice, costruito su prodotto e territorio.",
    category: "food"
  },
  {
    image: "assets/screens/work-03.webp",
    views: "86,2K",
    sector: "Industria",
    title: "Tema tecnico trasformato in video verticale comprensibile.",
    category: "technical"
  },
  {
    image: "assets/screens/work-06.webp",
    views: "65,9K",
    sector: "Centro benessere",
    title: "Awareness locale con messaggio diretto e riconoscibile.",
    category: "local"
  },
  {
    image: "assets/screens/work-10.webp",
    views: "26,4K",
    sector: "Attività locale",
    title: "Situazione reale convertita in contenuto ad alta interazione.",
    category: "local"
  },
  {
    image: "assets/screens/work-07.webp",
    views: "22,5K",
    sector: "Local business",
    title: "Volto, fiducia e presenza in camera.",
    category: "local"
  },
  {
    image: "assets/screens/work-08.webp",
    views: "16,8K",
    sector: "Food retail",
    title: "Scene di servizio e ritmo verticale.",
    category: "food"
  },
  {
    image: "assets/screens/work-02.webp",
    views: "15,8K",
    sector: "Automotive",
    title: "Storytelling per officina e competenze tecniche.",
    category: "technical"
  },
  {
    image: "assets/screens/work-13.webp",
    views: "15,2K",
    sector: "Food & beverage",
    title: "Personaggio memorabile e identità visiva forte.",
    category: "food"
  },
  {
    image: "assets/screens/work-11.webp",
    views: "14,8K",
    sector: "Street food",
    title: "Messaggio semplice, prodotto al centro, payoff immediato.",
    category: "food"
  },
  {
    image: "assets/screens/work-01.webp",
    views: "13,6K",
    sector: "Ristorazione",
    title: "Racconto umano per attività di quartiere.",
    category: "food"
  },
  {
    image: "assets/screens/work-12.webp",
    views: "10,3K",
    sector: "Tacos Land",
    title: "Formato snackable con promessa chiara.",
    category: "food"
  },
  {
    image: "assets/screens/work-04.webp",
    views: "9.388",
    sector: "Eventi",
    title: "Promozione evento con presenza diretta.",
    category: "local"
  },
  {
    image: "assets/screens/work-05.webp",
    views: "5.870",
    sector: "Retail fashion",
    title: "Valore percepito e selezione prodotto.",
    category: "retail"
  }
];

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a[href^='#']")];
const resultGrid = document.querySelector("#result-grid");
const filters = document.querySelectorAll(".filter");
const year = document.querySelector("#year");
const copyHandleButton = document.querySelector("[data-copy-handle]");
const copyFeedback = document.querySelector("[data-copy-feedback]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxSector = document.querySelector("[data-lightbox-sector]");
const lightboxViews = document.querySelector("[data-lightbox-views]");
const lightboxInsight = document.querySelector("[data-lightbox-insight]");
const lightboxCategory = document.querySelector("[data-lightbox-category]");
const brochurePage = document.querySelector("[data-brochure-page]");
const brochurePrev = document.querySelector("[data-brochure-prev]");
const brochureNext = document.querySelector("[data-brochure-next]");
const brochureZoom = document.querySelector("[data-brochure-zoom]");
const brochureZoomImage = document.querySelector("[data-brochure-zoom-image]");
const brochureZoomOpenButtons = document.querySelectorAll("[data-brochure-zoom-open]");
const brochureZoomPrev = document.querySelector("[data-brochure-zoom-prev]");
const brochureZoomNext = document.querySelector("[data-brochure-zoom-next]");
let lastFocusedElement = null;
let activeResults = fallbackResults;
let currentBrochurePage = 0;

const brochurePages = Array.from({ length: 14 }, (_, index) => {
  const page = String(index + 1).padStart(2, "0");
  return `assets/tdash/pages/tdash-page-${page}.webp`;
});

document.documentElement.classList.add("enhanced");

document.querySelectorAll("[data-brand-name]").forEach((node) => {
  node.textContent = BRAND.name;
});

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMobileMenu();
    }
  });
}

function closeMobileMenu() {
  siteNav?.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
}

function categoryLabel(category) {
  const labels = {
    food: "Food",
    local: "Local",
    technical: "Tecnico",
    retail: "Retail"
  };
  return labels[category] || category || "Altro";
}

function resultCardTemplate(item, index) {
  const featured = index < 3 ? " is-featured" : "";
  const number = String(index + 1).padStart(2, "0");
  return `
    <article class="result-card${featured}" tabindex="0" role="button" aria-label="Apri risultato ${item.sector}, ${item.views} views" data-index="${index}" data-category="${item.category}">
      <div class="result-media">
        <div class="phone-shell result-phone">
          <img src="${item.image}" alt="${item.sector}: screenshot con ${item.views} views" width="1080" height="1920" loading="eager" decoding="async">
        </div>
        <span class="result-views">${item.views}</span>
      </div>
      <div class="result-copy">
        <div class="result-meta">
          <strong>${number} / ${item.sector}</strong>
          <span class="category-badge">${categoryLabel(item.category)}</span>
        </div>
        <p>${item.title}</p>
      </div>
    </article>
  `;
}

function renderResults(items) {
  if (!resultGrid) return;
  activeResults = items;
  resultGrid.innerHTML = items.map(resultCardTemplate).join("");
  bindResultCards();
  restoreHashPosition();
}

async function loadResults() {
  try {
    const response = await fetch("content/results-feed.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Feed not available");
    const items = await response.json();
    renderResults(Array.isArray(items) && items.length ? items : fallbackResults);
  } catch {
    renderResults(fallbackResults);
  }
}

function bindResultCards() {
  document.querySelectorAll(".result-card").forEach((card) => {
    card.addEventListener("click", () => openLightbox(Number(card.dataset.index)));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(Number(card.dataset.index));
      }
    });
  });
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter || "all";
    filters.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    document.querySelectorAll(".result-card").forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

function openLightbox(index) {
  const item = activeResults[index];
  if (!item || !lightbox) return;

  lastFocusedElement = document.activeElement;
  lightboxImage.src = item.image;
  lightboxImage.alt = `${item.sector}: screenshot con ${item.views} views`;
  lightboxSector.textContent = item.sector;
  lightboxViews.textContent = `${item.views} views`;
  lightboxInsight.textContent = item.title;
  lightboxCategory.textContent = categoryLabel(item.category);

  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-locked");
  lightbox.querySelector("[data-lightbox-close]")?.focus();
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-locked");
  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
}

document.querySelectorAll("[data-lightbox-close]").forEach((button) => {
  button.addEventListener("click", closeLightbox);
});

document.addEventListener("keydown", (event) => {
  const resultLightboxOpen = lightbox?.classList.contains("is-open");
  const brochureZoomOpen = brochureZoom?.classList.contains("is-open");

  if (event.key === "Escape" && resultLightboxOpen) {
    closeLightbox();
  }

  if (event.key === "Escape" && brochureZoomOpen) {
    closeBrochureZoom();
  }

  if (brochureZoomOpen && event.key === "ArrowLeft") {
    setBrochurePage(currentBrochurePage - 1);
  }

  if (brochureZoomOpen && event.key === "ArrowRight") {
    setBrochurePage(currentBrochurePage + 1);
  }

  const openDialog = resultLightboxOpen ? lightbox : brochureZoomOpen ? brochureZoom : null;
  if (event.key === "Tab" && openDialog) {
    trapFocus(event, openDialog);
  }
});

function trapFocus(event, dialog) {
  const focusable = [...dialog.querySelectorAll("button, [href], [tabindex]:not([tabindex='-1'])")];
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

if (copyHandleButton && copyFeedback) {
  copyHandleButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(BRAND.handle);
      copyFeedback.textContent = "Handle copiato";
    } catch {
      copyFeedback.textContent = BRAND.handle;
    }
  });
}

function setBrochurePage(index) {
  if (!brochurePage) return;
  currentBrochurePage = Math.max(0, Math.min(index, brochurePages.length - 1));
  brochurePage.src = brochurePages[currentBrochurePage];
  brochurePage.alt = `Brochure TDash pagina ${currentBrochurePage + 1}`;
  updateBrochureZoom();

  if (!prefersReducedMotion) {
    brochurePage.classList.remove("is-turning");
    void brochurePage.offsetWidth;
    brochurePage.classList.add("is-turning");
  }

  const isFirst = currentBrochurePage === 0;
  const isLast = currentBrochurePage === brochurePages.length - 1;
  [brochurePrev, brochureZoomPrev].forEach((button) => {
    if (button) button.disabled = isFirst;
  });
  [brochureNext, brochureZoomNext].forEach((button) => {
    if (button) button.disabled = isLast;
  });
}

function updateBrochureZoom() {
  if (!brochureZoomImage) return;
  brochureZoomImage.src = brochurePages[currentBrochurePage];
  brochureZoomImage.alt = `Brochure TDash pagina ${currentBrochurePage + 1} ingrandita`;
}

function openBrochureZoom() {
  if (!brochureZoom) return;
  lastFocusedElement = document.activeElement;
  updateBrochureZoom();
  brochureZoom.classList.add("is-open");
  brochureZoom.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-locked");
  brochureZoom.querySelector("[data-brochure-zoom-close]")?.focus();
}

function closeBrochureZoom() {
  if (!brochureZoom) return;
  brochureZoom.classList.remove("is-open");
  brochureZoom.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-locked");
  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
}

function initBrochureReader() {
  if (!brochurePage) return;
  setBrochurePage(0);

  brochurePrev?.addEventListener("click", () => setBrochurePage(currentBrochurePage - 1));
  brochureNext?.addEventListener("click", () => setBrochurePage(currentBrochurePage + 1));
  brochureZoomOpenButtons.forEach((button) => button.addEventListener("click", openBrochureZoom));
  document.querySelectorAll("[data-brochure-zoom-close]").forEach((button) => {
    button.addEventListener("click", closeBrochureZoom);
  });
  brochureZoomPrev?.addEventListener("click", () => setBrochurePage(currentBrochurePage - 1));
  brochureZoomNext?.addEventListener("click", () => setBrochurePage(currentBrochurePage + 1));

  brochurePage.closest(".brochure-reader")?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") setBrochurePage(currentBrochurePage - 1);
    if (event.key === "ArrowRight") setBrochurePage(currentBrochurePage + 1);
  });
}

function observeReveals(nodes = document.querySelectorAll("[data-reveal]")) {
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );

  nodes.forEach((node) => observer.observe(node));
}

function observeCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) return;

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const node = entry.target;
        const value = Number(node.dataset.value || "0");
        const suffix = node.dataset.suffix || "";
        const start = performance.now();
        const duration = 850;

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          node.textContent = `${Math.round(value * eased)}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        counterObserver.unobserve(node);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}

function observeActiveNav() {
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) return;

  let scheduled = false;
  const update = () => {
    scheduled = false;
    const offset = Math.max(120, window.innerHeight * 0.35);
    let active = sections[0];

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= offset) {
        active = section;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${active.id}`);
    });
  };

  const requestUpdate = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  update();
}

function restoreHashPosition() {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  if (!target) return;
  requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
}

observeReveals();
observeCounters();
observeActiveNav();
initBrochureReader();
loadResults();
