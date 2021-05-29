const body = document.querySelector('body'),
      menu = document.querySelector('.nav-menu'),
      menuOpen = document.querySelector('.nav-burger'),
      menuClose = document.querySelector('.nav-menu-close');

menuOpen.addEventListener('click', (e) => {
  e.stopPropagation();
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



// Подставление нужной информации в карточки в разделе "rental"

const rentalCard = document.querySelectorAll('.rental__service');

rentalCard.forEach(item => {
  item.addEventListener('click', () => {
    rentalCardInfo(item).then(e => {
      rentalSetInfo(e[0],e[1],e[2]);
    });
  });
});

async function rentalCardInfo(item) {
    const rentalCardData = item.dataset.rentalInfo;

    const  rentalRequest = await fetch('js/rental-info.json'),
           rentalResponse = await rentalRequest.json();

    const rentalIcon = rentalResponse[rentalCardData][0],
          rentalTitle = rentalResponse[rentalCardData][1],
          rentalText = rentalResponse[rentalCardData][2];

    return [rentalIcon,rentalTitle,rentalText];
}

function rentalSetInfo(icon,title,text) {
  const rentalIcon = document.querySelector('.modal-condition-icon img'),
        rentalTitle = document.querySelector('.modal-condition-title'),
        rentalText = document.querySelector('.modal-condition-text');

  rentalIcon.setAttribute('src', `img/${icon}`);
  rentalTitle.innerText = title;
  rentalText.innerText = text;
}

// Закрытие модального окна в разделе "rental"

const rentalModalClose = document.querySelector('.modal-condition-btn');

rentalModalClose.addEventListener('click', (e) => {
  rentalModalClose.closest('.modal-condition').classList.remove('_show');
  body.classList.remove('_lock');
});

// Фильтр для парка авто на главной

const parkClass = document.querySelectorAll('.park__class__item');

parkClass.forEach(item => {
  item.addEventListener('click', () => {
    parkClass.forEach(e => {
      e.classList.remove('_active');
    });
    item.classList.add('_active');

    parkFilter(item);
  })
});

function parkFilter(parkClass) {
  const parkClassData = parkClass.dataset.parkClass,
        parkCarAll = document.querySelectorAll('.park__car-item'),
        parkCarData = document.querySelectorAll(`.park__car-item[data-park-car=${parkClassData}]`);

  // Убираем ненужные карточки
  parkCarAll.forEach(item => {
    item.style.display = 'none';
    item.classList.remove('_show');
  });

  // Показываем нужные карточки
  parkCarData.forEach(item => { 
    item.style.display = 'flex';
    // let i = 0;

    // const parkCarInterval = setInterval(() => {
    //   item.style.transitionDelay = i + 's';
    //   // i = i + 0.1;

    //   if (i >= parkCarData.length) {
    //     clearInterval(parkCarInterval);
    //   }
    // });

    setTimeout(() => {
      item.classList.add('_show');
    }, 1);
  });

  console.log(parkCarData);


}