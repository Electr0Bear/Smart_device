'use strict';

// Плавный скролл
if (document.querySelectorAll('a[href^="#"]')) {
  const links = document.querySelectorAll('a[href^="#"]');
  const topOffset = 0;

  const smoothScrollHandler = linksArr => {
    linksArr.forEach(link => {
      link.addEventListener('click', evt => {
        evt.preventDefault();
        const href = link.getAttribute('href');
        let targetElement = document.querySelector('.body');
        if (href.length > 1) {
          targetElement = document.querySelector(`${href}`);
        }
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset;
        window.scrollBy({
          top: offsetPosition,
          behavior: 'smooth'
        });
      });
    });
  }

  smoothScrollHandler(links);
}

// Функции проверки валидности
const checkInputValidity = inputArr => {
  inputArr.forEach(input => {
    const inputField = input.querySelector('input, textarea');
    const inputValidity = inputField.checkValidity();
    input.classList.toggle('input--invalid', !inputValidity);
  });
}

const onClickSubmitBtn = (formInputs, button) => {
  button.addEventListener('click', evt => {
    checkInputValidity(formInputs);
  });
}

const clearInputs = inputArr => {
  inputArr.forEach(input => {
    const inputField = input.querySelector('input, textarea');
    inputField.classList.remove('input--invalid');
    inputField.value = '';
  })
}

const onSubmitForm = (form, formInputs) => {
  form.addEventListener('submit', evt => {
    evt.preventDefault();
    clearInputs(formInputs);
    console.log('Форма отправлена');
  })
}

const removeInputValidity = inputArr => {
  inputArr.forEach(input => {
    const inputField = input.querySelector('input, textarea')
    inputField.addEventListener('click', () => {
      input.classList.remove('input--invalid');
    });
    inputField.addEventListener('input', () => {
      input.classList.remove('input--invalid');
    });
  })
}

// Маска телефонного номера
const phoneMaskHandler = phoneInput => {
  phoneInput.addEventListener('focusin', () => {
    if (phoneInput.value === '') {
      phoneInput.value = '+7(';
    }
  });

  phoneInput.addEventListener('focusout', () => {
    if (phoneInput.value === '+7(' || phoneInput.value.length <= 3) {
      phoneInput.value = '';
    }
  });

  phoneInput.addEventListener('input', () => {
    if (phoneInput.value.length <= 3) {
      phoneInput.value = '+7(';
    }

    if (phoneInput.value.length >= 7 && !phoneInput.value.includes(')')) {
      let beforeBracket = phoneInput.value.slice(0, 6);
      let afterBracket = phoneInput.value.slice(6);
      beforeBracket += ')';
      phoneInput.value = beforeBracket + afterBracket;
    } else if (phoneInput.value.length >= 7 && phoneInput.value.includes(')') && phoneInput.value.indexOf(')') !== 6) {
      let beforeBracket = phoneInput.value.slice(0, phoneInput.value.indexOf(')'));
      let afterBracket = phoneInput.value.slice(phoneInput.value.indexOf(')') + 1);
      phoneInput.value = beforeBracket + afterBracket;
      phoneInput.value = phoneInput.value.slice(0, 6) + ')' + phoneInput.value.slice(6);
    }

  })
}

// Форма обратной связи
if (document.querySelector('.contact-us__form')) {
  const form = document.querySelector('.contact-us__form');
  const submitBtn = form.querySelector('.contact-us__submit-button');
  const formInputs = form.querySelectorAll('.input');
  const phoneInput = form.querySelector('.contact-us__phone-input input')

  onClickSubmitBtn(formInputs, submitBtn);
  onSubmitForm(form, formInputs);
  phoneMaskHandler(phoneInput);
  removeInputValidity(formInputs);
}
