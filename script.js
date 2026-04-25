document.addEventListener("DOMContentLoaded", () => {
  const themeSelects = document.querySelectorAll("[data-theme-select]");
  const modal = document.querySelector("[data-contact-modal]");
  const openButtons = document.querySelectorAll("[data-contact-open]");
  const closeButtons = document.querySelectorAll("[data-contact-close]");
  const themeStorageKey = "portfolio-theme";

  const applyTheme = (mode) => {
    const resolvedTheme =
      mode === "system"
        ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
        : mode;

    document.documentElement.setAttribute("data-theme", resolvedTheme);
    document.documentElement.setAttribute("data-theme-mode", mode);
    themeSelects.forEach((select) => {
      select.value = mode;
    });
  };

  const savedTheme = localStorage.getItem(themeStorageKey) || "system";
  applyTheme(savedTheme);

  themeSelects.forEach((select) => {
    select.addEventListener("change", (event) => {
      const mode = event.target.value;
      localStorage.setItem(themeStorageKey, mode);
      applyTheme(mode);
    });
  });

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const syncSystemTheme = () => {
    if ((localStorage.getItem(themeStorageKey) || "system") === "system") {
      applyTheme("system");
    }
  };
  mediaQuery.addEventListener("change", syncSystemTheme);

  if (!modal || openButtons.length === 0) {
    return;
  }

  const openModal = () => {
    modal.hidden = false;
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
});
