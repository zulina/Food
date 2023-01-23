import {closeModal, openModal} from "./modal";
import { postData } from "../services/services";

function forms(modalTimerId) {

    // Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    // вывод статуса отправки данных
    function bindPostData(form) {
        // для форм при нажатии кнопки срабатывает submit
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // создаём элемент для вывода статуса
            let statusMessage = document.createElement('img');
            // указываем путь к картинке
            statusMessage.src = message.loading;
            // указываем параметры стиля картинки
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // вставляем картинку после конца текущей формы
            form.insertAdjacentElement('afterend', statusMessage);
        
            const formData = new FormData(form);

            // данные формы преобразовываем в массив, а массив - в объект
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // постим данные в файл db.json requests
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                // показываем окно благодарности
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                // очищаем введённые значения
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        // получаем текущее модальное окно
        const prevModalDialog = document.querySelector('.modal__dialog');

        // скрываем текущее модальное окно
        prevModalDialog.classList.add('hide');

        // открываем модальную форму на всякий случай если её могли закрыть
        openModal('.modal', modalTimerId);

        // создаём элемент для вывода благодарности
        const thanksModal = document.createElement('div');
        // указываем класс модального окна
        thanksModal.classList.add('modal__dialog');
        // указываем что будет отображаться в окне
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        // добавляем на модальную форму новое модальное окно
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            // закрываем через 4 сек
            thanksModal.remove();
            // возвращаем видимость предыдущему модальному окну
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }

}

// module.exports = forms;

export default forms;