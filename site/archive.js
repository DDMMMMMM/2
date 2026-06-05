const fallbackArchive = [
  {
    image: "assets/screens/work-09.webp",
    views: "109K",
    sector: "Street food",
    goal: "Aumentare attenzione locale",
    problem: "Prodotto forte, ma racconto social poco memorabile.",
    approach: "Format centrato su prodotto, territorio e promessa immediata.",
    why: "Hook semplice, visual chiara, payoff immediato.",
    category: "food",
    featured: true,
    order: 1
  },
  {
    image: "assets/screens/work-03.webp",
    views: "86,2K",
    sector: "Industria",
    goal: "Rendere comprensibile un tema tecnico",
    problem: "Competenza alta, ma contenuti difficili da leggere per chi non e del settore.",
    approach: "Video verticale con messaggio semplificato, dettagli tecnici e ritmo social.",
    why: "Ha tradotto un tema industriale in un contenuto chiaro, concreto e condivisibile.",
    category: "technical",
    featured: true,
    order: 2
  },
  {
    image: "assets/screens/work-06.webp",
    views: "65,9K",
    sector: "Centro benessere",
    goal: "Generare awareness locale",
    problem: "Servizi percepiti come simili ai competitor e poco riconoscibili online.",
    approach: "Format diretto su esperienza, beneficio e ambiente del centro.",
    why: "Messaggio immediato, visual rassicurante e beneficio facile da capire.",
    category: "local",
    featured: true,
    order: 3
  },
  {
    image: "assets/screens/work-10.webp",
    views: "26,4K",
    sector: "Attivita locale",
    title: "Situazione reale convertita in contenuto ad alta interazione.",
    category: "local",
    featured: false,
    order: 4
  },
  {
    image: "assets/screens/work-07.webp",
    views: "22,5K",
    sector: "Local business",
    title: "Volto, fiducia e presenza in camera.",
    category: "local",
    featured: false,
    order: 5
  },
  {
    image: "assets/screens/work-08.webp",
    views: "16,8K",
    sector: "Food retail",
    title: "Scene di servizio e ritmo verticale.",
    category: "food",
    featured: false,
    order: 6
  },
  {
    image: "assets/screens/work-02.webp",
    views: "15,8K",
    sector: "Automotive",
    title: "Storytelling per officina e competenze tecniche.",
    category: "technical",
    featured: false,
    order: 7
  },
  {
    image: "assets/screens/work-13.webp",
    views: "15,2K",
    sector: "Food & beverage",
    title: "Personaggio memorabile e identita visiva forte.",
    category: "food",
    featured: false,
    order: 8
  },
  {
    image: "assets/screens/work-11.webp",
    views: "14,8K",
    sector: "Street food",
    title: "Messaggio semplice, prodotto al centro, payoff immediato.",
    category: "food",
    featured: false,
    order: 9
  },
  {
    image: "assets/screens/work-01.webp",
    views: "13,6K",
    sector: "Ristorazione",
    title: "Racconto umano per attivita di quartiere.",
    category: "food",
    featured: false,
    order: 10
  },
  {
    image: "assets/screens/work-12.webp",
    views: "10,3K",
    sector: "Tacos Land",
    title: "Formato snackable con promessa chiara.",
    category: "food",
    featured: false,
    order: 11
  },
  {
    image: "assets/screens/work-04.webp",
    views: "9.388",
    sector: "Eventi",
    title: "Promozione evento con presenza diretta.",
    category: "local",
    featured: false,
    order: 12
  },
  {
    image: "assets/screens/work-05.webp",
    views: "5.870",
    sector: "Retail fashion",
    title: "Valore percepito e selezione prodotto.",
    category: "retail",
    featured: false,
    order: 13
  }
];

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const archiveGrid = document.querySelector("#archive-grid");
const archiveEmpty = document.querySelector("[data-archive-empty]");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const year = document.querySelector("#year");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxSector = document.querySelector("[data-lightbox-sector]");
const lightboxViews = document.querySelector("[data-lightbox-views]");
const lightboxInsight = document.querySelector("[data-lightbox-insight]");
const lightboxCategory = document.querySelector("[data-lightbox-category]");

let archiveItems = fallbackArchive;
let visibleItems = fallbackArchive;
let lastFocusedElement = null;

document.documentElement.classList.add("enhanced");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    setMobileMenu(!siteNav.classList.contains("is-open"));
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMobileMenu();
    }
  });
}

function setMobileMenu(isOpen) {
  siteNav?.classList.toggle("is-open", isOpen);
  navToggle?.setAttribute("aria-expanded", String(isOpen));
  navToggle?.setAttribute("aria-label", isOpen ? "Chiudi menu" : "Apri menu");
  document.body.classList.toggle("is-menu-open", isOpen);
}

function closeMobileMenu() {
  setMobileMenu(false);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function localPath(path) {
  return `../${String(path || "").replace(/^\/+/, "")}`;
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

function detailMarkup(item) {
  const title = item.title || item.goal || "Contenuto verticale ad alta attenzione.";
  const summary = item.why || item.approach || "";
  return `
    <strong class="case-title">${escapeHtml(title)}</strong>
    ${summary ? `<p class="case-summary">${escapeHtml(summary)}</p>` : ""}
  `;
}

function archiveCardTemplate(item, index) {
  const sector = escapeHtml(item.sector);
  const views = escapeHtml(item.views);
  const image = escapeHtml(localPath(item.image));
  const category = escapeHtml(item.category);
  const loading = index < 3 ? "eager" : "lazy";

  return `
    <article class="case-card archive-card" data-category="${category}">
      <div class="case-media">
        <div class="phone-shell case-phone" role="button" tabindex="0" aria-label="Apri risultato ${sector}, ${views} views" data-case-index="${index}">
          <img src="${image}" alt="${sector}: contenuto social con ${views} views" width="1080" height="1920" loading="${loading}" decoding="async">
        </div>
        <span class="case-views">${views} views</span>
      </div>
      <div class="case-body">
        <span class="case-sector">${sector}</span>
        ${detailMarkup(item)}
      </div>
    </article>
  `;
}

function renderArchive(filter = "all") {
  if (!archiveGrid) return;

  visibleItems = archiveItems.filter((item) => filter === "all" || item.category === filter);
  archiveGrid.innerHTML = visibleItems.map(archiveCardTemplate).join("");

  if (archiveEmpty) {
    archiveEmpty.hidden = visibleItems.length > 0;
  }

  bindCards();
}

function bindCards() {
  archiveGrid?.querySelectorAll(".case-phone").forEach((phone) => {
    phone.addEventListener("click", () => openLightbox(Number(phone.dataset.caseIndex)));
    phone.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(Number(phone.dataset.caseIndex));
      }
    });
  });
}

async function loadArchive() {
  try {
    const res = await fetch("../content/results-feed.json?v=2");
    if (!res.ok) throw new Error("Unable to load archive");
    const items = await res.json();
    archiveItems = items.sort((a, b) => a.order - b.order);
  } catch {
    archiveItems = fallbackArchive;
  }

  renderArchive();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((node) => node.classList.remove("is-active"));
    button.classList.add("is-active");
    renderArchive(button.dataset.filter || "all");
  });
});

function openLightbox(index) {
  const item = visibleItems[index];
  if (!item || !lightbox || !lightboxImage || !lightboxSector || !lightboxViews || !lightboxInsight || !lightboxCategory) {
    return;
  }

  lastFocusedElement = document.activeElement;
  lightboxImage.src = localPath(item.image);
  lightboxImage.alt = `${item.sector}: contenuto social con ${item.views} views`;
  lightboxSector.textContent = item.sector;
  lightboxViews.textContent = `${item.views} views`;
  lightboxInsight.textContent = item.why || item.approach || item.title || "";
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

  lastFocusedElement = null;
}

document.querySelectorAll("[data-lightbox-close]").forEach((button) => {
  button.addEventListener("click", closeLightbox);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox?.classList.contains("is-open")) {
    closeLightbox();
  }

  if (event.key === "Escape" && siteNav?.classList.contains("is-open")) {
    closeMobileMenu();
    navToggle?.focus();
  }
});

function observeReveals(nodes = document.querySelectorAll("[data-reveal]")) {
  const revealNodes = [...nodes];
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
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

  revealNodes.forEach((node) => observer.observe(node));
}

observeReveals();
loadArchive();
