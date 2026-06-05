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
    problem: "Competenza alta, ma contenuti difficili da leggere per chi non \u00e8 del settore.",
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
    sector: "Attivit\u00e0 locale",
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
    title: "Personaggio memorabile e identit\u00e0 visiva forte.",
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
    title: "Racconto umano per attivit\u00e0 di quartiere.",
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

const MESSAGE_TEMPLATE = `Ciao 2YOU  vorrei un audit del profilo della mia attivit\u00e0.

Settore: 
Citt\u00e0: 
Profilo Instagram: 
Obiettivo principale: `;

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a[href^='#']")];
const caseGrid = document.querySelector("#case-grid");
const showAllWorksButton = document.querySelector("[data-show-all-works]");
const year = document.querySelector("#year");
const copyMessageButton = document.querySelector("[data-copy-message]");
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
const brochureDetails = document.querySelector("[data-brochure-details]");
const brochureToggleButton = document.querySelector("[data-brochure-toggle]");
const brochureZoom = document.querySelector("[data-brochure-zoom]");
const brochureZoomStage = document.querySelector(".brochure-zoom-stage");
const brochureZoomImage = document.querySelector("[data-brochure-zoom-image]");
const brochureZoomOpenButtons = document.querySelectorAll("[data-brochure-zoom-open]");
const brochureZoomPrev = document.querySelector("[data-brochure-zoom-prev]");
const brochureZoomNext = document.querySelector("[data-brochure-zoom-next]");
const brochureZoomMobileQuery = window.matchMedia("(max-width: 768px)");

let lastFocusedElement = null;
let allCaseStudies = fallbackResults;
let activeCaseStudies = fallbackResults.filter((item) => item.featured);
let isShowingAllWorks = false;
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

function categoryLabel(category) {
  const labels = {
    food: "Food",
    local: "Local",
    technical: "Tecnico",
    retail: "Retail"
  };
  return labels[category] || category || "Altro";
}

function caseStudyTemplate(item, index) {
  const loading = index === 0 ? "eager" : "lazy";
  const fetchPriority = index === 0 ? ' fetchpriority="high"' : "";
  const sector = escapeHtml(item.sector);
  const views = escapeHtml(item.views);
  const category = escapeHtml(item.category);
  const title = item.title || item.goal || "Contenuto verticale ad alta attenzione.";
  const summary = item.why || item.approach || "";
  const showCompactCase = !isShowingAllWorks && Boolean(item.problem || item.approach || item.why);
  const compactCase = showCompactCase
    ? `
        <dl class="case-mini-detail">
          <div>
            <dt>Problema</dt>
            <dd>${escapeHtml(item.problem || "Racconto social poco chiaro.")}</dd>
          </div>
          <div>
            <dt>Soluzione</dt>
            <dd>${escapeHtml(item.approach || "Format verticale con messaggio diretto.")}</dd>
          </div>
          <div>
            <dt>Risultato</dt>
            <dd>${views} views</dd>
          </div>
        </dl>
      `
    : summary
      ? `<p class="case-summary">${escapeHtml(summary)}</p>`
      : "";

  return `
    <article class="case-card" data-reveal data-category="${category}">
      <div class="case-media">
        <div class="phone-shell case-phone" role="button" tabindex="0" aria-label="Apri risultato ${sector}, ${views} views" data-case-index="${index}">
          <img src="${escapeHtml(item.image)}" alt="${sector}: contenuto social con ${views} views" width="1080" height="1920" loading="${loading}"${fetchPriority} decoding="async">
        </div>
        <span class="case-views">${views} views</span>
      </div>
      <div class="case-body">
        <span class="case-sector">${sector}</span>
        <strong class="case-title">${escapeHtml(title)}</strong>
        ${compactCase}
      </div>
    </article>
  `;
}

function renderCaseStudies(items) {
  if (!caseGrid) return;
  activeCaseStudies = items;
  caseGrid.innerHTML = items.map(caseStudyTemplate).join("");
  bindCaseStudyImages();
  observeReveals(caseGrid.querySelectorAll("[data-reveal]"));
}

function featuredItems(items) {
  const featured = items.filter((item) => item.featured).sort((a, b) => a.order - b.order);
  return featured.length ? featured : sortedItems(items).slice(0, 3);
}

function sortedItems(items) {
  return [...items].sort((a, b) => a.order - b.order);
}

function updateWorksButton() {
  if (!showAllWorksButton) return;
  showAllWorksButton.setAttribute("aria-expanded", String(isShowingAllWorks));
  showAllWorksButton.textContent = isShowingAllWorks
    ? "Mostra meno"
    : "Vedi tutti i lavori \u2192";
}

function renderCurrentWorks() {
  const visibleItems = isShowingAllWorks ? sortedItems(allCaseStudies) : featuredItems(allCaseStudies);
  renderCaseStudies(visibleItems);
  caseGrid?.classList.toggle("is-expanded", isShowingAllWorks);
  updateWorksButton();
}

async function loadResults() {
  try {
    const res = await fetch("content/results-feed.json?v=2");
    if (!res.ok) throw new Error();
    const items = await res.json();
    allCaseStudies = sortedItems(items);
  } catch {
    allCaseStudies = sortedItems(fallbackResults);
  }

  renderCurrentWorks();
}

showAllWorksButton?.addEventListener("click", () => {
  isShowingAllWorks = !isShowingAllWorks;
  renderCurrentWorks();
});

function bindCaseStudyImages() {
  caseGrid?.querySelectorAll(".case-phone").forEach((phone) => {
    phone.addEventListener("click", () => openLightbox(Number(phone.dataset.caseIndex)));
    phone.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(Number(phone.dataset.caseIndex));
      }
    });
  });
}

function openLightbox(index) {
  const item = activeCaseStudies[index];
  if (!item || !lightbox || !lightboxImage || !lightboxSector || !lightboxViews || !lightboxInsight || !lightboxCategory) {
    return;
  }

  lastFocusedElement = document.activeElement;
  lightboxImage.src = item.image;
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
  restoreFocus();
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

  if (event.key === "Escape" && siteNav?.classList.contains("is-open")) {
    closeMobileMenu();
    navToggle?.focus();
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
  const focusable = [...dialog.querySelectorAll("button, [href], [tabindex]:not([tabindex='-1'])")]
    .filter((element) => !element.hasAttribute("disabled"));
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

function restoreFocus() {
  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
  lastFocusedElement = null;
}

if (copyMessageButton && copyFeedback) {
  copyMessageButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(MESSAGE_TEMPLATE);
      copyFeedback.textContent =
        "Messaggio copiato. Ora apri Instagram e incollalo in DM.";
    } catch {
      copyFeedback.textContent =
        "Copia manualmente: " + MESSAGE_TEMPLATE.split("\n")[0];
    }
  });
}

function setBrochurePage(index) {
  if (!brochurePage) return;
  currentBrochurePage = Math.max(0, Math.min(index, brochurePages.length - 1));
  brochurePage.src = brochurePages[currentBrochurePage];
  brochurePage.alt = `Brochure TDash pagina ${currentBrochurePage + 1}`;
  updateBrochureZoom();
  brochureZoomStage?.scrollTo({ top: 0, left: 0 });

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
  if (!brochureZoom || !brochureZoomMobileQuery.matches) return;
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
  restoreFocus();
}

function updateBrochureZoomAvailability() {
  const canZoom = brochureZoomMobileQuery.matches;

  brochureZoomOpenButtons.forEach((button) => {
    button.disabled = !canZoom;
    button.setAttribute("aria-label", canZoom ? "Ingrandisci pagina brochure TDash" : "Preview pagina brochure TDash");
  });

  if (!canZoom && brochureZoom?.classList.contains("is-open")) {
    closeBrochureZoom();
  }
}

function openBrochureReader() {
  if (!brochureDetails) return;
  brochureDetails.open = true;
  brochureToggleButton?.setAttribute("aria-expanded", "true");

  requestAnimationFrame(() => {
    brochureDetails.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  });
}

function initBrochureReader() {
  if (!brochurePage) return;
  if (brochureZoom && brochureZoom.parentElement !== document.body) {
    document.body.appendChild(brochureZoom);
  }
  setBrochurePage(0);
  updateBrochureZoomAvailability();
  brochureToggleButton?.setAttribute("aria-expanded", String(Boolean(brochureDetails?.open)));

  brochurePrev?.addEventListener("click", () => setBrochurePage(currentBrochurePage - 1));
  brochureNext?.addEventListener("click", () => setBrochurePage(currentBrochurePage + 1));
  brochureToggleButton?.addEventListener("click", openBrochureReader);
  brochureDetails?.addEventListener("toggle", () => {
    brochureToggleButton?.setAttribute("aria-expanded", String(brochureDetails.open));
  });
  brochureZoomOpenButtons.forEach((button) => button.addEventListener("click", openBrochureZoom));
  if ("addEventListener" in brochureZoomMobileQuery) {
    brochureZoomMobileQuery.addEventListener("change", updateBrochureZoomAvailability);
  } else {
    brochureZoomMobileQuery.addListener(updateBrochureZoomAvailability);
  }
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
  const sectionIds = [...new Set(navLinks.map((link) => link.getAttribute("href")?.slice(1)).filter(Boolean))];
  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
  if (!sections.length) return;

  function setActive(id) {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
    });
  }

  if (!("IntersectionObserver" in window)) {
    setActiveOnScroll(sections, setActive);
    return;
  }

  const visible = new Map();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visible.set(entry.target.id, entry);
        } else {
          visible.delete(entry.target.id);
        }
      });

      const active = [...visible.values()].sort((a, b) => {
        const topDelta = Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top);
        return topDelta || b.intersectionRatio - a.intersectionRatio;
      })[0];

      if (active) {
        setActive(active.target.id);
      }
    },
    { rootMargin: "-30% 0px -52% 0px", threshold: [0, 0.12, 0.28, 0.5, 0.8] }
  );

  sections.forEach((section) => observer.observe(section));
}

function setActiveOnScroll(sections, setActive) {
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

    setActive(active.id);
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

observeReveals();
observeCounters();
observeActiveNav();
initBrochureReader();
loadResults();
