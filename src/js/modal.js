document.addEventListener("DOMContentLoaded", () => {
  console.log("Modal script");
  const overlay = document.getElementById("modalOverlay");
  const franshiseModal = document.getElementById("modalfranshise");
  const successModal = document.getElementById("modalSuccess");
  const openBtns = document.querySelectorAll("#addFranchiseBtn");
  const closeBtn = document.getElementById("modalCloseAdd");
  const closeBtnFranshise = document.getElementById("modalCloseFranshise");
  const closeBtnSuccess = document.getElementById("modalCloseSuccess");
  const form = document.getElementById("modalForm");
  const franshiseForm = franshiseModal.querySelector(".modal__form");
  const channelInput = document.getElementById("channelInput");

  if (!franshiseForm) console.error("franshiseForm не найден");
  if (!channelInput) console.error("channelInput не найден");

  function openModal(e) {
    e.preventDefault();
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  openBtns.forEach((btn) => btn.addEventListener("click", openModal));
  closeBtn.addEventListener("click", closeModal);
  closeBtnFranshise.addEventListener("click", () => {
    franshiseModal.classList.remove("active");
    document.body.style.overflow = "";
  });
  closeBtnSuccess.addEventListener("click", () => {
    successModal.classList.remove("active");
    document.body.style.overflow = "";
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active"))
      closeModal();
  });

  // Первая модалка
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    console.log("Данные формы:", data);
    overlay.classList.remove("active");
    document.body.style.overflow = "";
    setTimeout(() => {
      successModal.classList.add("active");
      document.body.style.overflow = "hidden";
      updateSuccessText(overlay.dataset.modalType);
      setTimeout(() => {
        successModal.classList.remove("active");
        document.body.style.overflow = "";
      }, 10000);
    }, 200);
    form.reset();
  });

  // Вторая модалка
  if (franshiseForm) {
    franshiseForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(franshiseForm));
      console.log("Данные формы:", data);
      franshiseModal.classList.remove("active");
      document.body.style.overflow = "";
      setTimeout(() => {
        successModal.classList.add("active");
        document.body.style.overflow = "hidden";
        updateSuccessText("franchise");
        setTimeout(() => {
          successModal.classList.remove("active");
          document.body.style.overflow = "";
        }, 10000);
      }, 200);
      franshiseForm.reset();
    });
  }

  const franchiseBtns = document.querySelectorAll("[data-franchise-title]");
  let currentFranchiseTitle = "";

  franchiseBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = btn.closest(".card");
      if (card) {
        const title = card.querySelector(".card__brand h3");
        if (title) {
          currentFranchiseTitle = title.textContent.trim();
          const modalTitle = franshiseModal.querySelector(".modal__title");
          if (modalTitle) {
            modalTitle.textContent = `Получите все материалы по франшизе: ${currentFranchiseTitle}`;
          }
        }
      }
      franshiseModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  franshiseModal.addEventListener("click", (e) => {
    if (e.target === franshiseModal) {
      franshiseModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && franshiseModal.classList.contains("active")) {
      franshiseModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  successModal.addEventListener("click", (e) => {
    if (e.target === successModal) {
      successModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && successModal.classList.contains("active")) {
      successModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Radio buttons — обновляем hidden input
  const channelRadios = document.querySelectorAll('input[name="channelRadio"]');
  channelRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (channelInput) {
        channelInput.value = radio.value;
      }
    });
  });

  // Функция для обновления текста в success модалке
  function updateSuccessText(type) {
    const successTitle = successModal.querySelector(".modal-success-text");
    const successText = successModal.querySelector(".modal-success-text-p");

    if (successTitle) {
      if (type === "add") {
        successTitle.textContent = "Заявка на добавление франшизы отправлена!";
      } else if (type === "franchise") {
        successTitle.textContent = `Материалы по франшизе ${currentFranchiseTitle} скоро будут отправлены`;

        successText.textContent =
          "Чтобы сравнить условия запуска и выбрать подходящий бизнес, посмотрите ещё 2-3 франшизы и получите материалы по ним.";
      }
    }
  }

  const sliderContainers = document.querySelectorAll(".investment-slider");

  sliderContainers.forEach((sliderEl) => {
    const sliderWrapper = sliderEl.closest(".card__slider");

    new Swiper(sliderEl, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      navigation: {
        prevEl: sliderWrapper.querySelector(".slider-btn-prev"),
        nextEl: sliderWrapper.querySelector(".slider-btn-next"),
      },
    });
  });
});
