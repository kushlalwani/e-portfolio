document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector("[data-contact-modal]");
  const openButtons = document.querySelectorAll("[data-contact-open]");
  const closeButtons = document.querySelectorAll("[data-contact-close]");

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
