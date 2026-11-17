(() => {
  document.documentElement.classList.replace("no-js", "js");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#navegacao");

  const closeMenu = () => {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
    navigation.classList.remove("open");
  };

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(willOpen));
      menuButton.setAttribute("aria-label", willOpen ? "Fechar menu" : "Abrir menu");
      navigation.classList.toggle("open", willOpen);
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 640) closeMenu();
    });
  }

  const currentYear = new Date().getFullYear();
  const year = document.querySelector("#year");
  const yearTop = document.querySelector("#year-top");
  if (year) year.textContent = String(currentYear);
  if (yearTop) yearTop.textContent = String(currentYear);

  document.querySelector("#print-page")?.addEventListener("click", () => {
    window.print();
  });
})();