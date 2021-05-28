const body = document.querySelector('body'),
      menu = document.querySelector('.nav-menu'),
      menuOpen = document.querySelector('.nav-burger'),
      menuClose = document.querySelector('.nav-menu-close');

menuOpen.addEventListener('click', () => {
  menu.classList.add('_show');
  body.classList.add('_lock');
});

menuClose.addEventListener('click', () => {
  menu.classList.remove('_show');
  body.classList.remove('_lock');
});


// Закрытие меню при клике по заднему фону
const menuBody = document.querySelector('.nav-menu__body');

document.addEventListener('click', (e) => {
  if (menu.classList.contains('_show')) {
    const target = e.target,
          itsMenu = target == menuBody || menuBody.contains(target),
          itsBurger = target == menuOpen,
          menuIsOpen = menu.classList.contains('_show');
  
    if (!itsMenu && !itsBurger && menuIsOpen) {
      menu.classList.remove('_show');
      body.classList.remove('_lock');
    }
  }
});

// Открытие модальных окон
const btnsOpenModal = document.querySelectorAll('.modal-open');

for (let i = 0; i < btnsOpenModal.length; i++) {
  const btnOpenModal = btnsOpenModal[i];
  
  btnOpenModal.addEventListener('click', (e) => {
    const dataBtn = btnOpenModal.dataset.modalOpen;
    const modalThatOpens = document.querySelector(`.modal[data-modal=${dataBtn}]`)
    
    btnOpenModal.classList.add('modal-show');
    modalThatOpens.classList.add('_show');
    body.classList.add('_lock');

    // Закрытие модального окна с помощью клика по крестику
    if (btnOpenModal.classList.contains('modal-show')) {
      const modalIsOpen = document.querySelector('.modal._show'), // находим модальное окно, которое сейчас открыто
            closeThisModal = document.querySelector('.modal._show .modal-close'); // находим крестик этого модального окна
  
      closeThisModal.addEventListener('click', () => {
        btnOpenModal.classList.remove('modal-show');
        modalIsOpen.classList.remove('_show');
        body.classList.remove('_lock');
      });

      // закрытие модальных окон при клике по заднему фону
      // document.addEventListener('click', (e) => {
      //   if (btnOpenModal.classList.contains('modal-show')) {
      //     const modalContent = document.querySelector('.modal._show .modal__content');

      //     const target = e.target,
      //           itsModal = target == modalContent || modalContent.contains(target),
      //           itsBtnOpenModal = target == btnOpenModal;

      //     if (!itsModal && !itsBtnOpenModal && modalIsOpen.classList.contains('_show')) {
      //       console.log(btnOpenModal);
      //       btnOpenModal.classList.remove('modal-show');
      //       modalIsOpen.classList.remove('_show');
      //       body.classList.remove('_lock'); 
      //     }
      //   }
      // });
    }
  });

}

// Скрипт для элементов "select"

function select() {
  const selectHeader = document.querySelectorAll('.select__header'),
        selectItem = document.querySelectorAll('.select-item');

  selectHeader.forEach(item => {
    item.addEventListener('click', selectToggle);
  });

  selectItem.forEach(item => {
    item.addEventListener('click', selectChoose);
  });

  function selectToggle() {
    this.parentNode.classList.toggle('_active');
  };

  function selectChoose() {
    const text = this.innerText,
          parent = this.closest('.select'),
          currentSelect = parent.querySelector('.select-current');
    
    currentSelect.innerText = text;
    parent.classList.remove('_active');
  };
}

select();

// reviews Swiper
const swiper = new Swiper('.swiper-container', {
  // Optional parameters
  loop: true,
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 32,

  // If we need pagination
  pagination: {
    el: '.reviews__pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.reviews__arrows-right',
    prevEl: '.reviews__arrows-left',
  },
});