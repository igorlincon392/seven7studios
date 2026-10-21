
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");

function closeMenu() {
  if (!menuToggle || !nav) return;

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
  nav.classList.remove("open");
  document.body.classList.remove("menu-open");
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    const nextOpen = !isOpen;

    menuToggle.setAttribute("aria-expanded", String(nextOpen));
    menuToggle.setAttribute(
      "aria-label",
      nextOpen ? "Fechar menu" : "Abrir menu"
    );

    nav.classList.toggle("open", nextOpen);
    document.body.classList.toggle("menu-open", nextOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 680) closeMenu();
  });
}

// Abas do portfólio: Fotografias e Vídeos
const portfolioTabs = document.querySelectorAll(".portfolio-tab");
const portfolioContents = document.querySelectorAll(".portfolio-content");
const photoFilters = document.querySelector("[data-filters]");

function showPortfolioTab(selectedTab) {
  portfolioTabs.forEach((tab) => {
    const isActive = tab.dataset.tab === selectedTab;

    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-pressed", String(isActive));
  });

  portfolioContents.forEach((content) => {
    content.hidden = content.dataset.content !== selectedTab;
  });

  if (photoFilters) {
    photoFilters.hidden = selectedTab !== "fotografias";
  }
}

portfolioTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    showPortfolioTab(tab.dataset.tab);
  });
});

// Filtros das fotografias
const filterButtons = document.querySelectorAll(".filter");
const photoCards = document.querySelectorAll(
  '[data-content="fotografias"] .project-card'
);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((filter) => {
      filter.classList.toggle("active", filter === button);
    });

    photoCards.forEach((card) => {
      const category = card.dataset.category;
      const shouldShow =
        selectedFilter === "todos" || category === selectedFilter;

      card.hidden = !shouldShow;
    });
  });
});

// Ano automático no rodapé
const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Animações de entrada
const animatedElements = document.querySelectorAll(
  ".about-grid, .about-banner, .project-card, .video-card, .service-item, .contact-grid"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  animatedElements.forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
  });
}
